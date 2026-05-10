import React, {
  useContext,
  useEffect,
  useState
} from 'react'

import { motion } from 'framer-motion'

import {
  FiFilter,
  FiArrowRight
} from 'react-icons/fi'

import { AppContext } from '../context/AppContext'

import {
  useNavigate,
  useParams
} from 'react-router-dom'

const Doctors = () => {

  const { speciality } = useParams()

  const navigate = useNavigate()

  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])

  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  const applyFilter = () => {

  let filtered = doctors

  // speciality filter

  if (speciality) {

    filtered = filtered.filter(
      doc => doc.speciality === speciality
    )

  }

  // search filter

  if (searchTerm.trim() !== '') {

    filtered = filtered.filter(doc =>

      doc.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      ||

      doc.speciality
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    )

  }

  setFilterDoc(filtered)

}

  useEffect(() => {

    applyFilter()

  }, [doctors, speciality, searchTerm])

  return (

    <div className='py-10 px-4'>

      {/* PAGE HEADER */}

      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className='text-center mb-16'
      >

        <p className='text-cyan-600 font-semibold uppercase tracking-wide mb-3'>
          Find Your Specialist
        </p>

        <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
          Discover Trusted Doctors
        </h1>

        <p className='text-slate-500 mt-5 max-w-2xl mx-auto text-lg leading-relaxed'>
          Browse highly experienced healthcare professionals
          and book consultations seamlessly through Doc-Connect.
        </p>

      </motion.div>

      {/* SEARCH BAR */}

<motion.div

  initial={{ opacity: 0, y: 20 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.5 }}

  className='max-w-2xl mx-auto mb-10'
>

  <div className='bg-white border border-slate-100 rounded-[28px] shadow-sm p-3 flex items-center gap-4'>

    <input

      type='text'

      value={searchTerm}

      onChange={(e) =>
        setSearchTerm(e.target.value)
      }

      placeholder='Search doctors by name or speciality...'

      className='flex-1 px-4 py-3 outline-none text-slate-700 rounded-2xl'
    />

    <button

      className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg'
    >

      Search

    </button>

  </div>

</motion.div>

      {/* MOBILE FILTER BUTTON */}

      <div className='sm:hidden mb-6'>

        <button

          onClick={() => setShowFilter(!showFilter)}

          className='flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-5 py-3 rounded-2xl shadow-lg'
        >

          <FiFilter />

          Filters

        </button>

      </div>

      <div className='flex flex-col lg:flex-row gap-10'>

        {/* SIDEBAR */}

        <motion.div

          initial={{ opacity: 0, x: -20 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.5 }}

          className={`w-full lg:w-[280px] shrink-0 ${showFilter ? 'block' : 'hidden sm:block'}`}
        >

          <div className='bg-white border border-slate-100 rounded-[32px] shadow-sm p-6 sticky top-28'>

            <h2 className='text-xl font-bold text-slate-800 mb-6'>
              Specialities
            </h2>

            <div className='flex flex-col gap-4'>

              {
                specialities.map((item, index) => (

                  <button

                    key={index}

                    onClick={() =>
                      speciality === item
                        ? navigate('/doctors')
                        : navigate(`/doctors/${item}`)
                    }

                    className={`text-left px-5 py-4 rounded-2xl transition-all duration-300 font-medium

                    ${speciality === item

                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg'

                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                  >

                    {item}

                  </button>

                ))
              }

            </div>

          </div>

        </motion.div>

        {/* DOCTOR GRID */}

        <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>

          {
  filterDoc.length === 0

    ? (

      <div className='col-span-full bg-white border border-slate-100 rounded-[32px] p-16 text-center shadow-sm'>

        <h2 className='text-3xl font-bold text-slate-800'>
          No Doctors Found
        </h2>

        <p className='text-slate-500 mt-4 text-lg'>
          Try searching with another doctor name
          or speciality.
        </p>

      </div>

    )

    : filterDoc.map((item, index) => (

              <motion.div

                key={index}

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5, delay: index * 0.05 }}

                viewport={{ once: true }}

                onClick={() => {
                  navigate(`/appointment/${item._id}`)
                  scrollTo(0, 0)
                }}

                className='group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-3'
              >

                {/* IMAGE */}

                <div className='relative overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50'>

                  <img
                    src={item.image}
                    alt=""
                    className='w-full h-[320px] object-cover group-hover:scale-105 transition-all duration-500'
                  />

                  {/* STATUS */}

                  <div className='absolute top-5 left-5'>

                    <div className={`px-4 py-2 rounded-full text-xs font-semibold shadow backdrop-blur-md

                    ${item.available

                        ? 'bg-green-100/90 text-green-700'

                        : 'bg-gray-100/90 text-gray-600'
                      }`}>

                      {
                        item.available
                          ? 'Available Now'
                          : 'Unavailable'
                      }

                    </div>

                  </div>

                </div>

                {/* CONTENT */}

                <div className='p-6'>

                  <h2 className='text-2xl font-bold text-slate-800'>
                    {item.name}
                  </h2>

                  <p className='text-cyan-600 font-medium mt-2'>
                    {item.speciality}
                  </p>

                  <div className='mt-6 flex items-center justify-between'>

                    <div>

                      <p className='text-sm text-slate-400'>
                        Experience
                      </p>

                      <p className='font-semibold text-slate-700'>
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

      </div>

    </div>

  )

}

export default Doctors