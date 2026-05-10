import React, {
  useState,
  useContext,
  useEffect
} from 'react'

import {
  motion
} from 'framer-motion'

import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiTrash2,
  FiFileText
} from 'react-icons/fi'

import { DoctorContext } from '../../context/DoctorContext'

import { AppContext } from '../../context/AppContext'

import axios from 'axios'

import { toast } from 'react-toastify'

const DoctorAppointments = () => {

  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext)

  const {
    slotDateFormat,
    calculateAge,
    currency
  } = useContext(AppContext)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [selectedAppointment, setSelectedAppointment] = useState(null)

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      duration: ""
    }
  ])

  const [notes, setNotes] = useState("")
  const [savingPrescription, setSavingPrescription] = useState(false)

  useEffect(() => {

    if (dToken) {

      getAppointments()

    }

  }, [dToken])

  const addPrescription = async () => {

  if (savingPrescription) return

  try {

    if (
      medicines.some(
        med =>
          !med.name ||
          !med.dosage ||
          !med.duration
      )
    ) {

      return toast.error("Fill all medicine fields")

    }

    setSavingPrescription(true)

    const prescriptionData = {

      appointmentId: selectedAppointment._id,

      docId: selectedAppointment.docId,

      userId: selectedAppointment.userId,

      medicines,

      notes

    }

    const { data } = await axios.post(

      backendUrl + "/api/doctor/add-prescription",

      prescriptionData,

      {
        headers: { dToken }
      }

    )

    if (data.success) {

      toast.success(data.message)

      setSelectedAppointment(null)

      setMedicines([
        {
          name: "",
          dosage: "",
          duration: ""
        }
      ])

      setNotes("")

      getAppointments()

    } else {

      toast.error(data.message)

    }

  } catch (error) {

    console.log(error)

    toast.error(error.message)

  } finally {

    setSavingPrescription(false)

  }

}

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
          Consultation Management
        </p>

        <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
          Patient Appointments
        </h1>

        <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
          Manage consultations, prescriptions,
          appointment schedules, and patient interactions
          efficiently through Doc-Connect.
        </p>

      </motion.div>

      {/* APPOINTMENTS */}

      <div className='space-y-8'>

        {
          appointments.map((item, index) => (

            <motion.div

              key={index}

              initial={{ opacity: 0, y: 30 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.5,
                delay: index * 0.05
              }}

              viewport={{ once: true }}

              className='bg-white rounded-[36px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'
            >

              <div className='grid lg:grid-cols-[280px_1fr] gap-0'>

                {/* IMAGE */}

                <div className='bg-gradient-to-br from-indigo-50 to-cyan-50 flex items-center justify-center p-8'>

                  <img
                    src={item.userData.image}
                    alt=""
                    className='w-full max-w-[220px] rounded-3xl object-cover shadow-lg'
                  />

                </div>

                {/* CONTENT */}

                <div className='p-8 lg:p-10'>

                  <div className='flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8'>

                    {/* LEFT */}

                    <div>

                      <h2 className='text-3xl font-bold text-slate-800'>
                        {item.userData.name}
                      </h2>

                      <p className='text-cyan-600 font-semibold mt-2 text-lg'>
                        Patient • {calculateAge(item.userData.dob)} Years
                      </p>

                      {/* INFO */}

                      <div className='space-y-4 mt-8'>

                        <div className='flex items-center gap-3 text-slate-600'>

                          <FiCalendar className='text-cyan-500' />

                          <p>
                            {slotDateFormat(item.slotDate)}
                          </p>

                        </div>

                        <div className='flex items-center gap-3 text-slate-600'>

                          <FiClock className='text-cyan-500' />

                          <p>
                            {item.slotTime}
                          </p>

                        </div>

                        <div>

                          <span className={`px-4 py-2 rounded-full text-sm font-semibold

                          ${item.payment

                              ? 'bg-green-100 text-green-700'

                              : 'bg-orange-100 text-orange-700'
                            }`}>

                            {
                              item.payment
                                ? 'Paid Online'
                                : 'Cash Payment'
                            }

                          </span>

                        </div>

                      </div>

                    </div>

                    {/* RIGHT */}

                    <div className='flex flex-col gap-4 min-w-[240px]'>

                      <div className='bg-slate-50 rounded-3xl p-6'>

                        <p className='text-slate-400 text-sm'>
                          Consultation Fee
                        </p>

                        <h3 className='text-4xl font-bold text-slate-800 mt-2'>
                          {currency}{item.amount}
                        </h3>

                      </div>

                      {
                        item.cancelled

                          ? (

                            <div className='bg-red-50 text-red-700 py-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2'>

                              <FiXCircle />

                              Appointment Cancelled

                            </div>

                          )

                          : item.status === "prescription-added"

                            ? (

                              <div className='bg-cyan-50 text-cyan-700 py-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2'>

                                <FiFileText />

                                Prescription Added

                              </div>

                            )

                            : item.isCompleted

                              ? (

                                <button

                                  onClick={() =>
                                    setSelectedAppointment(item)
                                  }

                                  className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 font-semibold'
                                >

                                  Add Prescription

                                </button>

                              )

                              : (

                                <div className='flex gap-4'>

                                  <button

                                    onClick={() =>
                                      cancelAppointment(item._id)
                                    }

                                    className='flex-1 border border-red-200 text-red-600 py-4 rounded-2xl hover:bg-red-50 transition-all duration-300 font-semibold'
                                  >

                                    Cancel

                                  </button>

                                  <button

                                    onClick={() =>
                                      completeAppointment(item._id)
                                    }

                                    className='flex-1 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold'
                                  >

                                    Complete

                                  </button>

                                </div>

                              )
                      }

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          ))
        }

      </div>

      {/* PRESCRIPTION MODAL */}

      {
        selectedAppointment && (

          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4'>

            <motion.div

              initial={{ opacity: 0, scale: 0.9 }}

              animate={{ opacity: 1, scale: 1 }}

              transition={{ duration: 0.3 }}

              className='bg-white rounded-[40px] w-full max-w-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto'
            >

              <h2 className='text-3xl font-bold text-slate-800 mb-8'>
                Add Prescription
              </h2>

              {/* MEDICINES */}

              <div className='space-y-6'>

                {
                  medicines.map((med, index) => (

                    <div

                      key={index}

                      className='bg-slate-50 rounded-3xl p-6 border border-slate-100'
                    >

                      <div className='grid md:grid-cols-3 gap-4'>

                        <input

                          type="text"

                          placeholder='Medicine Name'

                          value={med.name}

                          onChange={(e) => {

                            const updated = [...medicines]

                            updated[index].name = e.target.value

                            setMedicines(updated)

                          }}

                          className='border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                        />

                        <input

                          type="text"

                          placeholder='Dosage'

                          value={med.dosage}

                          onChange={(e) => {

                            const updated = [...medicines]

                            updated[index].dosage = e.target.value

                            setMedicines(updated)

                          }}

                          className='border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                        />

                        <input

                          type="text"

                          placeholder='Duration'

                          value={med.duration}

                          onChange={(e) => {

                            const updated = [...medicines]

                            updated[index].duration = e.target.value

                            setMedicines(updated)

                          }}

                          className='border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                        />

                      </div>

                      {
                        medicines.length > 1 && (

                          <button

                            onClick={() => {

                              const updated =
                                medicines.filter(
                                  (_, i) => i !== index
                                )

                              setMedicines(updated)

                            }}

                            className='mt-4 text-red-500 flex items-center gap-2 font-medium'
                          >

                            <FiTrash2 />

                            Remove Medicine

                          </button>

                        )
                      }

                    </div>

                  ))
                }

              </div>

              {/* ADD MEDICINE */}

              <button

                onClick={() =>
                  setMedicines([
                    ...medicines,
                    {
                      name: "",
                      dosage: "",
                      duration: ""
                    }
                  ])
                }

                className='mt-6 bg-slate-100 hover:bg-slate-200 transition-all duration-300 px-6 py-3 rounded-2xl flex items-center gap-2 font-semibold'
              >

                <FiPlus />

                Add Medicine

              </button>

              {/* NOTES */}

              <div className='mt-8'>

                <textarea

                  placeholder='Doctor Notes'

                  value={notes}

                  onChange={(e) => setNotes(e.target.value)}

                  rows={5}

                  className='w-full border border-slate-200 rounded-3xl p-5 outline-none'
                />

              </div>

              {/* ACTIONS */}

              <div className='flex justify-end gap-4 mt-8'>

                <button

                  onClick={() => setSelectedAppointment(null)}

                  className='px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all duration-300 font-semibold'
                >

                  Cancel

                </button>

                <button

  onClick={addPrescription}

  disabled={savingPrescription}

  className={`px-8 py-3 rounded-2xl shadow-lg font-semibold transition-all duration-300

  ${savingPrescription

    ? 'bg-gray-400 cursor-not-allowed'

    : 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:scale-105'
  }`}
>

  {
    savingPrescription
      ? 'Saving Prescription...'
      : 'Save Prescription'
  }

</button>

              </div>

            </motion.div>

          </div>

        )
      }

    </div>

  )

}

export default DoctorAppointments