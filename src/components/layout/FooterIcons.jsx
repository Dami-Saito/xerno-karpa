import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useRef, useState } from "react";


export default function FooterIcons() {
    return(
        <section className="flex items-start py-3">
            <div className="flex justify-center items-start space-x-2.5">
                <a href="https://www.facebook.com/vipvendorofficial" target="_blank" rel="noopener noreferrer">
                    <Iconbutton text="Facebook">
                        <FiFacebook size={20} />
                    </Iconbutton>
                </a>

                <a href="https://twitter.com/vipvendor" target="_blank" rel="noopener noreferrer">
                    <Iconbutton text="Twitter" color="bg-darkoo">
                        <FaXTwitter size={20} />
                    </Iconbutton>
                </a>

                <a href="https://www.instagram.com/vipvendorofficial/" target="_blank" rel="noopener noreferrer">
                    <Iconbutton text="Instagram" color="bg-gradient-to-tr from-yellow-500 to-purple-500 via-pink-500">
                        <FaInstagram size={20} />
                    </Iconbutton>
                </a>
            </div>
        </section>
    )
}

export function Iconbutton({ children, text, color, ...props }) {
    const [hovered, setHovered] =useState(false)
    const ref = useRef(null)

    return (
        <button 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
            flex p-2 items-center rounded-lg text-white ${color || "bg-blue-500"}
        `}
         {...props} >
            {children}
            <div 
            style={{ width: hovered ? ref.current?.offsetWidth || 0 : 0 }}
            className="overflow-x-hidden transition-all duration-300 ease-in-out">
                <span ref={ref} className="px-1.5" >{text}</span>
            </div>
        </button>
    )
}