import Input from "../atoms/Input";

const FormField = ({ label, type, name, placeholder, setUsername, setPassword, setConfirmPassword }) => {
    return (  
        <>
            <div className="flex justify-center items-start flex-col">
                <label htmlFor={name} className="mb-2">{label}</label>
                <Input type={type} name={name} placeholder={placeholder} setUsername={setUsername} setPassword={setPassword} setConfirmPassword={setConfirmPassword} />
            </div>
        </>
    );
}
 
export default FormField;