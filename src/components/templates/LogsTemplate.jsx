import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setLoginValue } from '../../stores/slices/loginSlice';
import LoginForm from "../organisms/LoginForm";
import Button from "../atoms/Button";
import Logo from "../atoms/Logo";
import BackLogo from '../atoms/BackLogo';

const LogsTemplate = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = React.useState('Sign in');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleRegister = () => {
        console.log("Registering !");
        setTitle('Register');
    }
    
    const handleBack = () => {
        console.log("Back !");
        setTitle('Sign in');
    }

    const handleLog = () => {
        const logs = { username, password };
        dispatch(setLoginValue(logs));
        console.log('Logging in...', logs);
    }

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
                    <LoginForm 
                        title={title} 
                        setUsername={setUsername} 
                        setPassword={setPassword} 
                    />

                    { title === "Sign in" ?
                        <>
                            <div className="flex justify-between w-full">
                                <Button label="Register" handleClick={() => handleRegister()} />
                                <Button label="Forgot my password ?" handleClick={() => handleForgot()} />
                            </div>
                            <div className='flex justify-center'>
                                <button className='mt-5 m-2 p-2 rounded-md bg-mybank-green text-mybank-darkblue border border-mybank-darkblue hover:bg-mybank-darkblue hover:text-mybank-green hover:border-mybank-green transition duration-200 ease-in-out' onClick={() => handleLog()}>{title}</button>
                            </div>
                        </>
                        :
                        <div className="flex justify-between items-center w-full">
                            <BackLogo handleClick={() => handleBack()} />
                            <button className='mt-5 m-2 p-2 rounded-md bg-mybank-green text-mybank-darkblue border border-mybank-darkblue hover:bg-mybank-darkblue hover:text-mybank-green hover:border-mybank-green transition duration-200 ease-in-out' onClick={() => handleLog()}>{title}</button>
                        </div>
                    }
                    
                </div>
            </div>
        </>
    );
}
 
export default LogsTemplate;