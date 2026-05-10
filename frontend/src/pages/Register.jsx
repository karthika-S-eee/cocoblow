import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  User,
  Mail,
 Phone,
  Lock,
  ChevronRight,
} from 'lucide-react'

import bgImage from '../assets/bg.png'

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   try {
  //     const res = await axios.post(
  //       'http://localhost:5000/api/auth/register',
  //       formData
  //     )

  //     console.log(res.data)

  //     // Clear Form
  //     setFormData({
  //       name: '',
  //       email: '',
  //       phoneNumber: '',
  //       address: '',
  //       password: '',
  //     })

  //     alert('Registration Successful')

  //     // Navigate to Home Page
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 500)

  //   } catch (error) {
  //     console.log(error)

  //     alert(
  //       error.response?.data?.message ||
  //       'Register Failed'
  //     )
  //   }
  // }
  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/register',
      formData
    )

    console.log(res)

    // Success Alert
    alert('Registration Successful')

    // Clear Form
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: '',
    })

    // Navigate Home
    navigate('/')

  } catch (error) {
    console.log(error)

    // IMPORTANT
    if (error.response?.status === 201) {
      alert('Registration Successful')
      navigate('/')
      return
    }

    alert(
      error.response?.data?.message ||
      'Register Failed'
    )
  }
}

  return (
    <div
      className='min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center px-4 relative'
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/30'></div>

      {/* Register Card */}
      <form
        onSubmit={handleSubmit}
        className='relative z-10 w-full max-w-[360px] bg-[#f7f1e8]/90 border border-[#d9c8b5] rounded-3xl shadow-2xl px-5 py-6 backdrop-blur-md'
      >
        {/* Heading */}
        <h2 className='text-2xl font-bold text-center text-[#4d2f1f] mb-4'>
          Register
        </h2>

        <div className='w-full h-[1px] bg-[#d7c8b6] mb-5'></div>

        {/* Name */}
        <div className='mb-4'>
          <label className='block text-[#4d2f1f] font-semibold text-sm mb-2'>
            Full Name
          </label>

          <div className='flex items-center border border-[#d5c4b2] rounded-lg bg-white overflow-hidden'>
            <div className='px-3 text-gray-500'>
              <User size={18} />
            </div>

            <input
              type='text'
              name='name'
              value={formData.name}
              placeholder='Enter your name'
              className='w-full py-3 pr-3 outline-none text-sm bg-transparent'
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className='mb-4'>
          <label className='block text-[#4d2f1f] font-semibold text-sm mb-2'>
            Email Address
          </label>

          <div className='flex items-center border border-[#d5c4b2] rounded-lg bg-white overflow-hidden'>
            <div className='px-3 text-gray-500'>
              <Mail size={18} />
            </div>

            <input
              type='email'
              name='email'
              value={formData.email}
              placeholder='Enter your email'
              className='w-full py-3 pr-3 outline-none text-sm bg-transparent'
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div className='mb-4'>
          <label className='block text-[#4d2f1f] font-semibold text-sm mb-2'>
            Phone Number
          </label>

          <div className='flex items-center border border-[#d5c4b2] rounded-lg bg-white overflow-hidden'>
            <div className='px-3 text-gray-500'>
              <Phone size={18} />
            </div>

            <input
              type='text'
              name='phoneNumber'
              value={formData.phoneNumber}
              placeholder='Enter your phone number'
              className='w-full py-3 pr-3 outline-none text-sm bg-transparent'
              onChange={handleChange}
              required
            />
          </div>
        </div>
         <div className='mb-4'>
  <label className='block text-[#4d2f1f] font-semibold text-sm mb-2'>
    Address
  </label>

  <div className='flex items-center border border-[#d5c4b2] rounded-lg bg-white overflow-hidden'>
    <input
      type='text'
      name='address'
      value={formData.address}
      placeholder='Enter your address'
      className='w-full py-3 px-3 outline-none text-sm bg-transparent'
      onChange={handleChange}
      required
    />
  </div>
</div>

        {/* Password */}
        <div className='mb-5'>
          <label className='block text-[#4d2f1f] font-semibold text-sm mb-2'>
            Password
          </label>

          <div className='flex items-center border border-[#d5c4b2] rounded-lg bg-white overflow-hidden'>
            <div className='px-3 text-gray-500'>
              <Lock size={18} />
            </div>

            <input
              type='password'
              name='password'
              value={formData.password}
              placeholder='Enter your password'
              className='w-full py-3 pr-3 outline-none text-sm bg-transparent'
              onChange={handleChange}
              required
            />
          </div>
        </div>
       
        {/* Register Button */}
        <button
          type='submit'
          className='w-full bg-gradient-to-r from-[#66762b] to-[#7d8d3d] text-white py-3 rounded-lg text-lg font-bold shadow-lg hover:scale-[1.02] transition-all duration-300'
        >
          Register
        </button>

        {/* Divider */}
        <div className='w-full h-[1px] bg-[#d7c8b6] my-5'></div>

        {/* Login Redirect */}
        <div className='flex justify-center items-center gap-1 text-sm'>
          <span className='text-[#4d2f1f]'>
            Already have an account?
          </span>

          <Link
            to='/login'
            className='text-[#66762b] font-bold flex items-center gap-1 hover:underline'
          >
            Login
            <ChevronRight size={16} />
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register