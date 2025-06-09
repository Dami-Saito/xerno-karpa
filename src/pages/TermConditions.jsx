import React from 'react';

const TermConditions = () => {
  return (
    <section className="mt-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 border-b-2 pb-4 mb-6">
          Warranty Terms & Conditions
        </h1>

        <p className="mb-4 text-gray-700">
          Used product warranty repairs must be completed by a <strong>vipvendor.ng</strong> accredited
          service facility. If an item has been tampered with by an unapproved service center, the
          warranty will no longer be valid. For any refunds, claims, or damages resulting from the
          unlicensed service center, <strong>vipvendor.ng</strong> is not responsible.
        </p>

        <p className="mb-4 text-gray-700">
          <strong>vipvendor.ng</strong> disclaims all responsibility for any reimbursements, claims, or
          losses that may arise from product repairs that were not permitted.
        </p>

        <p className="mb-4 text-gray-700">
          For pre-owned devices, <strong>vipvendor.ng</strong>'s obligations are restricted to the
          repair of the defect, the replacement of the defective component, or, at its discretion,
          the replacement of the product itself within the specified warranty period. The
          manufacturer is responsible for brand-new devices.
        </p>

        <p className="mb-4 text-gray-700">
          The warranty is only valid when the dealer’s name, product model, and serial number are
          provided as proof of purchase. If this information has been altered or removed since the
          product was purchased, <strong>vipvendor.ng</strong> reserves the right to decline warranty
          coverage.
        </p>

        <p className="mb-4 text-gray-700">
          <strong>vipvendor.ng</strong> offers a <strong>30-day warranty</strong> on used devices. If a
          defect arises after the warranty expires, we will not be held liable for the equipment.
        </p>

        <p className="mb-4 text-gray-700">
          The warranty provided by the manufacturer or <strong>vipvendor.ng</strong> does not cover
          non-mechanical or liquid damage caused by negligent use of the device.
        </p>

        <p className="text-gray-700">
          Please retain the cell phone’s original packaging and pickup receipt, as they are required
          for any warranty or exchange claims.
        </p>
      </div>
    </section>
  );
};

export default TermConditions;
