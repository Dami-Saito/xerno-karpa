import { IoMdClose } from "react-icons/io";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const GbanjoModal = ({ selectedDeal, onClose, mainImage, setMainImage, modalRef }) => {
  const encode = (text) => encodeURIComponent(text);

  const formatShareMessage = (deal) => {
    const shortDesc =
      deal.description?.slice(0, 120) +
      (deal.description.length > 120 ? "..." : "");
    return `I want to buy ${
      deal.title
    }, priced at ${deal.price.toLocaleString()} - ${shortDesc}`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-4 max-w-md w-full relative mx-4"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
        >
          <IoMdClose size={35} className="fill-fuchsia-700" />
        </button>

        {/* Modal Body */}
        <section className="flex flex-col sm:flex-row gap-5">
          <div className="w-full mb-3 rounded-md overflow-hidden flex justify-center ">
            <img
              src={mainImage || "https://via.placeholder.com/300"}
              alt="Main"
              className="w-auto object-contain rounded-xl bg-fuchsia-100/80 "
            />
          </div>

          <div className="flex sm:flex-col justify-center space-x-2 mb-3 overflow-x-auto sm:overflow-x-hidden ">
            {selectedDeal.gallery?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                  mainImage === img
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </section>

        <h2 className="text-2xl font-semibold font-spartan capitalize">
          {selectedDeal.title}
        </h2>
        <p className="text-gray-600 font-spartan text-lg mb-2">
          {selectedDeal.description}
        </p>
        <p className="text-xl font-semibold text-fuchsia-600 font-spartan my-3 pt-1.5 pb-1.5 border-t-1 border-b-1 border-fuchsia-400 mb-3">
          ₦{selectedDeal.price.toLocaleString()}
        </p>

        <div>
          <p className="text-gray-500 text-lg mb-2">Buy through:</p>
          <div className="flex space-x-4">
            <a
              href={`https://wa.me/?text=${encode(
                formatShareMessage(selectedDeal)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:underline flex gap-1 items-center border-r-1 border-fuchsia-200 pr-1 "
            >
              WhatsApp
              <FaSquareWhatsapp className="fill-green-700" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encode(
                formatShareMessage(selectedDeal)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/70 font-medium hover:underline flex gap-1 items-center border-r-1 border-fuchsia-200 pr-1 "
            >
              Twitter
              <FaXTwitter className="fill-black/40" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?quote=${encode(
                formatShareMessage(selectedDeal)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium hover:underline flex gap-1 items-center border-r-1 border-fuchsia-200 pr-1 "
            >
              Facebook
              <FaFacebookSquare className="fill-blue-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GbanjoModal;
