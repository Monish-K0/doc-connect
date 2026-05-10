import React, {
    useContext,
    useEffect,
    useState
} from 'react'

import {
    useNavigate
} from 'react-router-dom'

import {
    motion
} from 'framer-motion'

import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiCreditCard,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi'

import { AppContext } from '../context/AppContext'

import axios from 'axios'

import { toast } from 'react-toastify'

import { assets } from '../assets/assets'

const MyAppointments = () => {

    const {
        backendUrl,
        token
    } = useContext(AppContext)

    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])

    const [payment, setPayment] = useState('')

    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]

    const slotDateFormat = (slotDate) => {

        const dateArray = slotDate.split('_')

        return (
            dateArray[0]
            + " "
            + months[Number(dateArray[1])]
            + " "
            + dateArray[2]
        )

    }

    const getUserAppointments = async () => {

        try {

            const { data } = await axios.get(

                backendUrl + '/api/user/appointments',

                {
                    headers: { token }
                }

            )

            setAppointments(data.appointments.reverse())

        } catch (error) {

            console.log(error)

            toast.error(error.message)

        }

    }

    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(

                backendUrl + '/api/user/cancel-appointment',

                { appointmentId },

                {
                    headers: { token }
                }

            )

            if (data.success) {

                toast.success(data.message)

                getUserAppointments()

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(error.message)

        }

    }

    const initPay = (order) => {

        const options = {

            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: order.amount,

            currency: order.currency,

            name: 'Doc-Connect',

            description: 'Appointment Payment',

            order_id: order.id,

            receipt: order.receipt,

            handler: async (response) => {

                try {

                    const { data } = await axios.post(

                        backendUrl + "/api/user/verifyRazorpay",

                        response,

                        {
                            headers: { token }
                        }
                    )

                    if (data.success) {

                        navigate('/my-appointments')

                        getUserAppointments()

                    }

                } catch (error) {

                    console.log(error)

                    toast.error(error.message)

                }

            }

        }

        const rzp = new window.Razorpay(options)

        rzp.open()

    }

    const appointmentStripe = async (appointmentId) => {

        try {

            const { data } = await axios.post(

                backendUrl + '/api/user/payment-stripe',

                { appointmentId },

                {
                    headers: { token }
                }

            )

            if (data.success) {

                window.location.replace(data.session_url)

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

            getUserAppointments()

        }

    }, [token])

    return (

        <div className='py-10 px-4'>

            {/* HEADER */}

            <motion.div

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                className='mb-14'
            >

                <p className='text-cyan-500 font-semibold uppercase tracking-wide mb-3'>
                    Appointment Dashboard
                </p>

                <h1 className='text-4xl md:text-5xl font-bold text-slate-900 dark:text-white'>
                    My Appointments
                </h1>

                <p className='text-slate-600 dark:text-slate-400 mt-5 text-lg max-w-2xl leading-relaxed'>
                    Manage your consultations, payments,
                    prescriptions, and appointment schedules
                    seamlessly with Doc-Connect.
                </p>

            </motion.div>

            {/* APPOINTMENT CARDS */}

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

                            className='bg-white dark:bg-slate-900 rounded-[36px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden'
                        >

                            <div className='grid lg:grid-cols-[280px_1fr] gap-0'>

                                {/* IMAGE */}

                                <div className='bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center p-8'>

                                    <img
                                        src={item.docData.image}
                                        alt=""
                                        className='w-full max-w-[220px] rounded-3xl object-cover shadow-lg'
                                    />

                                </div>

                                {/* CONTENT */}

                                <div className='p-8 lg:p-10'>

                                    <div className='flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8'>

                                        {/* LEFT */}

                                        <div>

                                            <h2 className='text-3xl font-bold text-slate-900 dark:text-white'>
                                                {item.docData.name}
                                            </h2>

                                            <p className='text-cyan-500 font-semibold mt-2 text-lg'>
                                                {item.docData.speciality}
                                            </p>

                                            {/* INFO */}

                                            <div className='space-y-4 mt-8'>

                                                <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>

                                                    <FiMapPin className='text-cyan-500' />

                                                    <p>
                                                        {item.docData.address.line1},
                                                        {item.docData.address.line2}
                                                    </p>

                                                </div>

                                                <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>

                                                    <FiCalendar className='text-cyan-500' />

                                                    <p>
                                                        {slotDateFormat(item.slotDate)}
                                                    </p>

                                                </div>

                                                <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400'>

                                                    <FiClock className='text-cyan-500' />

                                                    <p>
                                                        {item.slotTime}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                        {/* RIGHT */}

                                        <div className='flex flex-col gap-4 min-w-[240px]'>

                                            {/* PAYMENT */}

                                            {
                                                !item.cancelled &&
                                                !item.payment &&
                                                !item.isCompleted &&
                                                payment !== item._id && (

                                                    <button

                                                        onClick={() => setPayment(item._id)}

                                                        className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 font-semibold flex items-center justify-center gap-2'
                                                    >

                                                        <FiCreditCard />

                                                        Pay Online

                                                    </button>

                                                )
                                            }

                                            {
                                                !item.cancelled &&
                                                !item.payment &&
                                                !item.isCompleted &&
                                                payment === item._id && (

                                                    <button

                                                        onClick={() => appointmentStripe(item._id)}

                                                        className='bg-slate-900 py-4 rounded-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center'
                                                    >

                                                        <img
                                                            className='max-w-24'
                                                            src={assets.stripe_logo}
                                                            alt=""
                                                        />

                                                    </button>

                                                )
                                            }

                                            {
                                                !item.cancelled &&
                                                item.payment &&
                                                !item.isCompleted && (

                                                    <div className='bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 py-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2'>

                                                        <FiCheckCircle />

                                                        Payment Completed

                                                    </div>

                                                )
                                            }

                                            {/* STATUS */}

                                            {
                                                item.status === "prescription-added"

                                                    ? (

                                                        <div className='bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 py-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2'>

                                                            <FiCheckCircle />

                                                            Prescription Added

                                                        </div>

                                                    )

                                                    : item.isCompleted

                                                        ? (

                                                            <div className='bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 py-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2'>

                                                                <FiCheckCircle />

                                                                Consultation Completed

                                                            </div>

                                                        )

                                                        : item.cancelled

                                                            ? (

                                                                <div className='bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 py-4 rounded-2xl font-semibold text-center flex items-center justify-center gap-2'>

                                                                    <FiXCircle />

                                                                    Appointment Cancelled

                                                                </div>

                                                            )

                                                            : (

                                                                <button

                                                                    onClick={() => cancelAppointment(item._id)}

                                                                    className='border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 py-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 font-semibold'
                                                                >

                                                                    Cancel Appointment

                                                                </button>

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

        </div>

    )

}

export default MyAppointments