import React, { useEffect, useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../lib/Supabase.js";
import ProductXp from "../components/product/ProductXp.jsx";
import ProductFilter from "../components/product/ProductFilter.jsx";
import debounce from "lodash.debounce";
import ProductSkeletonGrid from "../components/product/ProductSkeletonGrid.jsx";
import { useQuery } from "@tanstack/react-query";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const productsPerPage = 12;

  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || ""
  );

  const [inputValue, setInputValue] = useState(
    () => searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState(
    () => searchParams.get("sort") || "newest"
  );

  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "",
    type: searchParams.get("type") || "",
    category: searchParams.get("category") || "",
    year: searchParams.get("year") || "",
    minPrice: parseInt(searchParams.get("minPrice")) || 0,
    maxPrice: parseInt(searchParams.get("maxPrice")) || 10000000,
  });

  const [feedback, setFeedback] = useState("");
  const productsRef = useRef(null); // 👈 Ref to product section
  const isFirstRun = useRef(true);
  const prevFiltersRef = useRef(filters);
  const prevSearchRef = useRef(searchQuery);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  };

  const {
    data: allProducts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    const params = {
      page: currentPage,
      search: searchQuery,
      sort: sortBy,
      brand: filters.brand,
      type: filters.type,
      category: filters.category,
      year: filters.year,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    };

    // Remove empty values to keep the URL clean
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
    );

    setSearchParams(cleanParams);
  }, [currentPage, searchQuery, sortBy, filters, setSearchParams]);

  const brandOptions = [
    ...new Set(allProducts.map((p) => p.brand).filter(Boolean)),
  ];
  const typeOptions = [
    ...new Set(allProducts.map((p) => p.type).filter(Boolean)),
  ];
  const categoryOptions = [
    ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
  ];
  const yearOptions = [
    ...new Set(allProducts.map((p) => p.year).filter(Boolean)),
  ].sort((a, b) => b - a);

  const debouncedSearch = useMemo(
    () =>
      debounce((val) => {
        setSearchQuery(val.toLowerCase());
      }, 700),
    []
  );

  const handleSearchInput = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchQuery("");
      setInputValue("");
    } else {
      setInputValue(value);
      debouncedSearch(value);
    }
  };

  useEffect(() => {
    let results = [...allProducts];

    if (searchQuery) {
      results = results.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchQuery) ||
          p.brand?.toLowerCase().includes(searchQuery) ||
          p.type?.toLowerCase().includes(searchQuery) ||
          p.category?.toLowerCase().includes(searchQuery) ||
          (p.keywords || []).some((k) => k.toLowerCase().includes(searchQuery))
      );
      setFeedback(
        `You searched for "${searchQuery}", we found ${results.length} result(s).`
      );
    } else {
      setFeedback("");
    }

    if (filters.brand)
      results = results.filter((p) => p.brand === filters.brand);
    if (filters.type) results = results.filter((p) => p.type === filters.type);
    if (filters.category)
      results = results.filter((p) => p.category === filters.category);
    if (filters.year)
      results = results.filter((p) => p.year === parseInt(filters.year));
    results = results.filter(
      (p) =>
        (p.openbox_price || p.uk_used_price || 0) >= filters.minPrice &&
        (p.openbox_price || p.uk_used_price || 0) <= filters.maxPrice
    );

    if (sortBy === "price-low") {
      results.sort(
        (a, b) =>
          (a.openbox_price || a.uk_used_price || 0) -
          (b.openbox_price || b.uk_used_price || 0)
      );
    } else if (sortBy === "price-high") {
      results.sort(
        (a, b) =>
          (b.openbox_price || b.uk_used_price || 0) -
          (a.openbox_price || a.uk_used_price || 0)
      );
    } else if (sortBy === "year") {
      results.sort((a, b) => (b.year || 0) - (a.year || 0));
    }

    setFilteredProducts(results);

    const filtersChanged =
      JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters);
    const searchChanged = prevSearchRef.current !== searchQuery;

    if (!isFirstRun.current && (filtersChanged || searchChanged)) {
      setCurrentPage(1);
    }

    // Always update refs
    prevFiltersRef.current = filters;
    prevSearchRef.current = searchQuery;

    if (isFirstRun.current) {
      isFirstRun.current = false;
    }
  }, [searchQuery, filters, allProducts, sortBy]);

  // 👇 Scroll to product section on page change
  useEffect(() => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  // 👇 UseMemo for efficient slicing
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const getPagination = (totalPages, currentPage) => {
    const pages = [];

    // Always show the first page
    pages.push(1);

    // Determine start and end range around currentPage
    let start = Math.max(currentPage - 1, 2);
    let end = Math.min(currentPage + 1, totalPages - 1);

    // Add leading ellipsis if necessary
    if (start > 2) {
      pages.push("...");
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add trailing ellipsis if necessary
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show the last page (only if totalPages > 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section className="mt-10 sm:flex font-spartan mb-5 text-lg container">
      <div className="sm:w-[30%]">
        <ProductFilter
          filters={filters}
          setFilters={setFilters}
          brands={brandOptions}
          types={typeOptions}
          categories={categoryOptions}
          years={yearOptions}
        />
      </div>

      <aside className="sm:w-[70%] h-[85vh] overflow-y-scroll pr-2">
        <h1 className="text-center capitalize font-bold text-fuchsia-500 mb-1 sm:mb-5">
          VIPVENDOR.NG
        </h1>

        <section className="flex flex-col sm:flex-row justify-between  mb-8">
          <input
            type="text"
            placeholder="Search product name, brand, type, category..."
            className="border-fuchsia-400 outline-fuchsia-400 border-b-1 border-r-1 border-l-1 p-2 sm:w-[70%] mx-2 mb-5 sm:mb-0"
            value={inputValue}
            onChange={handleSearchInput}
          />
          <div className="text-center">
            <select
              className="border-fuchsia-400 outline-fuchsia-400 border p-3 ml-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option disabled>Sort by:</option>
              <option value="">Latest</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="year">Newest(year)</option>
            </select>
          </div>
        </section>

        {feedback && (
          <p className="text-center text-sm text-gray-600 mb-2">{feedback}</p>
        )}

        {isLoading ? (
          <ProductSkeletonGrid count={12} />
        ) : isError ? (
          <p className="text-red-500 text-center mt-5">
            Error loading products: {error.message}
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No products available.
          </p>
        ) : (
          <div
            ref={productsRef}
            className="flex flex-wrap gap-7 mt-8 justify-center items-start w-full">
            {paginatedProducts.map((product) => (
              <ProductXp key={product.id} product={product} />
            ))}

            {/* Pagination */}
            <div className="w-full flex justify-center items-center gap-2 mt-6 flex-wrap">
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-4 py-2 border rounded">
                  Previous
                </button>
              )}

              {getPagination(
                Math.ceil(filteredProducts.length / productsPerPage),
                currentPage
              ).map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-3 py-1">
                    ...
                  </span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === page ? "bg-black text-white" : ""
                    }`}>
                    {page}
                  </button>
                )
              )}

              {currentPage <
                Math.ceil(filteredProducts.length / productsPerPage) && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-3 py-1 border rounded">
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}

export default Shop;
