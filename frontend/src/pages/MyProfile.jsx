import React, {
    useContext,
    useState
} from 'react'

import {
    motion
} from 'framer-motion'

import {
    FiEdit2,
    FiSave,
    FiMail,
    FiPhone,
    FiMapPin,
    FiUser,
    FiCalendar
} from 'react-icons/fi'

import { AppContext } from '../context/AppContext'

import axios from 'axios'

import { toast } from 'react-toastify'

import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)

    const {
        token,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData
    } = useContext(AppContext)

    const updateUserProfileData = async () => {

        try {

            const formData = new FormData()

            formData.append('name', userData.name)

            formData.append('phone', userData.phone)

            formData.append(
                'address',
                JSON.stringify(userData.address)
            )

            formData.append('gender', userData.gender)

            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(

                backendUrl + '/api/user/update-profile',

                formData,

                {
                    headers: { token }
                }

            )

            if (data.success) {

                toast.success(data.message)

                await loadUserProfileData()

                setIsEdit(false)

                setImage(false)

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error(error.message)

        }

    }

    return userData ? (

        <div className='py-10 px-4'>

            {/* HEADER */}

            <motion.div

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                className='mb-14'
            >

                <p className='text-cyan-600 font-semibold uppercase tracking-wide mb-3'>
                    Patient Dashboard
                </p>

                <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
                    My Profile
                </h1>

                <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
                    Manage your healthcare profile, personal
                    information, and account settings securely
                    with Doc-Connect.
                </p>

            </motion.div>

            {/* MAIN CARD */}

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                className='bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden'
            >

                <div className='grid lg:grid-cols-[320px_1fr]'>

                    {/* SIDEBAR */}

                    <div className='bg-gradient-to-br from-indigo-600 to-cyan-500 p-10 text-white flex flex-col items-center justify-center'>

                        {/* IMAGE */}

                        {
                            isEdit

                                ? (

                                    <label htmlFor='image' className='cursor-pointer'>

                                        <div className='relative'>

                                            <img

                                                src={
                                                    image
                                                        ? URL.createObjectURL(image)
                                                        : userData.image
                                                }

                                                alt=""

                                                className='w-44 h-44 rounded-3xl object-cover border-4 border-white/20 shadow-2xl opacity-90'
                                            />

                                            <div className='absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center text-white font-semibold'>

                                                Change

                                            </div>

                                        </div>

                                        <input

                                            type='file'

                                            id='image'

                                            hidden

                                            onChange={(e) =>
                                                setImage(e.target.files[0])
                                            }
                                        />

                                    </label>

                                )

                                : (

                                    <img

                                        src={userData.image}

                                        alt=""

                                        className='w-44 h-44 rounded-3xl object-cover border-4 border-white/20 shadow-2xl'
                                    />

                                )
                        }

                        {/* NAME */}

                        {
                            isEdit

                                ? (

                                    <input

                                        type='text'

                                        value={userData.name}

                                        onChange={(e) =>
                                            setUserData(prev => ({
                                                ...prev,
                                                name: e.target.value
                                            }))
                                        }

                                        className='mt-8 bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white text-2xl font-bold text-center outline-none'
                                    />

                                )

                                : (

                                    <h2 className='text-3xl font-bold mt-8 text-center'>
                                        {userData.name}
                                    </h2>

                                )
                        }

                        <p className='mt-3 text-cyan-100'>
                            Doc-Connect Patient
                        </p>

                    </div>

                    {/* CONTENT */}

                    <div className='p-8 lg:p-12'>

                        {/* CONTACT INFO */}

                        <div>

                            <h2 className='text-2xl font-bold text-slate-800 mb-8'>
                                Contact Information
                            </h2>

                            <div className='grid md:grid-cols-2 gap-6'>

                                {/* EMAIL */}

                                <div className='bg-slate-50 rounded-3xl p-6'>

                                    <div className='flex items-center gap-3 mb-4'>

                                        <FiMail className='text-cyan-500 text-xl' />

                                        <p className='font-semibold text-slate-700'>
                                            Email Address
                                        </p>

                                    </div>

                                    <p className='text-slate-500 break-all'>
                                        {userData.email}
                                    </p>

                                </div>

                                {/* PHONE */}

                                <div className='bg-slate-50 rounded-3xl p-6'>

                                    <div className='flex items-center gap-3 mb-4'>

                                        <FiPhone className='text-cyan-500 text-xl' />

                                        <p className='font-semibold text-slate-700'>
                                            Phone Number
                                        </p>

                                    </div>

                                    {
                                        isEdit

                                            ? (

                                                <input

                                                    type='text'

                                                    value={userData.phone}

                                                    onChange={(e) =>
                                                        setUserData(prev => ({
                                                            ...prev,
                                                            phone: e.target.value
                                                        }))
                                                    }

                                                    className='w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                                                />

                                            )

                                            : (

                                                <p className='text-slate-500'>
                                                    {userData.phone}
                                                </p>

                                            )
                                    }

                                </div>

                                {/* ADDRESS */}

                                <div className='bg-slate-50 rounded-3xl p-6 md:col-span-2'>

                                    <div className='flex items-center gap-3 mb-4'>

                                        <FiMapPin className='text-cyan-500 text-xl' />

                                        <p className='font-semibold text-slate-700'>
                                            Address
                                        </p>

                                    </div>

                                    {
                                        isEdit

                                            ? (

                                                <div className='space-y-4'>

                                                    <input

                                                        type='text'

                                                        placeholder='Address Line 1'

                                                        value={userData.address.line1}

                                                        onChange={(e) =>
                                                            setUserData(prev => ({
                                                                ...prev,
                                                                address: {
                                                                    ...prev.address,
                                                                    line1: e.target.value
                                                                }
                                                            }))
                                                        }

                                                        className='w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                                                    />

                                                    <input

                                                        type='text'

                                                        placeholder='Address Line 2'

                                                        value={userData.address.line2}

                                                        onChange={(e) =>
                                                            setUserData(prev => ({
                                                                ...prev,
                                                                address: {
                                                                    ...prev.address,
                                                                    line2: e.target.value
                                                                }
                                                            }))
                                                        }

                                                        className='w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                                                    />

                                                </div>

                                            )

                                            : (

                                                <p className='text-slate-500'>
                                                    {userData.address.line1}
                                                    <br />
                                                    {userData.address.line2}
                                                </p>

                                            )
                                    }

                                </div>

                            </div>

                        </div>

                        {/* BASIC INFO */}

                        <div className='mt-14'>

                            <h2 className='text-2xl font-bold text-slate-800 mb-8'>
                                Basic Information
                            </h2>

                            <div className='grid md:grid-cols-2 gap-6'>

                                {/* GENDER */}

                                <div className='bg-slate-50 rounded-3xl p-6'>

                                    <div className='flex items-center gap-3 mb-4'>

                                        <FiUser className='text-cyan-500 text-xl' />

                                        <p className='font-semibold text-slate-700'>
                                            Gender
                                        </p>

                                    </div>

                                    {
                                        isEdit

                                            ? (

                                                <select

                                                    value={userData.gender}

                                                    onChange={(e) =>
                                                        setUserData(prev => ({
                                                            ...prev,
                                                            gender: e.target.value
                                                        }))
                                                    }

                                                    className='w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                                                >

                                                    <option value='Male'>Male</option>

                                                    <option value='Female'>Female</option>

                                                    <option value='Other'>Other</option>

                                                </select>

                                            )

                                            : (

                                                <p className='text-slate-500'>
                                                    {userData.gender}
                                                </p>

                                            )
                                    }

                                </div>

                                {/* DOB */}

                                <div className='bg-slate-50 rounded-3xl p-6'>

                                    <div className='flex items-center gap-3 mb-4'>

                                        <FiCalendar className='text-cyan-500 text-xl' />

                                        <p className='font-semibold text-slate-700'>
                                            Date of Birth
                                        </p>

                                    </div>

                                    {
                                        isEdit

                                            ? (

                                                <input

                                                    type='date'

                                                    value={userData.dob}

                                                    onChange={(e) =>
                                                        setUserData(prev => ({
                                                            ...prev,
                                                            dob: e.target.value
                                                        }))
                                                    }

                                                    className='w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 outline-none'
                                                />

                                            )

                                            : (

                                                <p className='text-slate-500'>
                                                    {userData.dob}
                                                </p>

                                            )
                                    }

                                </div>

                            </div>

                        </div>

                        {/* BUTTON */}

                        <div className='mt-14'>

                            {
                                isEdit

                                    ? (

                                        <button

                                            onClick={updateUserProfileData}

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

    ) : null

}

export default MyProfile