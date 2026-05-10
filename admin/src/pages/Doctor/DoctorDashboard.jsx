import React, {
  useContext,
  useEffect
} from 'react'

import {
  motion
} from 'framer-motion'

import {
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi'

import { DoctorContext } from '../../context/DoctorContext'

import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext)

  const {
    slotDateFormat,
    currency
  } = useContext(AppContext)

  useEffect(() => {

    if (dToken) {

      getDashData()

    }

  }, [dToken])

  return dashData && (

    <div className='p-6 lg:p-10'>

      {/* HEADER */}

      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className='mb-12'
      >

        <p className='text-cyan-600 font-semibold uppercase tracking-wide mb-3'>
          Doctor Analytics
        </p>

        <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
          Dashboard Overview
        </h1>

        <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
          Track appointments, patient activity,
          consultation performance, and revenue insights
          with Doc-Connect analytics.
        </p>

      </motion.div>

      {/* STAT CARDS */}

      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>

        {/* EARNINGS */}

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5 }}

          className='rounded-[32px] bg-gradient-to-br from-indigo-600 to-cyan-500 p-8 text-white shadow-2xl'
        >

          <div className='flex items-center justify-between'>

            <div>

              <p className='text-cyan-100 text-lg'>
                Total Earnings
              </p>

              <h2 className='text-5xl font-bold mt-4'>
                {currency}{dashData.earnings}
              </h2>

            </div>

            <div className='w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-md'>

              <FiDollarSign className='text-4xl' />

            </div>

          </div>

        </motion.div>

        {/* APPOINTMENTS */}

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          className='rounded-[32px] bg-white border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-500'
        >

          <div className='flex items-center justify-between'>

            <div>

              <p className='text-slate-500 text-lg'>
                Appointments
              </p>

              <h2 className='text-5xl font-bold text-slate-800 mt-4'>
                {dashData.appointments}
              </h2>

            </div>

            <div className='w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600'>

              <FiCalendar className='text-4xl' />

            </div>

          </div>

        </motion.div>

        {/* PATIENTS */}

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.7 }}

          className='rounded-[32px] bg-white border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-500'
        >

          <div className='flex items-center justify-between'>

            <div>

              <p className='text-slate-500 text-lg'>
                Total Patients
              </p>

              <h2 className='text-5xl font-bold text-slate-800 mt-4'>
                {dashData.patients}
              </h2>

            </div>

            <div className='w-20 h-20 rounded-3xl bg-cyan-50 flex items-center justify-center text-cyan-600'>

              <FiUsers className='text-4xl' />

            </div>

          </div>

        </motion.div>

      </div>

      {/* LATEST BOOKINGS */}

      <motion.div

        initial={{ opacity: 0, y: 30 }}

        whileInView={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        viewport={{ once: true }}

        className='bg-white rounded-[40px] border border-slate-100 shadow-sm mt-14 overflow-hidden'
      >

        {/* HEADER */}

        <div className='flex items-center justify-between px-8 py-6 border-b border-slate-100'>

          <div>

            <h2 className='text-2xl font-bold text-slate-800'>
              Latest Appointments
            </h2>

            <p className='text-slate-500 mt-1'>
              Recent patient booking activity
            </p>

          </div>

        </div>

        {/* LIST */}

        <div className='divide-y divide-slate-100'>

          {
            dashData.latestAppointments
              .slice(0, 6)
              .map((item, index) => (

                <div

                  key={index}

                  className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 px-8 py-6 hover:bg-slate-50 transition-all duration-300'
                >

                  {/* LEFT */}

                  <div className='flex items-center gap-5'>

                    <img

                      src={item.userData.image}

                      alt=""

                      className='w-16 h-16 rounded-2xl object-cover shadow'
                    />

                    <div>

                      <h3 className='text-xl font-bold text-slate-800'>
                        {item.userData.name}
                      </h3>

                      <p className='text-slate-500 mt-1'>
                        Appointment on {slotDateFormat(item.slotDate)}
                      </p>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div>

                    {
                      item.cancelled

                        ? (

                          <div className='bg-red-50 text-red-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2'>

                            <FiXCircle />

                            Cancelled

                          </div>

                        )

                        : item.isCompleted

                          ? (

                            <div className='bg-green-50 text-green-700 px-5 py-3 rounded-2xl font-semibold flex items-center gap-2'>

                              <FiCheckCircle />

                              Completed

                            </div>

                          )

                          : (

                            <div className='flex gap-4'>

                              <button

                                onClick={() =>
                                  cancelAppointment(item._id)
                                }

                                className='px-5 py-3 rounded-2xl border border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300 font-semibold'
                              >

                                Cancel

                              </button>

                              <button

                                onClick={() =>
                                  completeAppointment(item._id)
                                }

                                className='px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg hover:scale-105 transition-all duration-300 font-semibold'
                              >

                                Complete

                              </button>

                            </div>

                          )
                    }

                  </div>

                </div>

              ))
          }

        </div>

      </motion.div>

    </div>

  )

}

export default DoctorDashboard