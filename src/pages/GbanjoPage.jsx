import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/Supabase.js";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const GbanjoModal = lazy(() => import("../components/common/GbanjoModal.jsx"));


const GbanjoPage = () => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const [searchParams] = useSearchParams();
  const dealIdFromUrl = Number(searchParams.get("deal"));

  useEffect(() => {
    const fetchDeals = async () => {
      const { data, error } = await supabase
        .from("gbanjo")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching gbanjo deals:", error);
      } else {
        setDeals(data);
      }

      setLoading(false);
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    if (dealIdFromUrl && deals.length) {
      const dealFromAbove = deals.find((d) => d.id === Number(dealIdFromUrl));
      if (dealFromAbove) {
        setSelectedDeal(dealFromAbove);
        setMainImage(dealFromAbove.gallery?.[0] || "");
      }
    } else {
      // When dealIdFromUrl is gone
      setSelectedDeal(null);
      setMainImage("");
    }
  }, [dealIdFromUrl, deals]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (selectedDeal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedDeal]);

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const handleCardClick = (deal) => {
    setSelectedDeal(deal);
    setMainImage(deal.gallery?.[0] || "");
  };

  const handleCloseModal = () => {
    setSelectedDeal(null);
    setMainImage("");
    navigate(`/gbanjopage`, { replace: true });
  };

  const formatShareMessage = (deal) => {
    const shortDesc =
      deal.description?.slice(0, 120) +
      (deal.description.length > 120 ? "..." : "");
    return `I want to buy ${
      deal.title
    }, priced at ${deal.price.toLocaleString()} - ${shortDesc}`;
  };

  const encode = (text) => encodeURIComponent(text);

  return (
    <section className="px-4 py-6 w-full mt-10">
      <section className="px-4 py-6 mb-7 text-center bg-fuchsia-50 rounded-lg shadow-md max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <span className="text-xl font-bold text-red-500 mr-2">🔥</span>
          <h2 className="text-2xl font-semibold text-fuchsia-700">
            Gbanjo Deals
          </h2>
        </div>
        <p className="text-[17px] text-justify sm:text-xl font-spartan text-gray-600">
          Welcome to{" "}
          <span className="font-semibold text-fuchsia-600">Gbanjo Deals</span> —
          offering high-quality tech at unbeatable prices. These products are
          priced lower due to minor imperfections like cosmetic damage or
          battery wear. Rest assured, all items are fully functional, with clear
          details about their condition. Get great tech at a fraction of the{" "}
          <span className="text-fuchsia-500 font-semibold">price!</span>
        </p>
      </section>

      <div className="flex flex-wrap justify-evenly gap-4 sm:gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-[140px] sm:w-[160px] animate-pulse">
                  <div className="w-full h-40 bg-gray-200 rounded-md mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              ))
          : deals.map((deal) => (
              <div
                key={deal.id}
                onClick={() => handleCardClick(deal)}
                className="w-[150px] sm:w-[260px] border border-gray-100 rounded-lg p-2 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                <div className="w-full bg-gray-100 rounded-md overflow-hidden mb-2 relative">
                  {!imageLoaded[deal.id] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                  <img
                    src={deal.gallery?.[0] || "https://via.placeholder.com/300"}
                    alt={deal.title}
                    onLoad={() => handleImageLoad(deal.id)}
                    className={`w-full h-auto object-contain transition-all duration-300 ease-in-out ${
                      imageLoaded[deal.id] ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                <h3 className="text-sm font-semibold">{deal.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {deal.description}
                </p>
                <p className="text-blue-600 font-bold text-sm mt-1">
                  ₦{deal.price.toLocaleString()}
                </p>
              </div>
            ))}
      </div>

      {/* Modal */}
      {selectedDeal && (
      <Suspense fallback={<div className="text-center mt-10 text-fuchsia-600">Loading...</div>}>
        <GbanjoModal
          selectedDeal={selectedDeal}
          onClose={handleCloseModal}
          mainImage={mainImage}
          setMainImage={setMainImage}
          modalRef={modalRef}
        />
      </Suspense>
      )}


    </section>
  );
};

export default GbanjoPage;
