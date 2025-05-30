import { sanitizeInput } from "../../utils";

const Input = ({ type, name, placeholder, setUsername, setPassword, setConfirmPassword }) => {
    const handleInputChange = (e) => {
        const { value } = e.target;
        if (name === "username") {
            setUsername(sanitizeInput(value));
        } else if (name === "password") {
            setPassword(sanitizeInput(value));
        } else if (name === "confirmPassword") {
            setConfirmPassword(sanitizeInput(value));
        }
    }

    return (  
        <>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                className="w-full text-mybank-darkblue bg-neutral-300 rounded-lg p-1 px-3 mb-2" 
                onChange={handleInputChange}
                required 
            />
        </>
    );
}
 
export default Input;