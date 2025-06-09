import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs.jsx";
import { supabase } from "../lib/Supabase.js";
import { useQuery } from "@tanstack/react-query";
import usePairWithProducts from "../components/product/PairWith.jsx";
import ProductXp from "../components/product/ProductXp.jsx";
import { useRelatedProducts } from "../components/product/RelatedProducts.jsx";
import { Helmet } from "react-helmet-async";

import "../styles/NavFoot.css";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdPhoneCallback } from "react-icons/md";

const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const ProductItem = () => {
  const { id } = useParams();
  const {
    data: product,
    error,
    isPending,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(product?.image_url);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [condition, setCondition] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [colorName, setcolorName] = useState(null);

  /* Beauty */
  const [isImageChanging, setIsImageChanging] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);

  /* TAB STATES */
  const [activeTab, setActiveTab] = useState("specs");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const specsRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (product) {
      setSelectedColor(product?.color_options?.[0]);
      setSelectedStorage(product?.metric?.[0]?.size);
      const initialCondition = product.openbox_price ? "openbox" : "fairlyused";
      setCondition(initialCondition);
      const basePrice =
        initialCondition === "openbox"
          ? product.openbox_price
          : product.uk_used_price;
      setFinalPrice(basePrice);
      setMainImage(product?.image_url);
      setcolorName(product?.color_options?.[0]?.name);
    }
  }, [product]);

  useEffect(() => {
    const currentRef = activeTab === "specs" ? specsRef : descRef;
    if (currentRef.current) {
      setUnderlineStyle({
        left: currentRef.current.offsetLeft,
        width: currentRef.current.offsetWidth,
      });
    }
  }, [activeTab]);

  const updatePrice = (newCondition, newStorage) => {
    let basePrice =
      newCondition === "openbox"
        ? product?.openbox_price
        : product?.uk_used_price;
    let storageIncrease =
      product?.metric?.find((s) => s.size === newStorage)?.priceIncrease || 0;
    setFinalPrice(basePrice + storageIncrease);
  };

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
    updatePrice(e.target.value, selectedStorage);
  };

  const handleStorageChange = (e) => {
    setSelectedStorage(e.target.value);
    updatePrice(condition, e.target.value);
  };

  const handleColorClick = (colorOption) => {
    if (selectedColor?.name === colorOption.name) return;
    setSelectedColor(colorOption);
    setIsImageChanging(true);
    setTimeout(() => {
      setMainImage(colorOption.image);
      setcolorName(colorOption?.name);
      setIsImageChanging(false);
    }, 150);
  };

  const handleGalleryClick = (img) => {
    if (img === mainImage) return;
    setIsImageChanging(true);
    setTimeout(() => {
      setMainImage(img);
      setIsImageChanging(false);
    }, 150);
  };

  const formatedPrice = (price) => {
    if (!price || isNaN(price)) return;
    return Number(price).toLocaleString();
  };

  const formatName = (types) => {
    if (!types) return "Capacity";
    const type = types.toLowerCase();
    if (type === "iphone") return "Storage";
    if (type === "watch") return "Size";
    if (type === "charger") return "Wattage";
    if (type === "windows") return "Memory Size";
    return "Capacity";
  };

  function getStars(rating) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar className="text-yellow-400/60" key={i} />);
      } else {
        stars.push(<FaRegStar className="text-yellow-400/60" key={i} />);
      }
    }
    return stars;
  }

  const formatShareMessage = (product) => {
    const shortDesc =
      product.summary?.slice(0, 60) +
      (product.summary.length > 60 ? "..." : "");
    const storageText = selectedStorage ? `(${selectedStorage})` : "";
    const price =
      product?.openbox_price !== null
        ? product?.openbox_price.toLocaleString()
        : product?.uk_used_price !== null
        ? product?.uk_used_price.toLocaleString()
        : "";
    return `I want to buy ${product.brand} ${product.name},(${colorName}),${storageText} priced at ${price} - ${shortDesc}`;
  };
  const encode = (text) => encodeURIComponent(text);

  const { pairWithProducts, loading } = usePairWithProducts(product);

  const { data: relatedProducts, isLoading: relatedLoading } =
    useRelatedProducts(product);

  const RelatedProductSkeleton = () => (
    <div className="w-40 h-56 bg-gray-200 animate-pulse rounded-xl"></div>
  );

  if (isPending)
    return (
      <h1 className="text-center text-fuchsia-500 text-lg mt-10 font-semibold animate-bounce">
        Loading product...
      </h1>
    );
  if (error)
    return (
      <h1 className="text-center text-red-600">
        Hmm... we couldn’t load that product. Double-check your internet
        connection and give it another go.
      </h1>
    );
  if (!product) {
    return <h1 className="text-center">Product not found</h1>;
  }

  return (
    <>
      <Helmet>
        {product && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: product?.name,
                image: product?.gallery,
                description: product?.description,
                brand: { "@type": "Brand", name: product.brand },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "NGN",
                  price: product.openbox_price || product.uk_used_price,
                  availability: "https://schema.org/InStock",
                  url: `https://vipvendor.ng/shop/${product.id}`,
                },
              }),
            }}
          />
        )}
      </Helmet>

      <section key={id} className="p-2 sm:mx-15 ">
        <div className="mt-13 ml-2 p-3 rounded-md bg-fuchsia-200">
          <Breadcrumbs product={product} />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 p-4">
          {/* Main Image + Gallery */}
          <div className="flex flex-col lg:flex-row gap-4 lg:w-1/2 max-h-full overflow-hidden">
            {/* Main Product Image */}
            <aside className="bg-fuchsia-50 flex justify-center items-center rounded-lg aspect-square w-full sm:h-[300px] lg:h-[400px] lg:w-[400px] overflow-hidden">
              <div className="w-full h-full overflow-hidden flex justify-center items-center">
                <img
                  src={mainImage}
                  alt={product?.name}
                  className={`object-contain w-full h-full p-2 transition-all duration-300 ease-in-out ${
                    isImageChanging
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                />
              </div>
            </aside>

            {/* Gallery Images */}
            <section className="flex lg:flex-col gap-2 overflow-x-hidden lg:overflow-y-auto w-full lg:w-fit max-h-[400px] overflow-y-hidden">
              {product.gallery?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`gallery ${index}`}
                  onClick={() => {
                    handleGalleryClick(img);
                    setClickedImage(index);
                  }}
                  onAnimationEnd={() => setClickedImage(null)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded cursor-pointer border transition-all ${
                    mainImage === img ? "border-blue-500" : "border-transparent"
                  } ${clickedImage === index ? "animate-pop" : ""}`}
                />
              ))}
            </section>
          </div>

          {/* Product Info */}
          <aside className="flex-1 p-4 bg-white rounded-lg shadow-lg">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold capitalize">
                {product?.name} —{" "}
                <span className="text-fuchsia-500">{colorName}</span>
              </h2>
              <h2 className="text-xl font-light my-3 border-t pt-2 border-fuchsia-400">
                <span className="font-semibold text-fuchsia-600">
                  ₦{formatedPrice(finalPrice)}
                </span>
              </h2>
            </div>

            {/* Color Options */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 my-4">
              {product?.color_options?.map((colorOption, index) => (
                <button
                  key={index}
                  onClick={() => handleColorClick(colorOption)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor?.name === colorOption.name
                      ? "border-blue-500 scale-110 animate-pulse"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: colorOption.hex }}
                />
              ))}
            </div>

            {/* Brand and Rating */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
              <span className="font-semibold text-fuchsia-700 uppercase">
                {product.brand}
              </span>
              <div className="flex items-center">
                {getStars(product.rating)}
                <span className="ml-2 font-semibold">Year: {product.year}</span>
              </div>
            </div>

            {/* Condition and Storage */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div>
                <label className="font-semibold block mb-1">Condition:</label>
                <select
                  value={condition}
                  onChange={handleConditionChange}
                  className="border rounded-md px-2 py-1 bg-milky text-darkoo">
                  {product.openbox_price && (
                    <option value="openbox">Open Box</option>
                  )}
                  {product.uk_used_price && (
                    <option value="fairlyused">UK Used</option>
                  )}
                </select>
              </div>

              {product?.metric?.length > 0 && (
                <div>
                  <label className="font-semibold block mb-1">
                    {formatName(product?.type)}:
                  </label>
                  <select
                    value={selectedStorage}
                    onChange={handleStorageChange}
                    className="border rounded-md px-2 py-1 bg-milky text-darkoo">
                    {product.metric.map((storage) => (
                      <option key={storage.size} value={storage.size}>
                        {storage.size}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Summary and Message */}
            <article className="space-y-4">
              <p className="text-lg font-spartan">{product?.summary}</p>
              <p className="text-lg text-fuchsia-600 font-spartan border-y border-fuchsia-300 py-2">
                {product?.message}
              </p>
            </article>
          </aside>
        </div>

        <section className="my-5 ">
          <h1 className="text-center font-semibold my-2 text-lg sm:text-xl">
            Order Via
          </h1>
          <div className="flex gap-5 justify-center items-center">
            <a
              href={`https://x.com/messages/compose?recipient_id=125158401112380620&text=${encode(
                formatShareMessage(product)
              )}`}
              target="_blank"
              rel="noopener noreferrer">
              <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-900 px-6 font-medium text-neutral-200 duration-500">
                <div className="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6">
                  <div className="absolute translate-x-0 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0">
                    <FaXTwitter size={20} />
                  </div>
                  <span className="pl-6">Twitter</span>
                  <div className="absolute right-0 translate-x-12 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5">
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </button>
            </a>

            <a
              href={`https://wa.me/2348102022317?text=${encode(
                formatShareMessage(product)
              )}`}
              target="_blank"
              rel="noopener noreferrer">
              <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-green-600 px-6 font-medium text-neutral-200 duration-500">
                <div className="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6">
                  <div className="absolute translate-x-0 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0">
                    <FaWhatsapp size={21} />
                  </div>
                  <span className="pl-6">WhatsApp</span>
                  <div className="absolute right-0 translate-x-12 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5">
                      <path
                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"></path>
                    </svg>
                  </div>
                </div>
              </button>
            </a>
          </div>

          <h2 className="text-center font-semibold my-2">OR</h2>

          <div className="flex justify-center my-1">
            <a href="tel:+2348102022317">
              <button
                type="button"
                className="group relative inline-flex gap-2 h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium text-neutral-600 transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]">
                Place a Call{" "}
                <span>
                  <MdPhoneCallback size={20} />
                </span>
              </button>
            </a>
          </div>
        </section>

        {/* Pair with section.... still working on it */}
        <section className="px-2 my-15 group">
          <div className="flex justify-start sm:justify-center">
            <span className="relative inline-block cursor-pointer">
              <span className="relative z-10 font-poppins text-lg sm:text-xl font-medium">
                Pair with:{" "}
              </span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-purple-500 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </span>
          </div>

          <div className="w-full overflow-x-auto scroll-smooth">
            {loading ? (
              <div className="flex gap-4 overflow-x-auto">
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-[150px] h-[200px] bg-gray-200 animate-pulse rounded"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-nowrap space-x-4 w-max py-2 sm:w-full sm:justify-evenly lg:w-full lg:justify-evenly overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
                {pairWithProducts.map((item) => (
                  <ProductXp key={item.id} product={item} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TAB WORK */}
        <article className="w-full">
          <section className="max-w-4xl mx-auto px-4 ">
            {/* Sticky Tabs */}
            <div className="sticky top-0 z-50 bg-white border-b border-fuchsia-100">
              <div className="relative flex space-x-6 justify-center ">
                <button
                  ref={specsRef}
                  onClick={() => {
                    setActiveTab("specs");
                    moveUnderline(specsRef);
                  }}
                  className={`py-3 px-4 font-semibold transition-colors duration-300 ${
                    activeTab === "specs"
                      ? "text-fuchsia-600"
                      : "text-gray-500 hover:text-fuchsia-500"
                  }`}>
                  Specifications
                </button>

                <button
                  ref={descRef}
                  onClick={() => {
                    setActiveTab("desc");
                    moveUnderline(descRef);
                  }}
                  className={`py-3 px-4 font-semibold transition-colors duration-300 ${
                    activeTab === "desc"
                      ? "text-fuchsia-600"
                      : "text-gray-500 hover:text-fuchsia-500"
                  }`}>
                  Description
                </button>

                {/* Underline */}
                <div
                  className="absolute bottom-0 h-0.5 bg-fuchsia-500 transition-all duration-300 ease-in-out "
                  style={{
                    left: underlineStyle.left,
                    width: underlineStyle.width,
                  }}
                />
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="relative mt-6 h-[500px] overflow-y-auto px-2 custom-scrollbar animate-fadeIn border-b-2 border-fuchsia-400">
              {activeTab === "specs" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      product?.specifications ||
                      "<p>No specifications available.</p>",
                  }}
                  className="max-w-none custom-html"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      product?.description ||
                      "<p>No description available.</p>",
                  }}
                  className="max-w-none custom-html"
                />
              )}
            </div>
          </section>
        </article>

        <section className="my-15 group">
          <div className="flex justify-start sm:justify-center">
            <span className="relative inline-block cursor-pointer">
              <span className="relative z-10 font-poppins text-lg sm:text-xl font-medium">
                Related Products:
              </span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full origin-left scale-x-0 bg-purple-500 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </span>
          </div>

          <div className=" mt-2 w-full overflow-x-auto scroll-smooth">
            {relatedLoading ? (
              <ul className="flex flex-wrap justify-evenly gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <RelatedProductSkeleton key={i} />
                ))}
              </ul>
            ) : relatedProducts?.length > 0 ? (
              <ul className="flex flex-nowrap space-x-4 w-max py-2 sm:w-full sm:justify-evenly lg:w-full lg:justify-evenly overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
                {relatedProducts.map((related) => (
                  <ProductXp key={related.id} product={related} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic text-center">
                No related products found.
              </p>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default ProductItem;
