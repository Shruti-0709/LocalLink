import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { LoginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const initialState={
    email:'',
    password:''
}
function Login() {
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const {toast} = useToast();
    const navigate = useNavigate();


    function onSubmit(event)
    {
        event.preventDefault();
        dispatch(LoginUser(formData)).then((data)=>{
            console.log(data);
            if(data?.payload?.success){
                toast({
                    title:data?.payload?.message,
                })
    navigate('/shop/home');
            }
            else{
                toast({
                    title:data?.payload?.message,
                    variant:"destructive",
                })
            }
        });
    }
    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                    Sign in to your account
                </h1>
                <p className='mt-2'>Don't have an account ?
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/register">
                    Sign Up
                    </Link>
                </p>
            </div>
            <CommonForm
            formControls={loginFormControls}
            buttontext={'Login'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            />
        </div>
    )
}

export default Login
