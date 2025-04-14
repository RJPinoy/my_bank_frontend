const Button = ({ label, handleClick }) => {
    return (  
        <>
            <button onClick={handleClick} className="italic text-xs transition-colors ease-in-out hover:text-mybank-green">{label}</button>
        </>
    );
}
 
export default Button;