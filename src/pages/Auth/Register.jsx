import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';


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
        <div>
           <form onSubmit={handleSubmit(handleRegistration)}>
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
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
           </form>
        </div>
    );
};

export default Register;