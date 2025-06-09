import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
/* COMPONENTS */
import { supabase } from "../lib/Supabase.js";
import "../styles/NavFoot.css";
import Loader from "../components/common/Loader.jsx";
import FancySpinner from "../components/common/Spinner.jsx";
/* PAGES */
import ProductXp from "../components/product/ProductXp.jsx";
import Accordion, { AccordionItem } from "../components/common/accordion.jsx";
import Category from "../components/common/Category.jsx";
import Landing from "../components/common/Landing.jsx";
import Integration from "../components/common/Integration.jsx";
import Testimonial from "../components/common/Testimonial.jsx";
import Seperator from "../components/common/Seperator.jsx";
import Marquee from "../components/common/Marquee.jsx";
import Latest from "../components/product/Latest.jsx";
import { useDebounce } from "../hooks/useDebounce.jsx";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const debouncedSearch = useDebounce(searchText, 500);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw new Error(error.message);
    return data;
  };

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsFiltering(true);

    const timer = setTimeout(() => {
      if (!debouncedSearch) {
        setFilteredProducts([]);
      } else {
        const filtered = products?.filter(
          (product) =>
            product.brand
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) ||
            product.type
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) ||
            product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
        setFilteredProducts(filtered);
      }

      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, products]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchText("");
    } else {
      setSearchText(value);
    }
  };

  const newProducts = products?.filter(
    (product) =>
      Array.isArray(product.keywords) &&
      product.keywords.join("").toLowerCase().includes("new")
  );
  const bestProducts = products?.filter(
    (product) =>
      Array.isArray(product.keywords) &&
      product.keywords.join("").toLowerCase().includes("bestsell")
  );

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Vipvendor.ng",
    url: "https://Vipvendor.ng",
    logo: "https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/landing/ViplogoMark.webp",
    sameAs: [
      "https://www.instagram.com/vipvendorofficial/",
      "https://www.facebook.com/vipvendorofficial",
      "https://twitter.com/vipvendor",
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      
        <title>
          Vipvendor.ng — Affordable Phones, Laptops & Gadgets in Nigeria
        </title>
        <meta
          name="description"
          content="Shop high-quality phones, laptops, smartwatches, earbuds, and more at Vipvendor.ng. Enjoy OG Gbanjo deals and fast delivery across Nigeria."
        />
        <meta
          name="keywords"
          content="cheap phones, Nigeria gadgets, laptops, smartwatches, gbanjo, Vipvendor"
        />
        <meta name="author" content="VIPvendor Team" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vipvendor.ng/" />
        <meta
          property="og:title"
          content="Vipvendor.ng — Affordable Phones, Laptops & Gadgets"
        />
        <meta
          property="og:description"
          content="OG Gbanjo deals and quality tech delivered across Nigeria."
        />
        <meta
          property="og:image"
          content="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/Marketing/Ogimage.webp"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="VIPvendor.ng — Affordable Phones & Gbanjo Deals"
        />
        <meta
          name="twitter:description"
          content="Shop phones, laptops, and gadgets with OG deals at VIPvendor.ng"
        />
        <meta
          name="twitter:image"
          content="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/Marketing/Ogimage.webp"
        />
      </Helmet>

      <main>
        {isLoading && <Loader />}
        {isError && (
          <p className="text-center mt-20 text-red-500 text-lg">
            Error: {error.message}
          </p>
        )}
        {!isLoading && products?.length === 0 && (
          <p className="text-center mt-20 text-gray-600 text-lg">
            No products found.....
          </p>
        )}

        <div className="fixed mt-4 mr-4 top-0 right-0 z-40 bg-transparent shadow-sm max-w-full h-12 w-12 p-2 overflow-hidden rounded-full flex justify-end mx-auto focus-within:w-50 focus-within:sm:w-80 transition-[width] duration-900 outline-0 focus-within:outline-1 ">
          <input
            type="text"
            placeholder="Quick Search..."
            aria-label="Search Products"
            className=" text-black flex-auto mx-2 border-none outline-none w-12 focus-within:w-30 focus-within:sm:w-80 z-50 "
            value={searchText}
            onChange={handleSearch}
          />
          <button className="flex-none flex justify-center items-center border-none bg-softblack w-8 rounded-full cursor-pointer aspect-[1] ">
            <FaSearch className="fill-whitoo" />
          </button>
        </div>

        {searchText ? (
          <ul className=" flex flex-wrap gap-7 mt-20 justify-center items-start w-full ">
            {isFiltering ? (
              <FancySpinner />
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductXp key={product.id} product={product} />
              ))
            ) : (
              <h2 className="text-center text-gray-500 text-lg mt-10">
                No products match your search.
              </h2>
            )}
          </ul>
        ) : (
          <main className="px-6.5 mt-14 sm:mt-20">
            <section>
              <Landing />
            </section>

            <section className="w-full mt-8 mb-4 p-2">
              <div>
                <h2 className="text-xl sm:text-2xl text-start sm:text-center font-spartan font-semibold sm:mb-1">
                  Brands you'll find here
                </h2>
              </div>
              <Marquee />
            </section>

            <section className="mt-12 mb-4">
              <Category />
            </section>

            <section className="mt-12 mb-4">
              <Seperator />
              <h2 className="text-2xl sm:text-3xl text-center font-spartan font-semibold sm:mb-1">
                Our featured items
              </h2>
              <p className=" sm:text-lg font-poppins text-center text-gray-400  px-4 sm:px-26 ">
                Discover top-quality phones, smartwatches, laptops, headsets and
                more-all at the best prices!
              </p>
              <section className="mt-4 mb-4">
                <Seperator />
              </section>
              <div className=" w-full overflow-x-auto snap-x snap-mandatory scroll-smooth ">
                <div className="flex space-x-4 w-max py-2 sm:w-full sm:justify-evenly lg:w-full lg:justify-evenly overflow-x-auto snap-x snap-mandatory scrollbar-hide ">
                  {newProducts.length > 0 ? (
                    newProducts.map((product) => (
                      <ProductXp key={product.id} product={product} />
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      No featured items available right now.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-12 mb-4">
              <Seperator />
              <h2 className="text-2xl sm:text-3xl text-center font-spartan font-semibold mb-1">
                Best Selling items
              </h2>
              <p className="sm:text-lg font-poppins text-center text-gray-400 ">
                Shop our best-selling gadgets, Get yours before they sell out!
              </p>
              <section className="mt-4 mb-4">
                <Seperator />
              </section>
              <div className=" w-full overflow-x-auto scroll-smooth ">
                <div className="flex space-x-4 w-max py-2 sm:w-full sm:justify-evenly lg:w-full lg:justify-evenly overflow-x-auto snap-x snap-mandatory scrollbar-hide ">
                  {bestProducts.length > 0 ? (
                    bestProducts.map((product) => (
                      <ProductXp key={product.id} product={product} />
                    ))
                  ) : (
                    <h1>Well Nothing here</h1>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-12 mb-4">
              <Seperator />
              <h2 className="text-2xl sm:text-3xl text-center font-spartan font-semibold sm:mb-1 flex justify-center gap-2 items-center sm:mt-3">
                Latest Gbanjo deals
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </h2>
              <p className=" sm:text-lg font-poppins text-center text-gray-400  px-4 sm:px-26 mb-3 ">
                OG deals for you!
              </p>
              <Seperator />
              <Latest />
            </section>

            <section>
              <Integration />
            </section>

            <section>
              <Testimonial />
            </section>
          </main>
        )}
      </main>

      <div>
        <section className="mt-9 bg-slate-100 p-2 pb-10 font-poppins ">
          <section className="mt-1 mb-4">
            <Seperator />
          </section>
          <h3 className="text-sm sm:text-2xl text-center text-softblack">
            Frequently asked questions
          </h3>
          <h1 className="text-center text-xl sm:text-4xl font-semibold">
            You ask? We answer
          </h1>
          <section className="mt-4 mb-4">
            <Seperator />
          </section>
          <div className="flex flex-col items-center justify-center">
            <Accordion className="max-w-lg mt-2.5">
              <AccordionItem value="1" trigger="What payments do you accept">
                We accept bank transfers from any Nigerian bank, as well as
                payments via Verve, MasterCard, and PayPal.
              </AccordionItem>
              <AccordionItem value="2" trigger="What is your return policy">
                We offer a flexible return policy, provided the product is not
                damaged or degraded in any way. All return requests must be made
                within 5 days of receiving the product.
              </AccordionItem>
              <AccordionItem
                value="3"
                trigger="When do i get my product delivered">
                Same-day delivery is available within Lagos for orders placed in
                the morning. For locations outside Lagos, delivery takes up to 4
                business days.
              </AccordionItem>
              <AccordionItem
                value="4"
                trigger="Why does trying to buy just take me to your social page?">
                At{" "}
                <span className="text-fuchsia-500 font-semibold">
                  VIPvendor.ng
                </span>
                , purchases are not made directly on the website. When you're
                ready to buy, simply click one of our social links to contact us
                and complete your purchase directly —{" "}
                <span className="text-fuchsia-500 font-semibold">
                  all designed for your convenience.
                </span>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;