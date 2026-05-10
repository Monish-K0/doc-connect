import React, { useContext } from 'react'

import { motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import { FiArrowRight } from 'react-icons/fi'

import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    return (

        <div className='py-24 px-4'>

            {/* HEADER */}

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.6 }}

                viewport={{ once: true }}

                className='text-center'
            >

                <p className='text-indigo-600 font-semibold tracking-wide uppercase mb-3'>
                    Trusted Professionals
                </p>

                <h1 className='text-4xl md:text-5xl font-bold text-slate-800 dark:text-white'>
                    Meet Our Top Doctors
                </h1>

                <p className='text-slate-500 dark:text-slate-400 mt-5 max-w-2xl mx-auto text-lg leading-relaxed'>
                    Highly experienced specialists dedicated to delivering
                    exceptional healthcare and patient experiences.
                </p>

            </motion.div>

            {/* DOCTOR CARDS */}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>

                {
                    doctors.slice(0, 8).map((item, index) => (

                        <motion.div

                            key={index}

                            initial={{ opacity: 0, y: 30 }}

                            whileInView={{ opacity: 1, y: 0 }}

                            transition={{ duration: 0.5, delay: index * 0.08 }}

                            viewport={{ once: true }}

                            onClick={() => {
                                navigate(`/appointment/${item._id}`)
                                scrollTo(0, 0)
                            }}

                            className='group bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-4'
                        >

                            {/* IMAGE */}

                            <div className='relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900'>

                                <img
                                    className='w-full h-[320px] object-cover group-hover:scale-105 transition-all duration-500'
                                    src={item.image}
                                    alt=""
                                />

                                {/* STATUS BADGE */}

                                <div className='absolute top-5 left-5'>

                                    <div className={`px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm
                                    
                                    ${item.available
                                            ? 'bg-green-100/80 text-green-700 border-green-200'
                                            : 'bg-gray-100/80 text-gray-600 border-gray-200'
                                        }`}>

                                        {item.available
                                            ? 'Available Now'
                                            : 'Unavailable'
                                        }

                                    </div>

                                </div>

                            </div>

                            {/* CONTENT */}

                            <div className='p-6'>

                                <h2 className='text-xl font-bold text-slate-800 dark:text-white'>
                                    {item.name}
                                </h2>

                                <p className='text-cyan-600 font-medium mt-2'>
                                    {item.speciality}
                                </p>

                                <div className='mt-6 flex items-center justify-between'>

                                    <div>

                                        <p className='text-sm text-slate-400 dark:text-slate-500'>
                                            Experience
                                        </p>

                                        <p className='font-semibold text-slate-700 dark:text-slate-200'>
                                            8+ Years
                                        </p>

                                    </div>

                                    <button className='w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300'>

                                        <FiArrowRight />

                                    </button>

                                </div>

                            </div>

                        </motion.div>

                    ))
                }

            </div>

            {/* BUTTON */}

            <div className='flex justify-center mt-16'>

                <button

                    onClick={() => {
                        navigate('/doctors')
                        scrollTo(0, 0)
                    }}

                    className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300'
                >

                    Explore All Doctors

                </button>

            </div>

        </div>

    )

}

export default TopDoctors