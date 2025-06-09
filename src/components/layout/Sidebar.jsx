import { NavLink } from "react-router-dom";
import "../../styles/NavFoot.css"
/* React Icons */
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RiMenu4Line } from "react-icons/ri";
import { VscFlame } from "react-icons/vsc";

const Sidebar = ({ isExpanded, setIsExpanded, isHidden, setIsHidden }) => {

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleHide = () => setIsHidden(!isHidden);


  return (
    <>
      {!isHidden && (
        <aside className={`transition-[width] duration-300 ease-in-out fixed top-0 left-0 z-40 h-screen font-spartan border-star border-r-1 ${isExpanded ? "w-[240px]" : "w-[80px]" } md:max-w-[300px] sm:min-w-[70px] ` } >
          <nav className="h-full flex flex-col bg-star" role="navigation" aria-label="main navigation"  >
            <div className=" mt-4 p-4 pb-2 flex justify-between items-center" >
              <div className={`text-purple font-semibold ${isExpanded ? "block" : "hidden" } `} >
                <img src="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/landing/ViplogoMark.webp" alt="logo Nla" className="h-20" />
              </div>
              <button className=" flex px-2 items-center " onClick={toggleExpand} >
                {isExpanded ? <IoIosArrowRoundBack size={30} /> : <RiMenu4Line size={25} /> }
              </button>
            </div>

            <ul className="flex-1 px-3 mt-2">
              <NavItem icon={<BsFillGrid1X2Fill size={17} 
              className="fill-gray-500 group-hover:fill-white" />} 
              text="Home" 
              link="/" 
              isExpanded={isExpanded} />

              <NavItem icon={<FaCartShopping size={17} className="fill-gray-500 group-hover:fill-white" />} 
              text="Shop" link="/shop" isExpanded={isExpanded} />

              <NavItem icon={<FaUserCircle size={17} className="fill-gray-500 group-hover:fill-white" />} text="About" link="/about" isExpanded={isExpanded} />

              <NavItem icon={<FaLocationDot className="fill-gray-500 group-hover:fill-white"  size={17} />} text="Contact" link="/contact" isExpanded={isExpanded} />

              <div className="h-0.5 w-auto bg-black/30 "> </div>
              
              <NavItem icon={<VscFlame className="fill-yellow-600 group-hover:fill-red group-hover:animate-pulse group-hover:scale-120 transition-all duration-300 ease-in-out"  size={18} />} text="Gbanjo Deals" link="/gbanjopage" isExpanded={isExpanded} />
              
            </ul>
          </nav>
        </aside>
      )}

      {isHidden && (
        <button
          onClick={toggleHide}
          className="fixed top-6 left-2.5 z-20 text-[#050315] px-3.5 py-2">
          <RiMenu4Line size={25} />
        </button> )}
    </>
  );
};


export function NavItem({ icon, text, link, isExpanded }) {
  return (
    <NavLink to={link}>
      {({ isActive }) => (
        <div
          className={`relative flex items-center px-2 py-3.5 rounded-md cursor-pointer group`}
        >
          <div
            className={`p-2 flex items-center rounded-xl shadow-md transition-all
              ${isActive ? "bg-darkoo text-white scale-105" : "bg-whitoo group-hover:bg-darkoo group-hover:scale-120"}`}
          >
            <div>
              {icon}
            </div>
          </div>

          <span
            className={`text-lg mt-2.5 pl-4 font-spartan flex items-center transition-all duration-300 whitespace-nowrap
              ${isExpanded ? "block" : "hidden"}
              ${isActive ? "text-darkoo" : "text-gray-700/60 group-hover:text-darkoo"}`}
          >
            {text}
          </span>
        </div>
      )}
    </NavLink>
  );
}

export default Sidebar;


