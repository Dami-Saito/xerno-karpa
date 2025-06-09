import "../../styles/Marquee.css";

/* ICONS */
import { FaApple, FaPlaystation, FaGoogle, FaWindows } from "react-icons/fa6";
import { SiSamsung, SiJbl, SiBeatsbydre, SiXiaomi, SiAsus, SiRepublicofgamers } from "react-icons/si";
import { GrHp } from "react-icons/gr";

const brands = [
  <FaApple size={45} className="fill-gray-400 " />,
  <FaPlaystation size={45} className="fill-gray-400 " />,
  <FaGoogle size={45} className="fill-gray-400 " />,
  <FaWindows size={45} className="fill-gray-400 " />,
  <SiSamsung size={45} className="fill-gray-400 " />,
  <SiJbl size={45} className="fill-gray-400 " />,
  <SiBeatsbydre size={45} className="fill-gray-400 " />,
  <SiXiaomi size={45} className="fill-gray-400 " />,
  <SiAsus size={45} className="fill-gray-400 " />,
  <SiRepublicofgamers size={45} className="fill-gray-400 " />,
  <GrHp size={45} className="fill-gray-400 " />,
];

const Marquee = () => {
    return (
      <section className="py-4 overflow-hidden relative">
        <div className="max-w-2xl mx-auto relative">
          <div className="marquee-container">
            <div className="fade-overlay left"></div>
            <div className="marquee-content">
              {[...brands,...brands].map((brand, index) => (
                <div key={index} className="shrink-0" >
                  {brand}
                </div>
              ))}
            </div>
            <div className="fade-overlay right"></div>
          </div>
        </div>
      </section>
    );
  };

export default Marquee;
