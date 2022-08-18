import { Component } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import Axios from 'axios'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

import './Login.css'

class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        errorMsg: '',
        showSubmitErr: false,
    }

    onChangeUsername = event => {
        this.setState({ username: event.target.value })
    }

    onChangePassword = event => {
        this.setState({ password: event.target.value })
    }

    onSubmitSuccess = jwtToken => {

        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
            path: '/',
        })

        alert("Successfully Logged In. Continue to feedback.")
        this.setState({ username: "", password: "", showSubmitErr: false, errorMsg: "" })
    }

    onSubmitFailure = errorMsg => {

        this.setState({ showSubmitErr: true, errorMsg, username: "", password: "" })

    }

    submitForm = async (event) => {

        event.preventDefault()
        const { username, password } = this.state


        const response = await Axios.post("http://localhost:3005/login", {

            username: username,
            password: password,

        })

        console.log(response)
        const data = await response.data
        console.log(data)
        if (response.data.jwtToken) {
            this.onSubmitSuccess(response.data.jwt_token)
        } else {
            this.onSubmitFailure(response.data)

        }
    }


    render() {
        const { showSubmitErr, errorMsg, username, password } = this.state
        const jwtToken = Cookies.get('jwt_token')

        if (jwtToken !== undefined) {
            return <Navigate to="/feedback" />
        }
        return (
            <>
                <Navbar />

                <div className='body-div'>
                    <form className='form-divs' onSubmit={this.submitForm}>

                        <h3 className="heading">Log In</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={username} placeholder="Enter your Username" onChange={this.onChangeUsername} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" value={password} className="form-control" placeholder="Enter password" onChange={this.onChangePassword} />
                        </div>


                        <button type="submit" className="loginBtn" >Log In</button>

                        <button className="signupBtn"><a className='anchorStyle mt-3' href='/signup'>Signup</a></button>
                        {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
                    </form>
                </div>
                <Footer />
            </>
        )
    }
}

export default LoginForm
