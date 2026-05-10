import React, {
  useContext
} from 'react'

import {
  motion
} from 'framer-motion'

import {
  FiHome,
  FiCalendar,
  FiUserPlus,
  FiUsers,
  FiUser
} from 'react-icons/fi'

import { NavLink } from 'react-router-dom'

import { DoctorContext } from '../context/DoctorContext'

import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)

  const { aToken } = useContext(AdminContext)

  const linkStyle = ({ isActive }) => `

    flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium

    ${isActive

      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg'

      : 'text-slate-600 hover:bg-slate-100'
    }
  `

  return (

    <div className='min-h-screen bg-white border-r border-slate-100 w-[90px] md:w-[290px] px-4 py-8'>

      {/* ADMIN SIDEBAR */}

      {
        aToken && (

          <motion.div

            initial={{ opacity: 0, x: -20 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.4 }}

          >

            <p className='hidden md:block text-slate-400 uppercase text-xs font-bold tracking-wider px-4 mb-6'>

              Administration

            </p>

            <div className='space-y-3'>

              <NavLink
                to='/admin-dashboard'
                className={linkStyle}
              >

                <FiHome className='text-xl min-w-[20px]' />

                <span className='hidden md:block'>
                  Dashboard
                </span>

              </NavLink>

              <NavLink
                to='/all-appointments'
                className={linkStyle}
              >

                <FiCalendar className='text-xl min-w-[20px]' />

                <span className='hidden md:block'>
                  Appointments
                </span>

              </NavLink>

              <NavLink
                to='/add-doctor'
                className={linkStyle}
              >

                <FiUserPlus className='text-xl min-w-[20px]' />

                <span className='hidden md:block'>
                  Add Doctor
                </span>

              </NavLink>

              <NavLink
                to='/doctor-list'
                className={linkStyle}
              >

                <FiUsers className='text-xl min-w-[20px]' />

                <span className='hidden md:block'>
                  Doctors List
                </span>

              </NavLink>

            </div>

          </motion.div>
        )
      }

      {/* DOCTOR SIDEBAR */}

      {
        dToken && (

          <motion.div

            initial={{ opacity: 0, x: -20 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.4 }}

          >

            <p className='hidden md:block text-slate-400 uppercase text-xs font-bold tracking-wider px-4 mb-6'>

              Doctor Workspace

            </p>

            <div className='space-y-3'>

              <NavLink
                to='/doctor-dashboard'
                className={linkStyle}
              >

                <FiHome className='text-xl min-w-[20px]' />

                <span className='hidden md:block'>
                  Dashboard
                </span>

              </NavLink>

              <NavLink
                to='/doctor-appointments'
                className={linkStyle}
              >

                <FiCalendar className='text-xl min-w-[20px]' />

                <span className='hidden md:block'>
                  Appointments
                </span>

              </NavLink>

              <NavLink
                to='/doctor-profile'
                className={linkStyle}
              >

                <FiUser className='text-xl min-w-[20px]' />

                <span className='hidden md:block'>
                  Profile
                </span>

              </NavLink>

            </div>

          </motion.div>
        )
      }

    </div>

  )

}

export default Sidebar