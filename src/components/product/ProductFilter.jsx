
import { IoCloseOutline } from "react-icons/io5";

const ProductFilter = ({ filters, setFilters, brands, types, categories, years }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }));
  };

  const resetFilters = () => {
    setFilters({
      brand: "",
      type: "",
      category: "",
      year: "",
      minPrice: 0,
      maxPrice: 3000000,
    });
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md mb-4">
      <h2 className="font-semibold mb-3 text-fuchsia-500 text-center">Filter Products</h2>

      <div className="flex flex-wrap gap-4 w-full justify-center">

        {/* Brand */}
        <select name="brand" value={filters.brand} onChange={handleChange} className="p-2 border-b-1 outline-none w-full mb-3 ">
          <option value="">All Brands</option>
          {brands.map((b, idx) => (
            <option key={idx} value={b}>{b}</option>
          ))}
        </select>

        {/* Category */}
        <select name="category" value={filters.category} onChange={handleChange} className="p-2 border-b-1 outline-none w-full mb-3 ">
          <option value="">All Categories</option>
          {categories.map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        {/* Type */}
        <select name="type" value={filters.type} onChange={handleChange} className="p-2 border-b-1 outline-none w-full mb-3 ">
          <option value="">All Types</option>
          {types.map((t, idx) => (
            <option key={idx} value={t}>{t}</option>
          ))}
        </select>

        {/* Year */}
        <select name="year" value={filters.year} onChange={handleChange} className="p-2 border-b-1 outline-none w-full mb-3 ">
          <option value="">All Years</option>
          {years.map((y, idx) => (
            <option key={idx} value={y}>{y}</option>
          ))}
        </select>

        {/* Price Range */}
        <div className="flex flex-col">
          <label className="text-sm">Min Price: ₦{filters.minPrice}</label>
          <input
            type="range"
            name="minPrice"
            min={0}
            max={1000000}
            step={30000}
            value={filters.minPrice}
            onChange={handlePriceChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Max Price: ₦{filters.maxPrice}</label>
          <input
            type="range"
            name="maxPrice"
            min={0}
            max={3000000}
            step={30000}
            value={filters.maxPrice}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      <button
        className="mt-4 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded flex justify-center items-center gap-1"
        onClick={resetFilters}
      >
        <IoCloseOutline size={21} />
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;
















/* 
const ProductFilter = ({ products, setFilteredProducts }) => {
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    brand: "",
    metric: "",
    minPrice: 0,
    maxPrice: 5000000,
    sortBy: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePriceChange = (e) => {
    setFilters({ ...filters, [e.target.name]: Number(e.target.value) });
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.category) filtered = filtered.filter(p => p.category === filters.category);
    if (filters.type) filtered = filtered.filter(p => p.type === filters.type);
    if (filters.brand) filtered = filtered.filter(p => p.brand === filters.brand);
    
    // Filter by specific metric (Storage, Processor, Size)
    if (filters.metric) {
      filtered = filtered.filter(p => 
        p.storageOptions?.some(s => s.size === filters.metric) || 
        p.sizeOptions?.some(s => s.size === filters.metric)
      );
    }

    // Price Filtering
    filtered = filtered.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Sorting
    if (filters.sortBy === "year") {
      filtered.sort((a, b) => b.year_of_release - a.year_of_release);
    } else if (filters.sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-md">
      <h2 className="text-lg font-semibold">Filter by:</h2>

      <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 mt-2">

        <select name="category" onChange={handleFilterChange} className="border-b-1 p-2">
          <option value="">Category</option>
          <option value="smartphone">Smartphone</option>
          <option value="accessories">Accessories</option>
          <option value="gadgets">Gadgets</option>
          <option value="Laptops">Laptops</option>
        </select>

     
        <select name="type" onChange={handleFilterChange} className="border-b-1 p-2" >
          <option value="">Type</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="watch">Watches</option>
          <option value="charger">chargers</option>
        </select>

     
        <select name="brand" onChange={handleFilterChange} className="border-b-1 p-2">
          <option value="" >Brand</option>
          <option value="Apple">Apple</option>
          <option value="samsung">Samsung</option>
        </select>

        <input type="text" name="metric" placeholder="Storage/Processor/Size" 
          onChange={handleFilterChange} className="border-b-1 p-2" />

  
        <div>
          <label>Min Price: ₦{filters.minPrice}</label>
          <input type="range" name="minPrice" min="0" max="1000000" 
            value={filters.minPrice} onChange={handlePriceChange} />
        </div>
        
        <div>
          <label>Max Price: ₦{filters.maxPrice}</label>
          <input type="range" name="maxPrice" min="0" max="5000000" 
            value={filters.maxPrice} onChange={handlePriceChange} />
        </div>

    
        <select name="sortBy" onChange={handleFilterChange} className="border-b-1 p-2">
          <option value="">Sort By</option>
          <option value="year">Newest First</option>
          <option value="price">Lowest Price</option>
        </select>
      </div>

    
      <button onClick={applyFilters} className="mt-3 bg-fuchsia-500 hover:bg-fuchsia-500/80  text-white px-4 py-2 rounded-md">Apply Filters</button>
    </div>
  );
};

export default ProductFilter;
 */