import React, { useEffect, useState } from 'react';
import { getUser } from '../../Utils/AuthData';
import toast from 'react-hot-toast';
import { bookService } from '../../actions/ServicesForm/ServicesForm';
import { useNavigate } from 'react-router';
import Footer from '../../Components/Footer/Footer';

// #0"electrician"
// #1"plumber"
// #2"home cleaning"
// #3"home painting"
// #4"car wash"
// #5"solar panel wash"
// #6"architecture"
// #7"interior designer"
// #8"contractor"
// #9"loan consultant"
// #10"carpenter"
// #11"tank cleaning"

const services = [
    {
        title: 'Loan Services', desc: 'Home Loan, Gold and More', img: '/images/bank.png', link: 'loan',
        options: ["loan consultant"]
    },
    {
        title: 'Home Interiors & Architecture', desc: 'Free Personal Designer', img: '/images/r1.png', link: 'interior',
        options: ["architecture", "interior designer"]
    },
    {
        title: 'Cleaning Sevices', desc: 'Car, Solar Pannel, Home and More', img: '/images/r1.png', link: 'cleaning',
        options: ['home cleaning', 'car wash', 'solar panel wash', 'tank cleaning', 'home painting']
    },
    {
        title: 'Contractor', desc: 'Best Experienced Services', img: '/images/r1.png', link: 'contractor',
        options: ["contractor", "carpenter"]
    },
    {
        title: 'Plumber', desc: "Full Plumbing Services", img: '/images/r1.png', link: 'plumber',
        options: ['plumber']
    },
    {
        title: 'Electrian', desc: "Full Electrical Services", img: '/images/r1.png', link: 'electrian',
        options: ['electrician']

    },
];

export default function SevicesForm() {
    const navigate = useNavigate();
    const [serviceLink, setServiceLink] = useState(null);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [servicesList, setServicesList] = useState([]);

    const handleName = (e) => setName(e.target.value);

    const handleContact = (e) => setContact(e.target.value);

    const handleServices = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setServicesList([name]);
        }
        else {
            setServicesList([]);
        }
    }
    // const handleServices = (e) => {
    //     const { name, checked } = e.target;
    //     if (checked) {
    //         setServicesList((prev) => [...prev, name]);
    //     } else {
    //         setServicesList((prev) => prev.filter((item) => item !== name));
    //     }
    // }

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
            name, contact, service: servicesList[0], user_id: user?.id, date: today
        }

        toast.promise(bookService(data), {
            loading: 'Booking service...',
            success: (data) => {
                if (data?.status === 200) {
                    toast.success('Service booked successfully');
                    navigate('/')

                } else {
                    toast.error(data?.detail || 'Booking failed');
                }
            },
            error: (err) => {
                toast.error(err?.detail || 'Booking failed');
            }
        }, { id: 'serviceToast' })
    }

    useEffect(() => {
        const service = localStorage.getItem('service');
        if (service) {
            const serviceData = services.find((s) => s.link === service);
            if (serviceData) {
                setServiceLink(serviceData);
            }
        }

    }, [])


    return (
        <>
            <div className="h-full bg-[url(/src/assets/loginbg.jpg)] bg-cover flex flex-col items-center justify-center gap-10">
                <div className="flex flex-col text-center gap-2 px-4 py-2  shadow-lg w-full bg-base-100/50">
                    <span className='text-4xl sm:text-6xl font-bold'>{serviceLink?.title}</span>
                    <span className='text-2xl font-semibold'>फक्त १ तासात तुमच्या घरात सेवा!</span>
                </div>
                <div className="glass card">
                    <form onSubmit={handleSubmit} className="fieldset shadow-lg rounded-box w-xs p-4">

                        <label className="label">Name</label>
                        <input value={name} onChange={handleName} type="name" name='name' required className="input validator !bg-white !text-black focus-within:outline-none focus-withnin:border-none" placeholder="Name" />

                        <label className="label">Contact</label>
                        <input value={contact} pattern="[0-9]{10}" onChange={handleContact} type="text" name='contact' required className="input validator !bg-white !text-black focus-within:outline-none focus-withnin:border-none" placeholder="Contact" />

                        <label className="label">Services</label>
                        <div className="mt-2 flex flex-col gap-2">

                            {serviceLink?.options.map((option, index) => (
                                <div key={`option_${index}`} className="flex items-center gap-2 text-md">
                                    <input checked={servicesList.includes(option)} onChange={handleServices} type="checkbox" name={option} id={option} className="checkbox checkbox-primary" />
                                    <label htmlFor={option} className="label cursor-pointer uppercase text-white">{option}</label>
                                </div>
                            ))}
                        </div>
                        <button type='submit' className="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}




