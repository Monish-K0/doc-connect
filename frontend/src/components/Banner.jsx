import React from 'react'

import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import {
    FiArrowRight,
    FiCalendar,
    FiShield,
    FiStar
} from 'react-icons/fi'

import { assets } from '../assets/assets'

const Banner = () => {

    const navigate = useNavigate()

    return (

        <motion.div

            initial={{ opacity: 0, y: 40 }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.7 }}

            viewport={{ once: true }}

            className='relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-indigo-900 to-cyan-900 px-6 sm:px-10 md:px-16 lg:px-20 py-16 my-28 shadow-2xl'
        >

            {/* GLOW EFFECTS */}

            <div className='absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl'></div>

            <div className='absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl'></div>

            <div className='relative z-10 flex flex-col-reverse md:flex-row items-center gap-12'>

                {/* LEFT SIDE */}

                <div className='flex-1 text-center md:text-left'>

                    <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-sm text-cyan-200 mb-6'>

                        <FiShield />

                        Trusted by Thousands of Patients

                    </div>

                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight'>

                        Your Health,
                        <br />

                        <span className='text-cyan-300'>
                            Our Priority
                        </span>

                    </h1>

                    <p className='text-slate-300 text-lg mt-6 leading-relaxed max-w-2xl'>

                        Book appointments instantly, consult experienced doctors,
                        access prescriptions digitally, and experience the future
                        of smart healthcare with Doc-Connect.

                    </p>

                    {/* FEATURES */}

                    <div className='flex flex-wrap gap-4 mt-8 justify-center md:justify-start'>

                        <div className='flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm'>

                            <FiCalendar />

                            Easy Scheduling

                        </div>

                        <div className='flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm'>

                            <FiShield />

                            Secure Records

                        </div>

                        <div className='flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm'>

                            <FiStar />

                            Top Rated Doctors

                        </div>

                    </div>

                    {/* BUTTON */}

                    <button

                        onClick={() => {
                            navigate('/login')
                            scrollTo(0, 0)
                        }}

                        className='group mt-10 inline-flex items-center gap-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:scale-105 transition-all duration-300'
                    >

                        Get Started Today

                        <FiArrowRight className='group-hover:translate-x-1 transition-all duration-300' />

                    </button>

                </div>

                {/* RIGHT SIDE */}

                <div className='flex-1 relative'>

                    {/* FLOATING CARD */}

                    <div className='absolute top-0 right-35 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-4 hidden lg:flex items-center gap-3 z-20'>

                        <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold'>
                            ✓
                        </div>

                        <div>

                            <p className='font-semibold text-slate-800 dark:text-white'>
                                Secure Consultation
                            </p>

                            <p className='text-sm text-slate-500 dark:text-slate-400'>
                                Fast & trusted healthcare access
                            </p>

                        </div>

                    </div>

                    <img
                        src={assets.appointment_img}
                        alt=""
                        className='relative z-10 w-full max-w-lg mx-auto drop-shadow-2xl'
                    />

                </div>

            </div>

        </motion.div>

    )

}

export default Banner