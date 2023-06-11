import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { LocalStorage } from '../hooks/useLocalStorage';
import generateRandomCharacters from '../hooks/generateToken';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({isLight}: { isLight: boolean}) {
  const [formData,setFormData]=useState({"email":"","password":""})
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
 

  const handleChange=(e:any)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
   
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      toast.warning("Please fill all details")
    }else{
      setLoading(true)
      const token = generateRandomCharacters(16)
      setTimeout(() => {
        setLoading(false)
        navigate("/")
        toast.success("Joke edited successfully")
      }, 1000);
  
      LocalStorage("token", token, "save")
      LocalStorage("user", JSON.stringify(formData), "save")
    }

  }

  return (
    <div>
      
      <div className={` w-screen h-screen ${isLight ? "bg-lightgray" : "bg-darkmode"} items-center pt-16 md:p-20 grid place-items-center`}>
        <div className="flex justify-center items-center  w-full ">
          <div className={`shadow  ${isLight ? " bg-white" : "bg-lightblue"} w-full md:w-1/2  lg:w-2/5 py-4  grid place-items-center px-4 rounded-sm `}>
            <div className="">
              <h1 className="text-midblue text-3xl font-bold">Interview</h1>
            </div>
            <h1 className="text-darkblue text-sub-header">Welcome Back 👋🏻</h1>
            <div className='flex flex-col justify-center  w-full md:w-5/6'>
              <form onSubmit={(e) => handleSubmit(e)}>

                <div className="w-full ">
                  <div className="my-[19px] w-full">

                    <TextField
                      id="outlined-basic"
                      type='email'
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange} />
                  </div>
                  <div className="my-[19px] w-full">
                    <TextField
                      id="outlined-basic"
                      type='password'
                      name="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange} />
                  </div>


                </div>
                <div className="w-full">
                  <LoadingButton
                    type='submit'
                    style={{ backgroundColor: "#11009E", color: "#C4B0FF" }}
                    loading={loading}
                    fullWidth
                    variant="outlined">
                    Submit
                  </LoadingButton>

                  <h6 className="text-dark-blue my-1">
                    <Link to="/">
                      <span className="text-blue my-[15px] mx-2">Back to Login</span>
                    </Link>
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
