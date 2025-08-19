'use client';

import React from 'react';
import {useState} from 'react';

export default function CreateEventForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    descrip: '',
    img: '' as File | string,
    location: '',
    pax: '',
    org_name: '',
    org_email: '',
    org_phone: '',
    start_date: '',
    end_date: '',
    fares: '',
    e_status: '',
    tags : [],
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>){
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  }

{/*handle file change for image*/}
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
  if (e.target.files && e.target.files[0]) {
    setFormData({
      ...formData,
      img: e.target.files[0],  // store File object
    });
  }
}


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault(); // prevent the form from refresshing the page
  
  const formDataToSend = new FormData();

  // append all fields
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "img") return; // skip img here
    if (key === "tags") {
      // handle array, split by comma if needed
      formDataToSend.append(key, value.toString());
    } else {
      formDataToSend.append(key, value as string);
    }
  });

  // append file separately
  if (formData.img instanceof File) {
    formDataToSend.append("image", formData.img);
  }


    try {
      const res = await fetch("http://localhost:3000/api/v0.1/events/create",{
        method: "POST",
        body: formDataToSend,
      });
      if (res.ok)
        alert("🎉 Event created!");
      else
        alert("⚠️ Failed to create event");
    } catch (err) {
        console.error("Something went wrong", err);
    }
  }

  return (
    <div className="container mx-auto p-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-black mb-6 mt-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" >
        {/* Title */}
        <h2 className="text-xl font-bold text-black">Event Title</h2>
        <div className="p-2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Event Title"
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          />
        </div>

        {/* Category */}
        <h3 className="text-xl font-bold text-black mb-6">Event Category</h3>
        <div className="p-2">
          <select
            id="category"
            name="category"
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          >
            <option value="">Select a category</option>
            <option>Badminton</option>
            <option>Rugby</option>
            <option>Swimming</option>
            <option>Tennis</option>
          </select>
        </div>

        {/* Description and Image Upload */}
        
        <h3 className="text-xl font-bold text-black">Event Details</h3>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div>
            <textarea
              id="descrip"
              name="descrip"
              rows={3}
              placeholder="Event Description"
              onChange={handleChange}
              className="block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            >
              <div className="text-center">
                <div className="mb-2">
                  <button
                    type="button"
                    className="bg-[#8c0327] hover:bg-[#6b0220] text-white rounded-full py-2 px-4"
                  >
                    Select from the computer
                  </button>
                </div>
                <p className="text-gray-500">or drag photo here</p>
                <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG</p>
              </div>
            </label>
            <input
              id="image-upload"
              name="image"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="sr-only"
            />
          </div>
        </div>

        {/* Location */}
        <h3 className="text-xl font-bold text-black">Event Location</h3>
        <div className="p-2">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Central Singapore"
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          />
        </div>

        {/* Pax Number */}
        <h3 className="text-xl font-bold text-black">Pax</h3>
        <div className="p-2">
          <input
            type="phone"
            id="organizer-address"
            name="pax"
            placeholder="20"
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          />
        </div>

        {/* Organizer Name and Email */}
        <h3 className="text-xl font-bold text-black">Organizer Details</h3>
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              id="organizer-name"
              name="org_name"
              placeholder="John Doe"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>

          <div>
            <input
              type="email"
              id="organizer-email"
              name="org_email"
              placeholder="johndoe@gmail.com"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>
        </div>

        {/* Organizer Phone Contact */}
        <h3 className="text-xl font-bold text-black">Organizer Contact</h3>
        <div className="p-2">
          <input
            type="phone"
            id="organizer-address"
            name="org_phone"
            placeholder="+6588888888"
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          />
        </div>

        {/* Start Date and End Date */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Date */}
          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"
                />
              </svg>
              <span className="ml-2">Start Date</span>
            </span>
            <input
              type="datetime-local"
              id="start-date"
              name="start_date"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>

          {/* End Date */}
          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v2M19 3v2M5 10h14M4 21h16a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v12a1 1 0 001 1z"
                />
              </svg>
              <span className="ml-2">End Date</span>
            </span>
            <input
              type="datetime-local"
              id="end-date"
              name="end_date"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>
        </div>

        {/* Ticket Fares */}
         <h3 className="text-xl font-bold text-black">Ticket Fares</h3>
        <div className="p-2">
          <input
            type="phone"
            id="organizer-address"
            name="fares"
            placeholder="$5SGD"
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          />
        </div>

        {/* Status and Tags */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status */}
          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              <label htmlFor="status" className="block">
                Status
              </label>
            </span>
            <select
              id="status"
              name="status"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Items Required (comma-separated)"
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full mt-6 p-2">
          <button
            type="submit"
            className="block w-full bg-[#55a630] hover:bg-[#6b0220] text-gray-500 font-bold py-3 px-4 rounded-full"
          >
            Register for Event
          </button>
        </div>
      </form>
    </div>
  );
}
