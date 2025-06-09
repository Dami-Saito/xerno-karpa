import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="mt-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 pb-4 mb-6">
          Privacy Policy
        </h1>

        <p className="mb-4 text-gray-700">
          At <strong>Vipvendor.ng</strong>, your privacy is important to us. While we do not collect
          sensitive personal information through our website, we may request a delivery address when
          processing orders offline. This information is used solely to ensure the safe delivery of
          your product.
        </p>

        <p className="mb-4 text-gray-700">
          <strong>No login, no transactions:</strong> Our site does not feature any login or online
          payment system. Purchases are conducted via direct messaging with the vendor, usually
          through social media links provided on the product page.
        </p>

        <p className="mb-4 text-gray-700">
          <strong>Third-party links:</strong> Our site may contain links to vendors' social profiles
          or external pages. We are not responsible for the privacy practices of these third parties.
        </p>

        <p className="mb-4 text-gray-700">
          <strong>Data security:</strong> Any address or contact information you provide during your
          purchase process is handled securely and never shared with third-party marketers.
        </p>

        <p className="text-gray-700">
          By using <strong>Vipvendor.ng</strong>, you consent to this privacy policy. If you have any
          questions, feel free to contact us via our social media handles.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
