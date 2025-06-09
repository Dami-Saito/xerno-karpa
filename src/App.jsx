import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState, Suspense, lazy } from 'react'
/* COMPONENTS */
import Sidebar from './components/layout/Sidebar.jsx'
import Footer from './components/layout/Footer.jsx'
import ScrollToTop from './utils/ScrollToTop.js'

/* PAGES */
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Shop from './pages/Shop.jsx'
import GbanjoPage from './pages/GbanjoPage.jsx'
import ProductItem from './pages/ProductItem.jsx'

const CustomerSupport = lazy(() => import('./pages/CustomerSupport.jsx'))
const DeliveryDetails = lazy(() => import('./pages/DeliveryDetails.jsx'))
const TermConditions = lazy(() => import('./pages/TermConditions.jsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'))

import './app.css'


function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add("overlay-active");
    } else {
      document.body.classList.remove("overlay-active");
    }
  }, [isExpanded]);
  

  const closeSideBar = () => {
    setIsExpanded(false)
  }

  const closeIconBar = () => {
    setIsHidden(true);
    setIsExpanded(false);
  }

  useEffect( ()=> {
     setIsExpanded(false);
     setIsHidden(true);
  }, [location.key]);



  return (  
        <div>
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isHidden={isHidden} setIsHidden={setIsHidden} />
            
            {isExpanded && (
              <div className="fixed inset-0 bg-red-600/50 z-32" onClick={closeSideBar}></div>
            )}

            {!isHidden && (
              <div className='fixed inset-0 bg-transparent z-20' onClick={closeIconBar} ></div>
            )}

            <div className={`flex-1 transition-all z-30`} >
              <>
              <ScrollToTop />
              <Suspense fallback={<div className='text-center p-4'>Loading...</div>} >
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/shop' element={<Shop />} />
                  <Route path='/shop/:id' element={<ProductItem />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/gbanjopage' element={<GbanjoPage />} />

                  <Route path='/customer' element={<CustomerSupport />} />
                  <Route path='/delivery' element={<DeliveryDetails />} />
                  <Route path='/terms' element={<TermConditions />} />
                  <Route path='/privacy' element={<PrivacyPolicy />} />
                </Routes>
              </Suspense>
              </>
            </div>
            <Footer />
        </div>
  )
}

export default App   