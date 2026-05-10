import React, {
  useContext
} from 'react'

import {
  motion
} from 'framer-motion'

import {
  FiShield,
  FiUserCheck,
  FiLogOut
} from 'react-icons/fi'

import { assets } from '../assets/assets'

import { DoctorContext } from '../context/DoctorContext'

import { AdminContext } from '../context/AdminContext'

import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const {
    dToken,
    setDToken
  } = useContext(DoctorContext)

  const {
    aToken,
    setAToken
  } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {

    navigate('/')

    dToken && setDToken('')

    dToken && localStorage.removeItem('dToken')

    aToken && setAToken('')

    aToken && localStorage.removeItem('aToken')

  }

  return (

    <motion.div

      initial={{ opacity: 0, y: -20 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.4 }}

      className='sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100'
    >

      <div className='flex items-center justify-between px-6 lg:px-10 py-5'>

        {/* LEFT */}

        <div className='flex items-center gap-5'>

          <div
  onClick={() => navigate('/')}
  className='cursor-pointer flex flex-col'
>

  <h1 className='text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent'>
    Doc-Connect
  </h1>

  <p className='text-xs text-slate-400 font-medium tracking-wide'>
    Healthcare Management Platform
  </p>

</div>

          <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold

          ${aToken

              ? 'bg-indigo-50 text-indigo-700'

              : 'bg-cyan-50 text-cyan-700'
            }`}>

            {
              aToken

                ? <FiShield />

                : <FiUserCheck />
            }

            {
              aToken
                ? 'Administrator'
                : 'Doctor Panel'
            }

          </div>

        </div>

        {/* RIGHT */}

        <button

          onClick={logout}

          className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 lg:px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-3'
        >

          <FiLogOut />

          Logout

        </button>

      </div>

    </motion.div>

  )

}

export default Navbar