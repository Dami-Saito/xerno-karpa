import { Link } from 'react-router-dom';


const Integration = () => {
    return (
        <section className="py-10 bg-white sm:py-16 lg:py-24 font-poppins">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
                    <div>
                        <img className="w-full max-w-md mx-auto" src="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/landing/integration.png" alt="" />
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl font-spartan">Perfect products, Hassle-free doorstep delivery</h2>
                        <p className="mt-3 sm:mt-6 text-[16px] sm:text-xl text-gray-600 leading-loose sm:leading-relaxed" >Browse our website, find the <span className='text-fuchsia-500 font-semibold'>perfect products</span>, and enjoy <span className='text-fuchsia-500 font-semibold'>hassle-free doorstep delivery</span>, We&apos;re available 24/7 to bring you the <span className='text-fuchsia-500 font-semibold'>best shopping</span> experience</p>
                        
                        <Link to='/shop' className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md mt-9 hover:bg-blue-700 focus:bg-blue-700" role="button"> Check all our products </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Integration;