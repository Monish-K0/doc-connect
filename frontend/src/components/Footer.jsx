import React from 'react'

import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiTwitter,
    FiInstagram,
    FiLinkedin
} from 'react-icons/fi'

const Footer = () => {

    return (

        <footer className='mt-32 px-4'>

            <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[40px] overflow-hidden text-white shadow-2xl'>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8 md:px-14 py-16'>

                    {/* BRAND */}

                    <div>

                        <div className='flex items-center gap-3 mb-6'>

                            <div className='w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg'>

                                D

                            </div>

                            <div>

                                <h1 className='text-2xl font-bold'>
                                    Doc-Connect
                                </h1>

                                <p className='text-slate-400 text-sm'>
                                    Smart Healthcare Platform
                                </p>

                            </div>

                        </div>

                        <p className='text-slate-300 leading-relaxed'>

                            Transforming healthcare through seamless digital
                            experiences, trusted doctors, secure prescriptions,
                            and smart appointment management.

                        </p>

                        {/* SOCIALS */}

                        <div className='flex items-center gap-4 mt-8'>

                            <div className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-cyan-500 transition-all duration-300 cursor-pointer'>
                                <FiTwitter />
                            </div>

                            <div className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-all duration-300 cursor-pointer'>
                                <FiInstagram />
                            </div>

                            <div className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 cursor-pointer'>
                                <FiLinkedin />
                            </div>

                        </div>

                    </div>

                    {/* COMPANY */}

                    <div>

                        <h2 className='text-xl font-semibold mb-6'>
                            Company
                        </h2>

                        <ul className='space-y-4 text-slate-300'>

                            <li className='hover:text-cyan-300 transition-all cursor-pointer'>
                                Home
                            </li>

                            <li className='hover:text-cyan-300 transition-all cursor-pointer'>
                                About Us
                            </li>

                            <li className='hover:text-cyan-300 transition-all cursor-pointer'>
                                Doctors
                            </li>

                            <li className='hover:text-cyan-300 transition-all cursor-pointer'>
                                Privacy Policy
                            </li>

                        </ul>

                    </div>

                    {/* SERVICES */}

                    <div>

                        <h2 className='text-xl font-semibold mb-6'>
                            Services
                        </h2>

                        <ul className='space-y-4 text-slate-300'>

                            <li>
                                Online Consultation
                            </li>

                            <li>
                                Digital Prescriptions
                            </li>

                            <li>
                                Appointment Booking
                            </li>

                            <li>
                                Healthcare Management
                            </li>

                        </ul>

                    </div>

                    {/* CONTACT */}

                    <div>

                        <h2 className='text-xl font-semibold mb-6'>
                            Contact
                        </h2>

                        <div className='space-y-5 text-slate-300'>

                            <div className='flex items-center gap-3'>

                                <FiPhone className='text-cyan-400' />

                                <p>
                                    +91 98765 43210
                                </p>

                            </div>

                            <div className='flex items-center gap-3'>

                                <FiMail className='text-cyan-400' />

                                <p>
                                    support@docconnect.com
                                </p>

                            </div>

                            <div className='flex items-start gap-3'>

                                <FiMapPin className='text-cyan-400 mt-1' />

                                <p>
                                    Bangalore, India
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}

                <div className='border-t border-white/10 px-8 py-6 text-center text-slate-400 text-sm'>

                    © 2026 Doc-Connect. All rights reserved.

                </div>

            </div>

        </footer>

    )

}

export default Footer