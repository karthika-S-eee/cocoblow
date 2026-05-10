import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, ChevronRight } from 'lucide-react'
import bgImage from '../assets/bg.png'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'https://cocoblowbackend.onrender.com/api/auth/login',
        formData
      )
      //  localStorage.setItem("userId", res.data.user._id);
      //  console.log(localStorage.getItem("userId"));
      // localStorage.setItem('token', res.data.token)
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

localStorage.setItem(
  "userId",
  res.data.user._id
);

localStorage.setItem(
  "token",
  res.data.token
);

      alert('Login Successful')
      console.log(res.data);
     
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Login Failed')
    }
  }

  return (
    <div
      className='min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center px-4 relative'
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className='absolute inset-0 bg-black/30'></div>

      <form
        onSubmit={handleSubmit}
        className='relative z-10 w-full max-w-[360px] bg-[#f7f1e8]/90 border border-[#d9c8b5] rounded-3xl shadow-2xl px-5 py-6 backdrop-blur-md'
      >
        <h2 className='text-2xl font-bold text-center text-[#4d2f1f] mb-4'>
          Login
        </h2>

        <div className='w-full h-[1px] bg-[#d7c8b6] mb-5'></div>

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
              placeholder='Enter your email'
              className='w-full py-3 pr-3 outline-none text-sm bg-transparent'
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className='mb-4'>
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
              placeholder='Enter your password'
              className='w-full py-3 pr-3 outline-none text-sm bg-transparent'
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type='submit'
          className='w-full bg-gradient-to-r from-[#66762b] to-[#7d8d3d] text-white py-3 rounded-lg text-lg font-bold shadow-lg hover:scale-[1.02] transition-all duration-300'
        >
          Login
        </button>
        

        {/* Forgot Password */}
        <p className='text-center mt-4 text-[#4d2f1f] text-sm cursor-pointer hover:text-[#6f7d31]'>
          Forgot Password?
        </p>

        <div className='w-full h-[1px] bg-[#d7c8b6] my-5'></div>

        {/* Register Redirect */}
        <div className='flex justify-center items-center gap-1 text-sm'>
          <span className='text-[#4d2f1f]'>
            Don’t have an account?
          </span>

          <Link
            to='/register'
            className='text-[#66762b] font-bold flex items-center gap-1 hover:underline'
          >
            Sign Up
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Google Login */}
        <a
          href='https://cocoblowbackend.onrender.com/api/auth/google'
          className='mt-5 flex justify-center items-center border border-[#d5c4b2] bg-white py-3 rounded-lg text-sm font-semibold hover:bg-[#f5f5f5] transition-all'
        >
          Continue with Google
        </a>
      </form>
    </div>
  )
}

export default Login