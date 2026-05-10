import React, {
  useContext,
  useEffect
} from 'react'

import {
  motion
} from 'framer-motion'

import {
  FiCheckCircle,
  FiBriefcase,
  FiMapPin
} from 'react-icons/fi'

import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const {
    doctors,
    changeAvailability,
    aToken,
    getAllDoctors
  } = useContext(AdminContext)

  useEffect(() => {

    if (aToken) {

      getAllDoctors()

    }

  }, [aToken])

  return (

    <div className='p-6 lg:p-10'>

      {/* HEADER */}

      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className='mb-12'
      >

        <p className='text-cyan-600 font-semibold uppercase tracking-wide mb-3'>
          Doctor Administration
        </p>

        <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
          All Doctors
        </h1>

        <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
          Manage doctor availability, healthcare specialists,
          consultation activity, and medical professionals
          through the Doc-Connect administration panel.
        </p>

      </motion.div>

      {/* GRID */}

      <div className='grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>

        {
          doctors.map((item, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 30 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.5,
                delay: index * 0.03
              }}

              viewport={{ once: true }}

              className='bg-white rounded-[36px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3'
            >

              {/* IMAGE */}

              <div className='bg-gradient-to-br from-indigo-50 to-cyan-50 overflow-hidden'>

                <img

                  src={item.image}

                  alt=""

                  className='w-full h-[320px] object-cover group-hover:scale-105 transition-all duration-500'
                />

              </div>

              {/* CONTENT */}

              <div className='p-6'>

                {/* NAME */}

                <h2 className='text-2xl font-bold text-slate-800'>
                  {item.name}
                </h2>

                {/* SPECIALITY */}

                <div className='flex items-center gap-2 mt-3 text-cyan-600'>

                  <FiBriefcase />

                  <p className='font-semibold'>
                    {item.speciality}
                  </p>

                </div>

                {/* EXPERIENCE */}

                <div className='mt-6 bg-slate-50 rounded-2xl p-4'>

                  <p className='text-slate-400 text-sm'>
                    Experience
                  </p>

                  <h3 className='text-xl font-bold text-slate-700 mt-1'>
                    {item.experience}
                  </h3>

                </div>

                {/* AVAILABILITY */}

                <div className='mt-6 flex items-center justify-between'>

                  <div>

                    <p className='text-slate-400 text-sm'>
                      Status
                    </p>

                    <div className='flex items-center gap-2 mt-2'>

                      <FiCheckCircle

                        className={`

                        ${item.available

                            ? 'text-green-500'

                            : 'text-red-500'
                          }`}
                      />

                      <p className={`font-semibold

                      ${item.available

                          ? 'text-green-600'

                          : 'text-red-600'
                        }`}>

                        {
                          item.available
                            ? 'Available'
                            : 'Unavailable'
                        }

                      </p>

                    </div>

                  </div>

                  {/* TOGGLE */}

                  <button

                    type="button"

                    onClick={() =>
                      changeAvailability(item._id)
                    }

                    className={`relative w-20 h-10 rounded-full transition-all duration-300

                    ${item.available
                        ? 'bg-green-500'
                        : 'bg-slate-300'
                      }`}
                  >

                    <span

                      className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-md transition-all duration-300

                      ${item.available ? 'translate-x-10' : ''}
                      `}
                    />

                  </button>

                </div>

              </div>

            </motion.div>

          ))
        }

      </div>

    </div>

  )

}

export default DoctorsList