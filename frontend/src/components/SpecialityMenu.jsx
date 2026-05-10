import React from 'react'

import { specialityData } from '../assets/assets'

import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'

const SpecialityMenu = () => {

    return (

        <div
            id='speciality'
            className='py-24 px-4'
        >

            {/* SECTION HEADER */}

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.6 }}

                viewport={{ once: true }}

                className='text-center'
            >

                <p className='text-cyan-600 font-semibold tracking-wide uppercase mb-3'>
                    Medical Specialities
                </p>

                <h1 className='text-4xl md:text-5xl font-bold text-slate-800 dark:text-white'>
                    Find The Right Specialist
                </h1>

                <p className='text-slate-500 dark:text-slate-400 mt-5 max-w-2xl mx-auto text-lg leading-relaxed'>
                    Connect with experienced healthcare professionals
                    across multiple specialities and receive quality
                    care anytime, anywhere.
                </p>

            </motion.div>

            {/* SPECIALITY CARDS */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-16'>

                {
                    specialityData.map((item, index) => (

                        <motion.div

                            key={index}

                            initial={{ opacity: 0, y: 20 }}

                            whileInView={{ opacity: 1, y: 0 }}

                            transition={{ duration: 0.4, delay: index * 0.05 }}

                            viewport={{ once: true }}
                        >

                            <Link

                                to={`/doctors/${item.speciality}`}

                                onClick={() => scrollTo(0, 0)}

                                className='group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center p-6 hover:-translate-y-3 rounded-3xl'
                            >

                                <div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300'>

                                    <img
                                        className='w-16'
                                        src={item.image}
                                        alt=""
                                    />

                                </div>

                                <p className='text-slate-700 dark:text-white font-semibold text-center'>
                                    {item.speciality}
                                </p>

                            </Link>

                        </motion.div>

                    ))
                }

            </div>

        </div>

    )

}

export default SpecialityMenu