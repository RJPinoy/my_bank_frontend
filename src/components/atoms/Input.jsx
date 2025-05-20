const Input = ({ type, name, placeholder, setUsername, setPassword, setConfirmPassword }) => {
    const handleInputChange = (e) => {
        const { value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
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