import React, {
    useContext,
    useEffect,
    useState
} from 'react'

import {
    motion
} from 'framer-motion'

import {
    FiEdit2,
    FiSave,
    FiMapPin,
    FiCheckCircle,
    FiUser
} from 'react-icons/fi'

import { DoctorContext } from '../../context/DoctorContext'

import { AppContext } from '../../context/AppContext'

import { toast } from 'react-toastify'

import axios from 'axios'

const DoctorProfile = () => {

    const {
        dToken,
        profileData,
        setProfileData,
        getProfileData
    } = useContext(DoctorContext)

    const {
        currency,
        backendUrl
    } = useContext(AppContext)

    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {

                address: profileData.address,

                fees: profileData.fees,

                about: profileData.about,

                available: profileData.available

            }

            const { data } = await axios.post(

                backendUrl + '/api/doctor/update-profile',

                updateData,

                {
                    headers: { dToken }
                }

            )

            if (data.success) {

                toast.success(data.message)

                setIsEdit(false)

                getProfileData()

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            toast.error(error.message)

            console.log(error)

        }

    }

    useEffect(() => {

        if (dToken) {

            getProfileData()

        }

    }, [dToken])

    return profileData && (

        <div className='p-6 lg:p-10'>

            {/* HEADER */}

            <motion.div

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                className='mb-12'
            >

                <p className='text-cyan-600 font-semibold uppercase tracking-wide mb-3'>
                    Doctor Profile
                </p>

                <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
                    Profile Management
                </h1>

                <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
                    Manage your professional information,
                    consultation details, availability,
                    and clinic profile with Doc-Connect.
                </p>

            </motion.div>

            {/* MAIN CARD */}

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                className='bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden'
            >

                <div className='grid lg:grid-cols-[340px_1fr]'>

                    {/* SIDEBAR */}

                    <div className='bg-gradient-to-br from-indigo-600 to-cyan-500 p-10 text-white flex flex-col items-center justify-center'>

                        <img

                            src={profileData.image}

                            alt=""

                            className='w-56 h-56 rounded-[32px] object-cover border-4 border-white/20 shadow-2xl'
                        />

                        <h2 className='text-3xl font-bold mt-8 text-center'>
                            {profileData.name}
                        </h2>

                        <p className='text-cyan-100 mt-3 text-lg text-center'>
                            {profileData.degree}
                        </p>

                        <div className='mt-6 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center'>

                            <p className='font-semibold'>
                                {profileData.speciality}
                            </p>

                        </div>

                        <div className='mt-4 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center'>

                            <p className='font-semibold'>
                                {profileData.experience}
                            </p>

                        </div>

                    </div>

                    {/* CONTENT */}

                    <div className='p-8 lg:p-12'>

                        {/* ABOUT */}

                        <div>

                            <div className='flex items-center gap-3 mb-6'>

                                <FiUser className='text-cyan-500 text-2xl' />

                                <h2 className='text-2xl font-bold text-slate-800'>
                                    About Doctor
                                </h2>

                            </div>

                            {
                                isEdit

                                    ? (

                                        <textarea

                                            rows={8}

                                            value={profileData.about}

                                            onChange={(e) =>
                                                setProfileData(prev => ({
                                                    ...prev,
                                                    about: e.target.value
                                                }))
                                            }

                                            className='w-full border border-slate-200 rounded-3xl p-6 outline-none focus:border-cyan-500 transition-all'
                                        />

                                    )

                                    : (

                                        <div className='bg-slate-50 rounded-3xl p-6 text-slate-600 leading-relaxed'>

                                            {profileData.about}

                                        </div>

                                    )
                            }

                        </div>

                        {/* FEES + AVAILABILITY */}

                        <div className='grid md:grid-cols-2 gap-8 mt-12'>

                            {/* FEES */}

                            <div className='bg-slate-50 rounded-3xl p-6'>

                                <div className='flex items-center gap-3 mb-5'>

                                    <p className='text-cyan-500 text-2xl font-bold'>
    ₹
</p>

                                    <h3 className='text-xl font-bold text-slate-800'>
                                        Consultation Fee
                                    </h3>

                                </div>

                                {
                                    isEdit

                                        ? (

                                            <input

                                                type='number'

                                                value={profileData.fees}

                                                onChange={(e) =>
                                                    setProfileData(prev => ({
                                                        ...prev,
                                                        fees: e.target.value
                                                    }))
                                                }

                                                className='w-full border border-slate-200 rounded-2xl px-5 py-4 text-2xl font-bold outline-none'
                                            />

                                        )

                                        : (

                                            <p className='text-4xl font-bold text-slate-800'>
                                                {currency}{profileData.fees}
                                            </p>

                                        )
                                }

                            </div>

                            {/* AVAILABILITY */}

                            <div className='bg-slate-50 rounded-3xl p-6'>

                                <div className='flex items-center gap-3 mb-5'>

                                    <FiCheckCircle className='text-cyan-500 text-2xl' />

                                    <h3 className='text-xl font-bold text-slate-800'>
                                        Availability
                                    </h3>

                                </div>

                                <div className='flex items-center gap-4'>

    <button

        type="button"

        disabled={!isEdit}

        onClick={() => {

            if (!isEdit) return

            setProfileData(prev => ({
                ...prev,
                available: !prev.available
            }))

        }}

        className={`relative w-20 h-10 rounded-full transition-all duration-300

        ${profileData.available
                ? 'bg-green-500'
                : 'bg-slate-300'
            }

        ${!isEdit ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
        `}
    >

        <span

            className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-md transition-all duration-300

            ${profileData.available ? 'translate-x-10' : ''}
            `}
        />

    </button>

    <p className='font-semibold text-slate-700'>

        {
            profileData.available
                ? 'Available for Consultation'
                : 'Currently Unavailable'
        }

    </p>

</div>

                            </div>

                        </div>

                        {/* ADDRESS */}

                        <div className='mt-12'>

                            <div className='flex items-center gap-3 mb-6'>

                                <FiMapPin className='text-cyan-500 text-2xl' />

                                <h2 className='text-2xl font-bold text-slate-800'>
                                    Clinic Address
                                </h2>

                            </div>

                            <div className='bg-slate-50 rounded-3xl p-6'>

                                {
                                    isEdit

                                        ? (

                                            <div className='space-y-4'>

                                                <input

                                                    type='text'

                                                    value={profileData.address.line1}

                                                    onChange={(e) =>
                                                        setProfileData(prev => ({
                                                            ...prev,
                                                            address: {
                                                                ...prev.address,
                                                                line1: e.target.value
                                                            }
                                                        }))
                                                    }

                                                    className='w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none'
                                                />

                                                <input

                                                    type='text'

                                                    value={profileData.address.line2}

                                                    onChange={(e) =>
                                                        setProfileData(prev => ({
                                                            ...prev,
                                                            address: {
                                                                ...prev.address,
                                                                line2: e.target.value
                                                            }
                                                        }))
                                                    }

                                                    className='w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none'
                                                />

                                            </div>

                                        )

                                        : (

                                            <p className='text-slate-600 leading-relaxed'>

                                                {profileData.address.line1}

                                                <br />

                                                {profileData.address.line2}

                                            </p>

                                        )
                                }

                            </div>

                        </div>

                        {/* BUTTON */}

                        <div className='mt-14'>

                            {
                                isEdit

                                    ? (

                                        <button

                                            onClick={updateProfile}

                                            className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-3'
                                        >

                                            <FiSave />

                                            Save Changes

                                        </button>

                                    )

                                    : (

                                        <button

                                            onClick={() => setIsEdit(true)}

                                            className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-3'
                                        >

                                            <FiEdit2 />

                                            Edit Profile

                                        </button>

                                    )
                            }

                        </div>

                    </div>

                </div>

            </motion.div>

        </div>

    )

}

export default DoctorProfile