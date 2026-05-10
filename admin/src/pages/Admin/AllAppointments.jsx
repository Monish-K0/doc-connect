import React, {
  useEffect,
  useContext
} from 'react'

import {
  motion
} from 'framer-motion'

import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiUsers
} from 'react-icons/fi'

import { AdminContext } from '../../context/AdminContext'

import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const {
    aToken,
    appointments,
    cancelAppointment,
    getAllAppointments
  } = useContext(AdminContext)

  const {
    slotDateFormat,
    calculateAge,
    currency
  } = useContext(AppContext)

  useEffect(() => {

    if (aToken) {

      getAllAppointments()

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
          Appointment Management
        </p>

        <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
          All Appointments
        </h1>

        <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
          Monitor patient consultations, doctor schedules,
          appointment activity, and platform operations
          through the Doc-Connect management system.
        </p>

      </motion.div>

      {/* APPOINTMENT LIST */}

      <div className='space-y-8'>

        {
          appointments.map((item, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 30 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.5,
                delay: index * 0.03
              }}

              viewport={{ once: true }}

              className='bg-white rounded-[36px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'
            >

              <div className='grid xl:grid-cols-[1fr_1fr_220px] gap-0'>

                {/* PATIENT */}

                <div className='p-8 border-b xl:border-b-0 xl:border-r border-slate-100'>

                  <div className='flex items-center gap-5'>

                    <img

                      src={item.userData.image}

                      alt=""

                      className='w-20 h-20 rounded-3xl object-cover shadow'
                    />

                    <div>

                      <p className='text-slate-400 text-sm'>
                        Patient
                      </p>

                      <h2 className='text-2xl font-bold text-slate-800 mt-1'>
                        {item.userData.name}
                      </h2>

                      <div className='flex items-center gap-2 mt-3 text-slate-500'>

                        <FiUser />

                        <p>
                          {calculateAge(item.userData.dob)} Years
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* APPOINTMENT INFO */}

                <div className='p-8 border-b xl:border-b-0 xl:border-r border-slate-100'>

                  <div className='flex items-center gap-5'>

                    <img

                      src={item.docData.image}

                      alt=""

                      className='w-20 h-20 rounded-3xl object-cover shadow bg-slate-100'
                    />

                    <div>

                      <p className='text-slate-400 text-sm'>
                        Doctor
                      </p>

                      <h2 className='text-2xl font-bold text-slate-800 mt-1'>
                        {item.docData.name}
                      </h2>

                      <p className='text-cyan-600 font-semibold mt-2'>
                        {item.docData.speciality}
                      </p>

                    </div>

                  </div>

                  {/* DATE */}

                  <div className='grid sm:grid-cols-2 gap-4 mt-8'>

                    <div className='bg-slate-50 rounded-2xl p-4'>

                      <div className='flex items-center gap-2 text-slate-500 mb-2'>

                        <FiCalendar className='text-cyan-500' />

                        <p className='font-medium'>
                          Date
                        </p>

                      </div>

                      <p className='font-semibold text-slate-700'>
                        {slotDateFormat(item.slotDate)}
                      </p>

                    </div>

                    <div className='bg-slate-50 rounded-2xl p-4'>

                      <div className='flex items-center gap-2 text-slate-500 mb-2'>

                        <FiClock className='text-cyan-500' />

                        <p className='font-medium'>
                          Time
                        </p>

                      </div>

                      <p className='font-semibold text-slate-700'>
                        {item.slotTime}
                      </p>

                    </div>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className='p-8 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-cyan-50'>

                  {/* FEES */}

                  <div>

                    <p className='text-slate-400 text-sm'>
                      Consultation Fee
                    </p>

                    <h2 className='text-4xl font-bold text-slate-800 mt-2'>
                      {currency}{item.amount}
                    </h2>

                  </div>

                  {/* STATUS */}

                  <div className='mt-8'>

                    {
                      item.cancelled

                        ? (

                          <div className='bg-red-50 text-red-700 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2'>

                            <FiXCircle />

                            Cancelled

                          </div>

                        )

                        : item.isCompleted

                          ? (

                            <div className='bg-green-50 text-green-700 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2'>

                              <FiCheckCircle />

                              Completed

                            </div>

                          )

                          : (

                            <button

                              onClick={() =>
                                cancelAppointment(item._id)
                              }

                              className='w-full border border-red-200 text-red-600 py-4 rounded-2xl hover:bg-red-50 transition-all duration-300 font-semibold'
                            >

                              Cancel Appointment

                            </button>

                          )
                    }

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

export default AllAppointments