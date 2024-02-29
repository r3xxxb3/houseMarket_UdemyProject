import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import VisibilityIcon from "../assets/svg/visibilityIcon.svg"

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password} = formData

    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Welcome Back !</p>
            </header>
            <main>
                <form>
                    <input type="text" className="nameInput" placeholder="Name" id="name" value={name} onChange={onChange} />
                    <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange} />
                    <div className="passwordInputDiv">
                        <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id="password" value={password} onChange={onChange}/>

                        <img src={VisibilityIcon} alt="Show Password" className="showPassword" onClick={() => setShowPassword((prevState) => {return !prevState})}/>
                    </div>
                    {/* <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password</Link> */}
                    <div className="signUpBar">
                        <p className="signUpText">
                            Sign Up
                        </p>
                        <button className="signUpButton">
                            <ArrowRightIcon fill="#fffff" width="34px" height="34px" />
                        </button>
                    </div>
                </form>
                {/* google oauth component */}
                <Link to="/sign-in" className="registerLink">Already Have an Account ?</Link>
            </main>
        </div>
    )
}

export default SignUp