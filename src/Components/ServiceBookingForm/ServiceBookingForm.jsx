import React, { useState } from 'react';
import { getUser } from '../../Utils/AuthData';
import toast from 'react-hot-toast';
import { bookService } from '../../actions/ServicesForm/ServicesForm';
import { useNavigate } from 'react-router';

const ServiceBookingForm = ({ isOpen, onClose, serviceType, options }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [servicesList, setServicesList] = useState([]);

  const handleName = (e) => setName(e.target.value);
  const handleContact = (e) => setContact(e.target.value);

  const handleServices = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setServicesList([name]);
    } else {
      setServicesList([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !contact) {
      toast.error('Please fill all the fields', { id: 'serviceToast' });
      return;
    }

    if (servicesList.length === 0) {
      toast.error('Please select at least one service', { id: 'serviceToast' });
      return;
    }

    const user = getUser();
    if (!user) {
      toast.error('Please login to continue', { id: 'serviceToast' });
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const data = {
      name,
      contact,
      service: servicesList[0],
      user_id: user?.id,
      date: today
    };

    toast.promise(bookService(data), {
      loading: 'Booking service...',
      success: (data) => {
        if (data?.status === 200) {
          toast.success('Service booked successfully');
          onClose();
          navigate('/');
        } else {
          toast.error(data?.detail || 'Booking failed');
        }
      },
      error: (err) => {
        toast.error(err?.detail || 'Booking failed');
      }
    }, { id: 'serviceToast' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-lg p-6 w-full max-w-md shadow-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Book Service</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={handleName}
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black bg-white/80"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              value={contact}
              onChange={handleContact}
              type="tel"
              pattern="[0-9]{10}"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black bg-white/80"
              placeholder="Enter your contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
            <div className="space-y-2">
              {options ? (
                options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/80 p-2 rounded-md">
                    <input
                      type="checkbox"
                      name={option}
                      id={option}
                      checked={servicesList.includes(option)}
                      onChange={handleServices}
                      className="checkbox checkbox-primary"
                    />
                    <label htmlFor={option} className="text-gray-700 capitalize">
                      {option}
                    </label>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 bg-white/80 p-2 rounded-md">
                  <input
                    type="checkbox"
                    name={serviceType}
                    id={serviceType}
                    checked={servicesList.includes(serviceType)}
                    onChange={handleServices}
                    className="checkbox checkbox-primary"
                  />
                  <label htmlFor={serviceType} className="text-gray-700 capitalize">
                    {serviceType}
                  </label>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-md transition duration-200 shadow-md hover:shadow-lg"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceBookingForm; 