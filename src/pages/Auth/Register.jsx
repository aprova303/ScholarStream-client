import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';


const Register = () => {

    const {register, handleSubmit , formState: {errors}} = useForm();
    const {registerUser} = useAuth()

    const handleRegistration = (data) => {
      //  console.log(data)
      registerUser(data.email, data.password)
       .then(result =>{
         console.log(result.user)
       } )
       .catch(error => {
         console.log(error.message)
       })
    }
    return (
        <div  className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl pt-10">
           <h3 className="text-3xl text-center font-semibold bg-gradient-to-r from-[#654ea3] to-[#eaafc8] text-transparent bg-clip-text">Create an Account</h3>
           <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
              <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" {...register('email', {required:true})} className="input" placeholder="Email" />
          {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
          <label className="label">Password</label>
          <input type="password" {...register('password',
             {required:true , minLength:6,
          pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/})}
              className="input" placeholder="Password" />
              {
                errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
              }
              {
                errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
              }
              {
                errors.password?.type==='pattern' && <p className='text-red-500'>Must contain one uppercase letter and one special character.</p>
              }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
         <p className="text-center">Already have an account? <Link className="text-blue-400 underline" to="/login">Login</Link></p>
           </form>
           <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;