
const DeliveryDetails = () => {
  return (
    <section className="mt-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 pb-4 mb-6">
          Delivery Policy
        </h1>

        <p className="mb-4 text-gray-700">
          At <strong>Vipvendor.ng</strong>, we make every effort to ensure that your requests are
          processed correctly and that your products are delivered as promptly as possible.
        </p>

        <p className="mb-4 text-gray-700">
          Our online store serves <strong>all Geopolitical Zones in Nigeria</strong>.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Estimated Delivery Times (Working Days)</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>North Central: 3 to 5 Days</li>
            <li>North East: 2 to 5 Days</li>
            <li>North West: 2 to 5 Days</li>
            <li>South East: 2 to 4 Days</li>
            <li>South West: 1 to 2 Days</li>
            <li>South South: 2 to 3 Days</li>
          </ul>
        </div>

        <p className="text-gray-700">
          For specific questions or delivery updates, feel free to reach out to us via any
          of our official social media platforms.
        </p>
      </div>
    </section>
  );
};

export default DeliveryDetails;
