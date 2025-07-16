'use client'
import { useState } from "react";
import {useRouter} from 'next/navigation';

export default function SignUpPage(){
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserInfo({
            ...userInfo,
            [e.target.name] : e.target.value
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) { //this is for the form event only
        e.preventDefault();
       
        try {
            const result = await fetch ("http://localhost:3000/api/v0.1/user/signup", {
            method: 'POST',
            headers: {
                 'content-type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        if(result.ok){
            router.push("/login");
            console.log(result);
        }
        } catch (error) {
            console.log("error in sign up", error);
        }
    }
    
    return (
        <>
            {/* <form action="#" onSubmit={handleSubmit} method="POST"> */}
                <section className="bg-gray-300">
                    <div className="flex flex-col items-center justify-center mx-auto  pb-20 md:flex">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
                        Flowbite    
                    </a>
                   <div className="bg-[var(--card)] md:w-3/5 sm:w-1/2 lg:w-1/3 p-6 rounded-lg">
                        <div className="p-30 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                 <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input onChange={handleChange} type="input" name="name" id="name" className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 decorate-none" placeholder="John Doe" required=""></ input>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input onChange={handleChange} type="email" name="email" id="email" className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""></ input>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""></ input>
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input onChange={handleChange} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></ input>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input onChange={handleChange} id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""></ input>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* </form> */}
        </>
    );
}