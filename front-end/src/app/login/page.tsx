'use client'
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';



export default function login(){
  const router = useRouter();
  useEffect(() => {
    // Prefetch the home page
    router.prefetch('/');
  }
  , [router]);
  
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const result = await fetch('http://localhost:3000/api/v0.1/user/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ✅ important: include cookies so will include the user id
                body: JSON.stringify(loginInfo),
            });
            if (result.ok){
              console.log("Login okay:" , result.json());
      
              // const data = await result.json();
              // const token = data.token;

            // Example: store in memory
            // sessionStorage.setItem("token", token);
              // router.refresh();
            router.push("/"); //navigate back to user's home page
             
            }
            else
                console.log("Fail to login user account");
        } catch (error) {
            console.log("Logging error for user account", error);   
        }
    }
    
      return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={loginInfo.email}
                  onChange={handleChange}
                  className="h-12 bg-gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={loginInfo.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="h-12 -gray-50 border border-gray-300 text-gray-900 rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="border-solid w-full text-gray-900 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
