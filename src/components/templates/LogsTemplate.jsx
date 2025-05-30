import * as React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { setLoginValue } from '../../stores/slices/loginSlice';
import LoginForm from "../organisms/LoginForm";
import Button from "../atoms/Button";
import Logo from "../atoms/Logo";
import BackLogo from '../atoms/BackLogo';
import { register, login } from '../../api/axios';

const LogsTemplate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [title, setTitle] = React.useState('Sign in');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleRegister = () => {
        console.log("Registering !");
        setTitle('Register');
        setErrorMessage('');
    }
    
    const handleBack = () => {
        console.log("Back !");
        setTitle('Sign in');
        setErrorMessage('');
    }

    const handleLog = async () => {
        if (title === "Register") {
            if (password !== confirmPassword) {
                setErrorMessage("Passwords do not match!");
                return;
            }
            if (!username || !password || !confirmPassword) {
                setErrorMessage("Please fill all the fields!");
                return;
            }
            console.log("Registering...");
            try {
                await register(username, password);

                dispatch(setLoginValue({ username, password }));
                setTitle('Sign in');
            } catch (error) {
                setErrorMessage("Registration failed! Please try again.");
                // console.error("Registration error:", error);
            }
        } else {
            if (!username || !password) {
                setErrorMessage("Please fill all the fields!");
                return;
            }

            try {
                // 🔐 Attempt login
                const response = await login(username, password);
                localStorage.setItem('mybank-user', JSON.stringify(response.user));

                // 🧠 Optional: Fetch user data or store info in Redux
                dispatch(setLoginValue({ username }));

                // ✅ Navigate to homepage
                navigate('/home');
            } catch (error) {
                setErrorMessage("Login failed! Please check your credentials.");
                // console.error("Login error:", error);
            }
        }
    };

    // TODO : ADD FORGOT PASSWORD SYSTEM
    const handleForgot = () => {
        console.log("Forgot my password ?");
    }

    return ( 
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col">
                <div className="w-full flex justify-center items-center flex-col">
                    <Logo width="w-1/4" />
                    <h1 className="text-2xl font-bold -mt-16 md:Montserrat">My Bank</h1>
                </div>
                <div className="mt-8">
                    {errorMessage && (
                        <div className="mb-4 px-4 py-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                            {errorMessage}
                        </div>
                    )}

                    <LoginForm 
                        title={title} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                        setConfirmPassword={setConfirmPassword} 
                    />

                    { title === "Sign in" ?
                        <>
                            <div className="flex justify-between w-full">
                                <Button label="Register" handleClick={() => handleRegister()} />
                                {/* <Button label="Forgot my password ?" handleClick={() => handleForgot()} /> */}
                            </div>
                            <div className='flex justify-center'>
                                <button className='mt-5 m-2 p-2 rounded-md bg-mybank-green text-mybank-darkblue border border-mybank-darkblue hover:bg-mybank-darkblue hover:text-mybank-green hover:border-mybank-green transition duration-200 ease-in-out' onClick={() => handleLog()}>{title}</button>
                            </div>
                        </>
                        :
                        <div className="flex justify-between items-center w-full">
                            <BackLogo handleClick={() => handleBack()} />
                                
                            {/* TODO: Add a spiner or loading indicator here */}
                            <button className='mt-5 m-2 p-2 rounded-md bg-mybank-green text-mybank-darkblue border border-mybank-darkblue hover:bg-mybank-darkblue hover:text-mybank-green hover:border-mybank-green transition duration-200 ease-in-out' onClick={() => handleLog()}>{title}</button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}
 
export default LogsTemplate;