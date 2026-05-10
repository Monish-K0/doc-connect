import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import {
    FiArrowRight,
    FiShield,
    FiClock,
    FiUsers
} from 'react-icons/fi'

import { assets } from '../assets/assets'

const Header = () => {
    const navigate = useNavigate()
    return (

        <div className='relative overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 px-6 md:px-12 lg:px-20 py-14 md:py-24 mt-6 shadow-2xl'>

            {/* BACKGROUND GLOW */}

            <div className='absolute top-0 left-0 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl'></div>

            <div className='absolute bottom-0 right-0 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl'></div>

            <div className='relative z-10 flex flex-col-reverse md:flex-row items-center gap-12'>

                {/* LEFT SECTION */}

                <motion.div

                    initial={{ opacity: 0, x: -40 }}

                    animate={{ opacity: 1, x: 0 }}

                    transition={{ duration: 0.7 }}

                    className='flex-1 text-center md:text-left'
                >

                    {/* BADGE */}

                    <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6'>

                        <FiShield />

                        Trusted Digital Healthcare Platform

                    </div>

                    {/* HEADING */}

                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight'>

                        Smart Healthcare
                        <br />

                        <span className='text-cyan-200'>
                            Starts Here
                        </span>

                    </h1>

                    {/* SUBTEXT */}

                    <p className='text-white/80 text-base sm:text-lg mt-6 leading-relaxed max-w-xl'>

                        Connect instantly with trusted doctors,
                        manage appointments, access prescriptions,
                        and experience seamless digital healthcare
                        with Doc-Connect.

                    </p>

                    {/* BUTTONS */}

                    <div className='flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start'>

                        <a
                            href='#speciality'
                            className='group inline-flex items-center justify-center gap-2 bg-white text-slate-800 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition-all duration-300'
                        >

                            Book Appointment

                            <FiArrowRight className='group-hover:translate-x-1 transition-all' />

                        </a>

                        <button
    onClick={() => navigate('/doctors')}
    className='bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300'
>

                            Explore Doctors

                        </button>

                    </div>

                    {/* STATS */}

                    <div className='grid grid-cols-3 gap-4 mt-12'>

                        <div className='bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center'>

                            <FiUsers className='mx-auto text-white text-2xl mb-2' />

                            <h3 className='text-white font-bold text-xl'>
                                100+
                            </h3>

                            <p className='text-white/70 text-sm'>
                                Doctors
                            </p>

                        </div>

                        <div className='bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center'>

                            <FiClock className='mx-auto text-white text-2xl mb-2' />

                            <h3 className='text-white font-bold text-xl'>
                                24/7
                            </h3>

                            <p className='text-white/70 text-sm'>
                                Support
                            </p>

                        </div>

                        <div className='bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center'>

                            <FiShield className='mx-auto text-white text-2xl mb-2' />

                            <h3 className='text-white font-bold text-xl'>
                                Secure
                            </h3>

                            <p className='text-white/70 text-sm'>
                                Platform
                            </p>

                        </div>

                    </div>

                </motion.div>

                {/* RIGHT SECTION */}

                <motion.div

                    initial={{ opacity: 0, x: 40 }}

                    animate={{ opacity: 1, x: 0 }}

                    transition={{ duration: 0.7 }}

                    className='flex-1 relative'
                >

                    {/* FLOATING CARD */}

                    <div className='absolute -top-12 -left-20 bg-white rounded-2xl shadow-2xl p-4 z-20 hidden md:flex items-center gap-3'>


    <div className='w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold text-xl'>
        +
    </div>

    <div>

        <p className='font-semibold text-slate-800'>
            10K+ Patients Served
        </p>

        <p className='text-sm text-slate-500'>
            Trusted healthcare across India
        </p>

    </div>

</div>

                    {/* MAIN IMAGE */}

                    <div className='relative'>

                        <img
                            src={assets.header_img}
                            alt=""
                            className='relative z-10 w-full max-w-xl mx-auto drop-shadow-2xl'
                        />

                    </div>

                </motion.div>

            </div>

        </div>

    )

}

export default Header