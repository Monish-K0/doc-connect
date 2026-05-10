import React, {
  useContext,
  useState
} from 'react'

import { assets } from '../assets/assets'

import { motion } from 'framer-motion'

import {
  FiMenu,
  FiX,
  FiChevronDown
} from 'react-icons/fi'

import {
  useNavigate,
  NavLink
} from 'react-router-dom'

import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const {
    token,
    setToken,
    userData
  } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {

    localStorage.removeItem('token')

    setToken(false)

    navigate('/login')

  }

  return (

    <motion.div

      initial={{ y: -40, opacity: 0 }}

      animate={{ y: 0, opacity: 1 }}

      transition={{ duration: 0.5 }}

      className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 border border-white/20 shadow-sm rounded-2xl px-6 py-4 mt-4 transition-all duration-300'
    >

      <div className='flex items-center justify-between'>

        {/* LOGO */}

        <div

          onClick={() => navigate('/')}

          className='flex items-center gap-3 cursor-pointer'
        >

          <img
  src={assets.docconnect_logo}
  alt="Doc-Connect"
  className='h-12 w-auto object-contain'
/>

          <div>

            <h1 className='text-slate-800 font-bold text-lg'>
              Doc-Connect
            </h1>

            <p className='text-xs text-slate-500'>
              Smart Healthcare Platform
            </p>

          </div>

        </div>

        {/* DESKTOP NAV */}

        <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-700'>

          <NavLink
            to='/'
            className='hover:text-indigo-600 transition-all duration-200'
          >
            Home
          </NavLink>

          <NavLink
            to='/doctors'
            className='hover:text-indigo-600 transition-all duration-200'
          >
            Doctors
          </NavLink>

          <NavLink
            to='/about'
            className='hover:text-indigo-600 transition-all duration-200'
          >
            About
          </NavLink>

          <NavLink
            to='/contact'
            className='hover:text-indigo-600 transition-all duration-200'
          >
            Contact
          </NavLink>

        </div>

        {/* RIGHT SECTION */}

        <div className='flex items-center gap-4'>

          {
            token && userData

              ? (

                <div className='relative group'>

                  <div className='flex items-center gap-3 cursor-pointer bg-slate-100 hover:bg-slate-200 transition-all duration-300 px-3 py-2 rounded-xl'>

                    <img
                      src={userData.image}
                      alt=""
                      className='w-10 h-10 rounded-full object-cover border-2 border-white shadow'
                    />

                    <div className='hidden sm:block'>

                      <p className='text-sm font-semibold text-slate-700'>
                        {userData.name}
                      </p>

                      <p className='text-xs text-slate-500'>
                        Patient
                      </p>

                    </div>

                    <FiChevronDown className='text-slate-500' />

                  </div>

                  {/* DROPDOWN */}

                  <div className='absolute right-0 top-full pt-3 hidden group-hover:block'>

                    <div className='w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 flex flex-col gap-2'>

                      <button

                        onClick={() => navigate('/my-profile')}

                        className='text-left px-4 py-3 rounded-xl hover:bg-slate-100 transition-all text-slate-700'
                      >

                        My Profile

                      </button>

                      <button

                        onClick={() => navigate('/my-appointments')}

                        className='text-left px-4 py-3 rounded-xl hover:bg-slate-100 transition-all text-slate-700'
                      >

                        My Appointments

                      </button>

                      <button

                        onClick={() => navigate('/my-prescriptions')}

                        className='text-left px-4 py-3 rounded-xl hover:bg-slate-100 transition-all text-slate-700'
                      >

                        My Prescriptions

                      </button>

                      <button

                        onClick={logout}

                        className='text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all'
                      >

                        Logout

                      </button>

                    </div>

                  </div>

                </div>

              )

              : (

                <button

                  onClick={() => navigate('/login')}

                  className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300'
                >

                  Get Started

                </button>

              )
          }

          {/* MOBILE MENU BUTTON */}

          <button

            onClick={() => setShowMenu(!showMenu)}

            className='md:hidden text-2xl text-slate-700'
          >

            {
              showMenu
                ? <FiX />
                : <FiMenu />
            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {
        showMenu && (

          <motion.div

            initial={{ opacity: 0, y: -10 }}

            animate={{ opacity: 1, y: 0 }}

            className='md:hidden mt-5 flex flex-col gap-3 bg-white rounded-2xl p-5 shadow-lg border border-slate-100'
          >

            <NavLink
              to='/'
              className='px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700'
            >
              Home
            </NavLink>

            <NavLink
              to='/doctors'
              className='px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700'
            >
              Doctors
            </NavLink>

            <NavLink
              to='/about'
              className='px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700'
            >
              About
            </NavLink>

            <NavLink
              to='/contact'
              className='px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700'
            >
              Contact
            </NavLink>

          </motion.div>

        )
      }

    </motion.div>

  )

}

export default Navbar