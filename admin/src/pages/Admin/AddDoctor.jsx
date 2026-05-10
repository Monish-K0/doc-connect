import React, {
    useContext,
    useState
} from 'react'

import {
    motion
} from 'framer-motion'

import {
    FiUploadCloud,
    FiUser,
    FiMail,
    FiLock,
    FiAward,
    FiMapPin,
    FiBriefcase
} from 'react-icons/fi'

import { toast } from 'react-toastify'

import axios from 'axios'

import { AdminContext } from '../../context/AdminContext'

import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false)

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [experience, setExperience] = useState('1 Year')

    const [fees, setFees] = useState('')

    const [about, setAbout] = useState('')

    const [speciality, setSpeciality] =
        useState('General physician')

    const [degree, setDegree] = useState('')

    const [address1, setAddress1] = useState('')

    const [address2, setAddress2] = useState('')

    const { backendUrl } = useContext(AppContext)

    const { aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            if (!docImg) {

                return toast.error(
                    'Please upload doctor image'
                )

            }

            const formData = new FormData()

            formData.append('image', docImg)

            formData.append('name', name)

            formData.append('email', email)

            formData.append('password', password)

            formData.append('experience', experience)

            formData.append('fees', Number(fees))

            formData.append('about', about)

            formData.append('speciality', speciality)

            formData.append('degree', degree)

            formData.append(
                'address',
                JSON.stringify({
                    line1: address1,
                    line2: address2
                })
            )

            const { data } = await axios.post(

                backendUrl + '/api/admin/add-doctor',

                formData,

                {
                    headers: { aToken }
                }

            )

            if (data.success) {

                toast.success(data.message)

                setDocImg(false)

                setName('')

                setPassword('')

                setEmail('')

                setAddress1('')

                setAddress2('')

                setDegree('')

                setAbout('')

                setFees('')

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            toast.error(error.message)

            console.log(error)

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
                    Doctor Onboarding
                </p>

                <h1 className='text-4xl md:text-5xl font-bold text-slate-800'>
                    Add New Doctor
                </h1>

                <p className='text-slate-500 mt-5 text-lg max-w-2xl leading-relaxed'>
                    Register healthcare specialists,
                    manage professional details,
                    and expand the Doc-Connect
                    medical network.
                </p>

            </motion.div>

            {/* FORM */}

            <motion.form

                onSubmit={onSubmitHandler}

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5 }}

                className='bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden'
            >

                <div className='p-8 lg:p-12'>

                    {/* IMAGE */}

                    <div className='flex flex-col items-center justify-center mb-14'>

                        <label
                            htmlFor='doc-img'
                            className='cursor-pointer'
                        >

                            <div className='w-44 h-44 rounded-[40px] bg-gradient-to-br from-indigo-50 to-cyan-50 border-2 border-dashed border-cyan-300 flex flex-col items-center justify-center overflow-hidden hover:scale-105 transition-all duration-300'>

                                {
                                    docImg

                                        ? (

                                            <img

                                                src={URL.createObjectURL(docImg)}

                                                alt=""

                                                className='w-full h-full object-cover'
                                            />

                                        )

                                        : (

                                            <div className='text-center'>

                                                <FiUploadCloud className='text-5xl text-cyan-500 mx-auto' />

                                                <p className='mt-4 text-slate-600 font-medium'>
                                                    Upload Doctor Photo
                                                </p>

                                            </div>

                                        )
                                }

                            </div>

                        </label>

                        <input

                            type='file'

                            id='doc-img'

                            hidden

                            onChange={(e) =>
                                setDocImg(e.target.files[0])
                            }
                        />

                    </div>

                    {/* FORM GRID */}

                    <div className='grid lg:grid-cols-2 gap-10'>

                        {/* LEFT */}

                        <div className='space-y-7'>

                            <InputField
                                icon={<FiUser />}
                                label="Doctor Name"
                                value={name}
                                setValue={setName}
                                placeholder="Enter doctor name"
                            />

                            <InputField
                                icon={<FiMail />}
                                label="Doctor Email"
                                type="email"
                                value={email}
                                setValue={setEmail}
                                placeholder="Enter email address"
                            />

                            <InputField
                                icon={<FiLock />}
                                label="Password"
                                type="password"
                                value={password}
                                setValue={setPassword}
                                placeholder="Create password"
                            />

                            <div>

                                <label className='text-slate-700 font-semibold mb-3 block'>
                                    Experience
                                </label>

                                <select

                                    value={experience}

                                    onChange={(e) =>
                                        setExperience(e.target.value)
                                    }

                                    className='w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500'
                                >

                                    <option>1 Year</option>
                                    <option>2 Years</option>
                                    <option>3 Years</option>
                                    <option>4 Years</option>
                                    <option>5 Years</option>
                                    <option>6 Years</option>
                                    <option>8 Years</option>
                                    <option>9 Years</option>
                                    <option>10 Years</option>

                                </select>

                            </div>

                            <InputField
                                icon={<FiAward />}
                                label="Consultation Fee"
                                type="number"
                                value={fees}
                                setValue={setFees}
                                placeholder="Enter fee"
                            />

                        </div>

                        {/* RIGHT */}

                        <div className='space-y-7'>

                            <div>

                                <label className='text-slate-700 font-semibold mb-3 block'>
                                    Speciality
                                </label>

                                <select

                                    value={speciality}

                                    onChange={(e) =>
                                        setSpeciality(e.target.value)
                                    }

                                    className='w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500'
                                >

                                    <option>General physician</option>
                                    <option>Gynecologist</option>
                                    <option>Dermatologist</option>
                                    <option>Pediatricians</option>
                                    <option>Neurologist</option>
                                    <option>Gastroenterologist</option>

                                </select>

                            </div>

                            <InputField
                                icon={<FiBriefcase />}
                                label="Degree"
                                value={degree}
                                setValue={setDegree}
                                placeholder="Enter degree"
                            />

                            <div>

                                <label className='text-slate-700 font-semibold mb-3 block'>
                                    Clinic Address
                                </label>

                                <div className='space-y-4'>

                                    <input

                                        type='text'

                                        value={address1}

                                        onChange={(e) =>
                                            setAddress1(e.target.value)
                                        }

                                        placeholder='Address Line 1'

                                        className='w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500'
                                    />

                                    <input

                                        type='text'

                                        value={address2}

                                        onChange={(e) =>
                                            setAddress2(e.target.value)
                                        }

                                        placeholder='Address Line 2'

                                        className='w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500'
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ABOUT */}

                    <div className='mt-10'>

                        <label className='text-slate-700 font-semibold mb-3 block'>
                            About Doctor
                        </label>

                        <textarea

                            rows={6}

                            value={about}

                            onChange={(e) =>
                                setAbout(e.target.value)
                            }

                            placeholder='Write about doctor'

                            className='w-full border border-slate-200 rounded-3xl p-6 outline-none focus:border-cyan-500'
                        />

                    </div>

                    {/* BUTTON */}

                    <div className='mt-12'>

                        <button

                            type='submit'

                            className='bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-12 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 font-semibold'
                        >

                            Add Doctor

                        </button>

                    </div>

                </div>

            </motion.form>

        </div>

    )

}

/* INPUT FIELD */

const InputField = ({
    icon,
    label,
    type = "text",
    value,
    setValue,
    placeholder
}) => (

    <div>

        <label className='text-slate-700 font-semibold mb-3 block'>
            {label}
        </label>

        <div className='relative'>

            <div className='absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 text-lg'>

                {icon}

            </div>

            <input

                type={type}

                value={value}

                onChange={(e) =>
                    setValue(e.target.value)
                }

                placeholder={placeholder}

                required

                className='w-full border border-slate-200 rounded-2xl pl-14 pr-5 py-4 outline-none focus:border-cyan-500 transition-all'
            />

        </div>

    </div>

)

export default AddDoctor