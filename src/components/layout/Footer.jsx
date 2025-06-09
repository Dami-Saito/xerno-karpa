import { Link } from "react-router-dom";
import FooterIcons from "./FooterIcons";

const ComponentName = () => {        
    return (
        <section className="pt-5 bg-gray-50 sm:pt-16 lg:pt-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
            <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <img className="w-full h-auto" src="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/landing/vip_logo_rectangleC.jpg" alt="" />

                <p className="text-base leading-relaxed text-gray-600 mt-7 sm:text-lg ">Thank you for visiting <span className="text-fuchsia-500 font-extrabold">Vipvendor.ng</span>, We appreciate you taking the time to explore our items. If you found something you love, we&apos;re truly <span className="text-fuchsia-500 font-bold">grateful</span> for your <span className="text-fuchsia-500 font-bold">support and patronage.</span> </p> 

                <FooterIcons />
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Company</p>

                <ul className="mt-6 space-y-4">
                    <Link to="/#" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> Home </p>
                    </Link>

                    <Link to="/shop" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> Shop </p>
                    </Link>

                    <Link to="/about" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> About </p>
                    </Link>

                    <Link to="/contact" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> Contact </p>
                    </Link>
                </ul>
            </div>

            <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Help</p>

                <ul className="mt-6 space-y-4">
                    <Link to="/customer" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> Customer Support </p>
                    </Link>

                    <Link to="/delivery" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> Delivery Policy </p>
                    </Link>

                    <Link to="/terms" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> Terms & Conditions </p>
                    </Link>

                    <Link to="/privacy" >
                        <p className="flex text-base text-black transition-all duration-200 mb-4 hover:text-blue-600 focus:text-blue-600"> Privacy Policy </p>
                    </Link>
                </ul>
            </div>

            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                <div className="flex gap-5">
                    <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Our Amazing Newsletter is coming Soon</p>
                </div>
                <section>
                    <button type="submit" className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 uppercase">Stay_Tuned#</button>
                </section>
            </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">© Copyright 2025. All rights reserved by <span className="text-fuchsia-500 font-semibold">Vipvendor.ng</span></p>
    </div>
</section>

    )
}
export default ComponentName;