import React, {
    useContext,
    useEffect,
    useState
} from 'react'

import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'

import {
    FiArrowRight
} from 'react-icons/fi'

import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()

    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {

        if (doctors.length > 0 && speciality) {

            const doctorsData = doctors.filter(

                (doc) =>
                    doc.speciality === speciality
                    && doc._id !== docId

            )

            setRelDoc(doctorsData)

        }

    }, [doctors, speciality, docId])

    return (

        <div className='py-10'>

            {/* HEADER */}

            <div className='text-center mb-14'>

                <p className='text-cyan-600 font-semibold uppercase tracking-wide mb-3'>
                    More Specialists
                </p>

                <h1 className='text-4xl md:text-5xl font-bold text-slate-900'>
                    Related Doctors
                </h1>

                <p className='text-slate-500 mt-5 text-lg max-w-2xl mx-auto leading-relaxed'>
                    Discover more trusted healthcare professionals
                    related to your selected speciality.
                </p>

            </div>

            {/* DOCTOR GRID */}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>

                {
                    relDoc.map((item, index) => (

                        <motion.div

                            key={index}

                            initial={{ opacity: 0, y: 20 }}

                            whileInView={{ opacity: 1, y: 0 }}

                            transition={{
                                duration: 0.5,
                                delay: index * 0.05
                            }}

                            viewport={{ once: true }}

                            onClick={() => {

                                navigate(`/appointment/${item._id}`)

                                scrollTo(0, 0)

                            }}

                            className='group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer'
                        >

                            {/* IMAGE */}

                            <div className='bg-gradient-to-br from-indigo-50 to-cyan-50 overflow-hidden'>

                                <img
                                    className='w-full h-[300px] object-cover group-hover:scale-105 transition-all duration-500'
                                    src={item.image}
                                    alt=""
                                />

                            </div>

                            {/* CONTENT */}

                            <div className='p-6'>

                                {/* STATUS */}

                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5

                                ${item.available

                                        ? 'bg-green-100 text-green-700'

                                        : 'bg-gray-100 text-gray-600'
                                    }`}>

                                    <span className={`w-2 h-2 rounded-full

                                    ${item.available
                                            ? 'bg-green-500'
                                            : 'bg-gray-400'
                                        }`}>
                                    </span>

                                    {
                                        item.available
                                            ? 'Available Now'
                                            : 'Unavailable'
                                    }

                                </div>

                                {/* NAME */}

                                <h2 className='text-2xl font-bold text-slate-900'>
                                    {item.name}
                                </h2>

                                {/* SPECIALITY */}

                                <p className='text-cyan-600 font-semibold mt-2'>
                                    {item.speciality}
                                </p>

                                {/* BUTTON */}

                                <div className='mt-8 flex items-center justify-between'>

                                    <div>

                                        <p className='text-sm text-slate-400'>
                                            Experience
                                        </p>

                                        <p className='font-semibold text-slate-700'>
                                            8+ Years
                                        </p>

                                    </div>

                                    <div className='w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300'>

                                        <FiArrowRight />

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    ))
                }

            </div>

        </div>

    )

}

export default RelatedDoctors