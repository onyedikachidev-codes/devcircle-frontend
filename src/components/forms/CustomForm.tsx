import React, { useState } from "react";

export default function FintechForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    amount: "",
    range: 50,
    jobType: "full-time",
    acceptedTerms: false,
    paymentMethod: "credit-card",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6 bg-white shadow-lg rounded-md"
    >
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-700 focus:border-blue-700"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-700 focus:border-blue-700"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-700 focus:border-blue-700"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          placeholder="Enter amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-700 focus:border-blue-700"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="range" className="block text-sm font-medium">
          Range: {formData.range}
        </label>
        <input
          type="range"
          id="range"
          name="range"
          value={formData.range}
          onChange={handleChange}
          min="0"
          max="100"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="jobType" className="block text-sm font-medium">
          Job Type
        </label>
        <select
          id="jobType"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-700 focus:border-blue-700"
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
            className="mr-2"
          />
          I accept the terms and conditions
        </label>
      </div>

      <div className="space-y-2">
        <p className="block text-sm font-medium">Payment Method</p>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="credit-card"
              checked={formData.paymentMethod === "credit-card"}
              onChange={handleChange}
              className="mr-2"
            />
            Credit Card
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={formData.paymentMethod === "paypal"}
              onChange={handleChange}
              className="mr-2"
            />
            PayPal
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-700 focus:border-blue-700"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-700 text-white rounded-md hover:bg-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
