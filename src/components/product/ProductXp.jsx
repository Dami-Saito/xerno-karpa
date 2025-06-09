import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa6";

const ProductXp = ({ product }) => {
  function formatPrice(price) {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return price.toString();
  }

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

  return (
    <div>
      <Link to={`/shop/${product.id}`}>
        <div className="w-full max-w-[140px] sm:w-max md:max-w-[155px] border-fuchsia-200/50 border-b-1 border-r-1 px-1 sm:px-1 snap-start ">
          <img
            src={product.image_url}
            loading="lazy"
            alt={product.name}
            className="w-full h-auto object-contain hover:scale-120 transition-all duration-500 ease-in-out "
          />
          <div className="mt-3 text-start">
            <div className="flex justify-between items-center">
              <p className="text-md text-gray-500">{product.brand}</p>
              <p className="text-sm font-bold text-fuchsia-600">
                ₦{formatPrice(product.openbox_price || product.uk_used_price)}
              </p>
            </div>
            <p className="text-[17px] capitalize mt-1 mb-2 ">{product.name}</p>
            <div className="flex mt-1 mb-2">{getStars(product.rating)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductXp;
