import React from 'react';
import { useNavigate } from 'react-router';

const ServicesPage = () => {
    const navigate = useNavigate();
    const services = [
        { title: 'Loan Services', desc: 'Home Loan, Gold and More', img: '/images/bank.png', link: 'loan' },
        { title: 'Home Interiors & Architecture', desc: 'Free Personal Designer', img: '/images/homeineterion.png', link: 'interior' },
        { title: 'Cleaning Sevices', desc: 'Car, Solar Pannel, Home and More', img: '/images/cleaner.png', link: 'cleaning' },
        { title: 'Contractor', desc: 'Best Experienced Services', img: '/images/contractor.png', link: 'contractor' },
        { title: 'Plumber', desc: "Full Plumbing Services", img: '/images/plumber.png', link: 'plumber' },
        { title: 'Electrician', desc: "Full Electrical Services", img: '/images/electrician.png', link: 'electrician' },
    ];

    const navigateToService = (link) => {
        if (link === 'electrician') {
            navigate('/electrician-services');
        } else if (link === 'plumber') {
            navigate('/plumber-services');
        } else if (link === 'loan') {
            navigate('/loan-services');
        } else if (link === 'contractor') {
            navigate('/contracter-services');
        } 
        else {
            localStorage.setItem('service', link);
            navigate(`/services`);
        }
    }

    return (
        <div className="w-full min-h-full h-fit bg-base-100 py-10 ">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-base-content">
                Everything You Need at One Place
            </h1>
            <h3 className='text-xl md:text-2xl opacity-70 text-center mb-8 text-base-content'>At Your Home in One Hour</h3>
            <div className="flex flex-wrap justify-center items-center gap-4 px-4 sm:px-8 py-6">
                {services.map((service, index) => (
                    <div onClick={() => navigateToService(service.link)} key={`services_${index}`} className="card shadow cursor-pointer relative overflow-hidden basis-1/3 grow sm:basis-1/4 aspect-square sm:aspect-video bg-base-content/10 hover:bg-base-content/20">
                        <img src={service?.img} className='absolute w-2/3 sm:w-1/2 aspect-auto bottom-0 right-0' />
                        <div className="card h-full !z-[2] w-full flex flex-col justify-start items-start gap-2 p-4">
                            <h1 className='font-bold sm:text-xl'>{service?.title}</h1>
                            <p className='text-sm sm:text-lg'>{service?.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;