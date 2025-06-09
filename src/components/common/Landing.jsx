
const Landing = () => {
  return (
    <section>
        <div className="relative bg-gray-50">
    <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <img className="w-auto h-full" src="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/landing/pattern.png" alt="pattern" />
    </div>

    <section className="relative ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-8">
                <div className='py-1 sm:py-10 lg:py-6 '>
                    <div className="text-center lg:text-left">
                        <h1 className=" text-2xl sm:text-4xl font-bold leading-tight text-gray-900 md:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-spartan">
                            <div className='relative inline-flex'>
                                <span className='absolute inset-x-0 bottom-0 border-b-[13px] sm:border-b-[22px] lg:border-b-[32px] border-fuchsia-500/50 '></span>
                                Vipvendor.ng...</div> Don&apos;t worry, we have it. </h1>
                        <p className="mt-2 text-[16px] sm:text-lg text-gray-600 sm:mt-8 font-inter">Looking for the best bargains? Find amazing discounts on top-quality products every day</p>
                    </div>

                    <div className="flex items-center justify-center mt-10 space-x-6 lg:justify-start sm:space-x-8">
                        <div className="flex items-center">
                            <p className="text-[16px] sm:text-3xl font-medium text-gray-900 md:text-4xl font-pj"><span className='text-fuchsia-500 font-bold sm:font-semibold'>1943</span></p>
                            <p className="ml-3 text-[16px] sm:text-[17px] text-gray-900 font-spartan">Devices<br />Delivered</p>
                        </div>

                        <div className="hidden sm:block">
                            <svg className="text-gray-400" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                                <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                                <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                                <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                                <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                            </svg>
                        </div>

                        <div className='flex items-center'>
                            <p className="text-sm sm:text-3xl font-medium text-gray-900 md:text-4xl font-pj"><span className='text-fuchsia-500 font-bold sm:font-semibold'>₦17M+</span></p>
                            <p className="ml-3 text-[16px] sm:text-[17px] text-gray-900 font-spartan">Transaction<br />Completed</p>
                        </div>
                    </div>
                </div>

                <div className='relative w-full h-full'>
                    <img src="https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/landing/reghanew.webp" alt="image" className='border-b-1 border-fuchsia-500 w-full h-full lg:absolute lg:bottom-0 lg:right-0 xl:relative ' />
                </div>
            </div>
        </div>
    </section>
</div>

    </section>
  )
}

export default Landing