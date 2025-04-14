const Input = ({ type, name, placeholder, setUsername, setPassword }) => {
    return (  
        <>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                className="w-full text-mybank-darkblue bg-neutral-300 rounded-lg p-1 px-3 mb-2" 
                onChange={(e) => 
                    name === "username" ?
                    setUsername(e.target.value) 
                    : 
                    setPassword(e.target.value)
                }
                required 
            />
        </>
    );
}
 
export default Input;