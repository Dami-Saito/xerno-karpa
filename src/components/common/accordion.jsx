import { useContext, createContext, useEffect, useState, useRef } from "react"
import { FaChevronDown } from "react-icons/fa6"

const AccordionContext = createContext()

export default function Accordion({ children, value, onchange, ...props }) {
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        onchange?.(selected)
    }, [selected])

    return (
        <ul {...props} >
            <AccordionContext.Provider value={{selected, setSelected}} >
                {children} 
            </AccordionContext.Provider>
        </ul>
    )
}

export function AccordionItem({ children, value, trigger, ...props }) {
    const {selected, setSelected} = useContext(AccordionContext)
    const open = selected == value
    const ref = useRef(null)

    return (
        <li className="border-b" {...props} >
            <header role="button" onClick={() => setSelected(open ? null : value)} className="flex justify-between items-center p-4 font-medium text-sm sm:text-lg" >
                {trigger}
                <FaChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : "" }`} />
            </header>
            <div className="overflow-y-hidden text-sm sm:text-lg transition-all duration-600" style={{height: open ? ref.current?.offsetHeight || 0 : 0}} >
                <div className="pt-2 p-4" ref={ref} >{children}</div>
            </div>
        </li>
    )
}