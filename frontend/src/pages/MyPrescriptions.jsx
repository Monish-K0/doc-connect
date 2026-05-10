import React, {
  useContext,
  useEffect,
  useState
} from 'react'

import {
  motion
} from 'framer-motion'

import {
  FiDownload,
  FiCalendar,
  FiUser,
  FiFileText
} from 'react-icons/fi'

import axios from 'axios'

import { toast } from 'react-toastify'

import { AppContext } from '../context/AppContext'

import jsPDF from 'jspdf'

import autoTable from 'jspdf-autotable'

const MyPrescriptions = () => {

  const {
    backendUrl,
    token
  } = useContext(AppContext)

  const [prescriptions, setPrescriptions] = useState([])

  const getPrescriptions = async () => {

    try {

      const { data } = await axios.get(

        backendUrl + '/api/user/prescriptions',

        {
          headers: { token }
        }

      )

      if (data.success) {

        setPrescriptions(data.prescriptions)

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }

  }

  useEffect(() => {

    if (token) {

      getPrescriptions()

    }

  }, [token])

  const downloadPDF = (item, index) => {

    const doc = new jsPDF()

    doc.setFontSize(20)

    doc.text(
      'Doc-Connect Medical Prescription',
      14,
      20
    )

    doc.setFontSize(12)

    doc.text(
      `Prescription #: ${index + 1}`,
      14,
      35
    )

    doc.text(
      `Date: ${new Date(item.createdAt).toLocaleDateString()}`,
      14,
      45
    )

    doc.text(
      `Doctor: Dr. ${item.doctorName}`,
      14,
      55
    )

    doc.text(
      `Speciality: ${item.doctorSpeciality}`,
      14,
      65
    )

    const tableData = item.medicines.map((med) => [

      med.name,
      med.dosage,
      med.duration

    ])

    autoTable(doc, {

      startY: 80,

      head: [[
        'Medicine',
        'Dosage',
        'Duration'
      ]],

      body: tableData

    })

    doc.text(

      'Doctor Notes:',

      14,

      doc.lastAutoTable.finalY + 15

    )

    doc.text(

      item.notes || 'No Notes',

      14,

      doc.lastAutoTable.finalY + 25

    )

    doc.save(`Prescription-${index + 1}.pdf`)

  }

  return (

    <div className='py-10 px-4'>

      {/* HEADER */}

      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className='mb-14'
      >

        <p className='text-cyan-600 font-semibold uppercase tracking-wide mb-3'>
          Medical Records
        </p>

        <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
          My Prescriptions
        </h1>

        <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
          Access your digital prescriptions, medication history,
          doctor recommendations, and downloadable medical
          records securely with Doc-Connect.
        </p>

      </motion.div>

      {/* EMPTY STATE */}

      {
        prescriptions.length === 0 && (

          <div className='bg-white rounded-[40px] border border-slate-100 shadow-sm p-16 text-center'>

            <h2 className='text-2xl font-bold text-slate-800'>
              No Prescriptions Found
            </h2>

            <p className='text-slate-500 mt-4'>
              Your medical prescriptions will appear here
              after consultation completion.
            </p>

          </div>

        )
      }

      {/* PRESCRIPTION LIST */}

      <div className='space-y-10'>

        {
          prescriptions.map((item, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 30 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.5,
                delay: index * 0.05
              }}

              viewport={{ once: true }}

              className='bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'
            >

              {/* TOP BAR */}

              <div className='bg-gradient-to-r from-indigo-600 to-cyan-500 p-8 text-white'>

                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>

                  <div>

                    <p className='text-cyan-100 font-medium'>
                      Prescription #{index + 1}
                    </p>

                    <h2 className='text-3xl font-bold mt-2'>
                      Dr. {item.doctorName}
                    </h2>

                    <p className='text-cyan-100 mt-2 text-lg'>
                      {item.doctorSpeciality}
                    </p>

                  </div>

                  <div className='flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl'>

                    <FiCalendar />

                    <p>
                      {
                        new Date(item.createdAt)
                          .toLocaleDateString()
                      }
                    </p>

                  </div>

                </div>

              </div>

              {/* CONTENT */}

              <div className='p-8 lg:p-10'>

                {/* MEDICINES */}

                <div>

                  <div className='flex items-center gap-3 mb-8'>

                    <FiFileText className='text-cyan-500 text-2xl' />

                    <h3 className='text-2xl font-bold text-slate-800'>
                      Prescribed Medicines
                    </h3>

                  </div>

                  <div className='grid md:grid-cols-2 gap-6'>

                    {
                      item.medicines.map((med, i) => (

                        <div

                          key={i}

                          className='bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-lg transition-all duration-300'
                        >

                          <h4 className='text-xl font-bold text-slate-800'>
                            {med.name}
                          </h4>

                          <div className='mt-5 space-y-3'>

                            <div className='flex items-center justify-between'>

                              <p className='text-slate-400'>
                                Dosage
                              </p>

                              <p className='font-semibold text-slate-700'>
                                {med.dosage}
                              </p>

                            </div>

                            <div className='flex items-center justify-between'>

                              <p className='text-slate-400'>
                                Duration
                              </p>

                              <p className='font-semibold text-slate-700'>
                                {med.duration}
                              </p>

                            </div>

                          </div>

                        </div>

                      ))
                    }

                  </div>

                </div>

                {/* NOTES */}

                {
                  item.notes && (

                    <div className='mt-12 bg-cyan-50 rounded-3xl p-8 border border-cyan-100'>

                      <div className='flex items-center gap-3 mb-4'>

                        <FiUser className='text-cyan-600 text-xl' />

                        <h3 className='text-xl font-bold text-slate-800'>
                          Doctor Notes
                        </h3>

                      </div>

                      <p className='text-slate-600 leading-relaxed'>
                        {item.notes}
                      </p>

                    </div>

                  )
                }

                {/* BUTTON */}

                <div className='mt-10'>

                  <button

                    onClick={() => downloadPDF(item, index)}

                    className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-3'
                  >

                    <FiDownload />

                    Download Prescription PDF

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

export default MyPrescriptions