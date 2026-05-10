import React, {
    useContext,
    useEffect,
    useState
} from 'react'

import {
    useNavigate,
    useParams
} from 'react-router-dom'

import {
    motion
} from 'framer-motion'

import {
    FiClock,
    FiCalendar,
    FiCheckCircle
} from 'react-icons/fi'

import { AppContext } from '../context/AppContext'

import { assets } from '../assets/assets'

import RelatedDoctors from '../components/RelatedDoctors'

import axios from 'axios'

import { toast } from 'react-toastify'

const Appointment = () => {

    const { docId } = useParams()

    const {
        doctors,
        currencySymbol,
        backendUrl,
        token,
        getDoctosData
    } = useContext(AppContext)

    const navigate = useNavigate()

    const daysOfWeek = [
        'SUN',
        'MON',
        'TUE',
        'WED',
        'THU',
        'FRI',
        'SAT'
    ]

    const [docInfo, setDocInfo] = useState(false)

    const [docSlots, setDocSlots] = useState([])

    const [slotIndex, setSlotIndex] = useState(0)

    const [slotTime, setSlotTime] = useState('')
    const [bookingLoading, setBookingLoading] = useState(false)

    const fetchDocInfo = async () => {

        const docInfo = doctors.find(
            (doc) => doc._id === docId
        )

        setDocInfo(docInfo)

    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        let today = new Date()

        for (let i = 0; i < 7; i++) {

            let currentDate = new Date(today)

            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()

            endTime.setDate(today.getDate() + i)

            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {

                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                )

                currentDate.setMinutes(
                    currentDate.getMinutes() > 30
                        ? 30
                        : 0
                )

            } else {

                currentDate.setHours(10)

                currentDate.setMinutes(0)

            }

            let timeSlots = []

            while (currentDate < endTime) {

                let formattedTime = currentDate.toLocaleTimeString(
                    [],
                    {
                        hour: '2-digit',
                        minute: '2-digit'
                    }
                )

                let day = currentDate.getDate()

                let month = currentDate.getMonth() + 1

                let year = currentDate.getFullYear()

                const slotDate =
                    day + "_" + month + "_" + year

                const slotTime = formattedTime

                const isSlotAvailable =
                    docInfo.slots_booked[slotDate]
                        && docInfo.slots_booked[slotDate].includes(slotTime)
                        ? false
                        : true

                if (isSlotAvailable) {

                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })

                }

                currentDate.setMinutes(
                    currentDate.getMinutes() + 30
                )

            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

    if (bookingLoading) return

    if (!token) {

        toast.warning('Login to continue')

        return navigate('/login')

    }

    if (!slotTime) {

        return toast.warning('Select a time slot')

    }

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()

    let month = date.getMonth() + 1

    let year = date.getFullYear()

    const slotDate =
        day + "_" + month + "_" + year

    try {

        setBookingLoading(true)

        const { data } = await axios.post(

            backendUrl + '/api/user/book-appointment',

            {
                docId,
                slotDate,
                slotTime
            },

            {
                headers: { token }
            }

        )

        if (data.success) {

            toast.success(data.message)

            getDoctosData()

            navigate('/my-appointments')

        } else {

            toast.error(data.message)

        }

    } catch (error) {

        console.log(error)

        toast.error(error.message)

    } finally {

        setBookingLoading(false)

    }

}

    useEffect(() => {

        if (doctors.length > 0) {

            fetchDocInfo()

        }

    }, [doctors, docId])

    useEffect(() => {

        if (docInfo) {

            getAvailableSolts()

        }

    }, [docInfo])

    return docInfo ? (

        <div className='py-10 px-4'>

            {/* TOP SECTION */}

            <motion.div

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                className='grid lg:grid-cols-[380px_1fr] gap-10 items-start'
            >

                {/* IMAGE CARD */}

                <div className='bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-[40px] overflow-hidden shadow-2xl'>

                    <img
                        src={docInfo.image}
                        alt=""
                        className='w-full h-full object-cover'
                    />

                </div>

                {/* INFO CARD */}

                <div className='bg-white dark:bg-slate-900 rounded-[40px] p-8 lg:p-10 shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300'>

                    {/* NAME */}

                    <div className='flex items-center gap-3 flex-wrap'>

                        <h1 className='text-4xl font-bold text-slate-800 dark:text-white'>
                            {docInfo.name}
                        </h1>

                        <img
                            className='w-6'
                            src={assets.verified_icon}
                            alt=""
                        />

                    </div>

                    {/* SPECIALITY */}

                    <div className='flex flex-wrap items-center gap-3 mt-4'>

                        <p className='text-cyan-600 font-semibold text-lg'>
                            {docInfo.degree} • {docInfo.speciality}
                        </p>

                        <span className='px-4 py-2 rounded-full bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-cyan-400 text-sm font-medium'>
                            {docInfo.experience}
                        </span>

                    </div>

                    {/* ABOUT */}

                    <div className='mt-8'>

                        <div className='flex items-center gap-2 mb-3'>

                            <FiCheckCircle className='text-cyan-500' />

                            <p className='font-semibold text-slate-800 dark:text-white'>
                                About Doctor
                            </p>

                        </div>

                        <p className='text-slate-500 dark:text-slate-400 leading-relaxed'>
                            {docInfo.about}
                        </p>

                    </div>

                    {/* FEES */}

                    <div className='mt-8 flex items-center justify-between flex-wrap gap-5'>

                        <div>

                            <p className='text-slate-400 text-sm'>
                                Consultation Fee
                            </p>

                            <h2 className='text-3xl font-bold text-slate-800 dark:text-white mt-1'>
                                {currencySymbol}{docInfo.fees}
                            </h2>

                        </div>

                        <div className={`px-5 py-3 rounded-2xl text-sm font-semibold

                        ${docInfo.available

                                ? 'bg-green-100 text-green-700'

                                : 'bg-gray-100 text-gray-600'
                            }`}>

                            {
                                docInfo.available
                                    ? 'Available Today'
                                    : 'Unavailable'
                            }

                        </div>

                    </div>

                </div>

            </motion.div>

            {/* BOOKING SECTION */}

            <motion.div

                initial={{ opacity: 0, y: 20 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                viewport={{ once: true }}

                className='bg-white dark:bg-slate-900 rounded-[40px] p-8 lg:p-10 shadow-xl border border-slate-100 dark:border-slate-800 mt-14 transition-all duration-300'
            >

                <div className='flex items-center gap-3 mb-8'>

                    <FiCalendar className='text-cyan-500 text-2xl' />

                    <h2 className='text-3xl font-bold text-slate-800 dark:text-white'>
                        Select Appointment Slot
                    </h2>

                </div>

                {/* DAYS */}

                <div className='flex gap-4 overflow-x-auto pb-3'>

                    {
                        docSlots.length &&
                        docSlots.map((item, index) => (

                            <button

                                key={index}

                                onClick={() => setSlotIndex(index)}

                                className={`min-w-[90px] py-5 rounded-3xl transition-all duration-300 border text-center

                                ${slotIndex === index

                                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-xl border-transparent'

                                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >

                                <p className='font-semibold'>
                                    {
                                        item[0] &&
                                        daysOfWeek[item[0].datetime.getDay()]
                                    }
                                </p>

                                <p className='text-sm mt-1'>
                                    {
                                        item[0] &&
                                        item[0].datetime.getDate()
                                    }
                                </p>

                            </button>

                        ))
                    }

                </div>

                {/* TIME SLOTS */}

                <div className='flex gap-4 overflow-x-auto mt-8 pb-3'>

                    {
                        docSlots.length &&
                        docSlots[slotIndex].map((item, index) => (

                            <button

                                key={index}

                                onClick={() => setSlotTime(item.time)}

                                className={`px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 flex items-center gap-2

                                ${item.time === slotTime

                                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg'

                                        : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >

                                <FiClock />

                                {item.time.toLowerCase()}

                            </button>

                        ))
                    }

                </div>

                {/* BUTTON */}

                <button

    onClick={bookAppointment}

    disabled={bookingLoading}

    className={`mt-10 px-10 py-4 rounded-2xl shadow-xl font-semibold transition-all duration-300

    ${bookingLoading

        ? 'bg-gray-400 cursor-not-allowed text-white'

        : 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:scale-105'
    }`}
>

    {
        bookingLoading
            ? 'Booking Appointment...'
            : 'Confirm Appointment'
    }

</button>

            </motion.div>

            {/* RELATED DOCTORS */}

            <div className='mt-24'>

                <RelatedDoctors
                    speciality={docInfo.speciality}
                    docId={docId}
                />

            </div>

        </div>

    ) : null

}

export default Appointment