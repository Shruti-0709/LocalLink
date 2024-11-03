import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"

const initialState={
    userName:'',
    email:'',
    password:''

}
function Register() {
    const [formData,setFormData]=useState(initialState);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const { toast } = useToast();
    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            if (data?.payload?.success) 
            {
                toast({
                    title: data?.payload?.message,
               //     description: "Friday, February 10, 2023 at 5:57 PM",
                  });

                navigate('/auth/login');
            } 
            else{
                toast({
                    title:data?.payload?.message,
                     variant : "destructive", 
                })
            }
            // else {
            //     console.log('Registration failed', data);
            //     RollerCoaster({
            //         title:data?.payload?.message,
            //     });
            // }
        });
    }
    
    console.log(formData)
    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                    Create new account
                </h1>
                <p className='mt-2'>Already have an account ?
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">
                    Login
                    </Link>
                </p>
            </div>
            <CommonForm
            formControls={registerFormControls}
            buttontext={'Sign Up'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            />
        </div>
    )
}

export default Register
