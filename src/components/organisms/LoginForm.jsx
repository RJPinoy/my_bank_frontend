import FormField from "../molecules/FormField";

const LoginForm = ({ title, setUsername, setPassword }) => {
    const showForm = () => {
        if(title === 'Sign in') {
            return (
                <>
                    <form action="">
                        <FormField label="Username :" type="text" name="username" placeholder="username" setUsername={setUsername} setPassword={setPassword} />
                        <FormField label="Password :" type="password" name="password" placeholder="password" setUsername={setUsername} setPassword={setPassword} />
                    </form>
                </>
            )
        } else if (title === "Register") {
            return (
                <>
                    <form action="">
                        <FormField label="Username :" type="text" name="username" placeholder="username" setUsername={setUsername} setPassword={setPassword} />
                        <FormField label="Password :" type="password" name="password" placeholder="password" setUsername={setUsername} setPassword={setPassword} />
                        <FormField label="Confirm password :" type="password" name="confirmPassword" placeholder="password" setUsername={setUsername} setPassword={setPassword} />
                    </form>
                </>
            )
        }
    }

    return ( 
        <>
            <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
            { showForm() }
        </>
    );
}
 
export default LoginForm;