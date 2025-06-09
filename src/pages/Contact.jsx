
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";

const Products = () => (
  <main className="">
    <div
      className="bg-cover bg-center h-64 w-full flex flex-col items-center justify-center "
      style={{
        backgroundImage:
          "url('https://sgeuiyvkvqygvfvlhpka.supabase.co/storage/v1/object/public/products/ux/banner.webp')",
      }}>
      <h1 className="text-center text-3xl sm:text-5xl font-semibold text-white mb-4 font-poppins">
        #Let&apos;s_talk
      </h1>

      <p className="text-center text-white text-sm sm:text-xl font-poppins">
        SEND US A MESSAGE, We love to hear from you
      </p>
    </div>

    <section className="my-7 px-5 font-poppins flex flex-col sm:flex-row gap-4">
      <div className="">
        <span>GET IN TOUCH</span>
        <h2 className="font-bold my-2 text-xl">
          Visit our Office or contact us today
        </h2>
        <h3 className="font-semibold my-2">Our Office</h3>

        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <li className="list-none">
              <GrMapLocation size={18} />
            </li>
            <p className="text-gray-500 ">
              6 Idowu lane, last floor, isoteck plaza, Computer Village, ikeja,
              100212, Lagos, Nigeria.
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <li className="list-none">
              <MdOutlineLocalPhone size={20} />
            </li>
            <p className="text-gray-500">
              <span className="text-fuchsia-500 font-semibold">(+234)</span> 810
              202 2317
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <li className="list-none">
              <IoMailOutline size={18} />
            </li>
            <p className="text-gray-500">help@Vipvendor.ng</p>
          </div>

          <div className="flex gap-4 items-center">
            <li className="list-none">
              <IoIosTimer size={18} />
            </li>
            <p className="text-gray-500">
              Monday to Saturday:{" "}
              <span className="text-fuchsia-500 font-semibold">
                9:00AM to 6:00PM
              </span>
            </p>
          </div>
        </div>
      </div>

      <aside className="w-full h-64 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4138537340673!2d3.3402274499999933!3d6.595376200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93092dfc9d2f%3A0x956025cec0826706!2sVip%20Vendor!5e0!3m2!1sen!2sng!4v1747237031136!5m2!1sen!2sng"
          className="w-full h-full border-0 rounded-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </aside>
    </section>
  </main>
);

export default Products;
