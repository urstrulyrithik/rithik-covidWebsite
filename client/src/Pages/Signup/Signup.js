import { Component } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Axios from 'axios'
import './Signup.css'
import Footer from '../../Components/Footer/Footer'

class SignupForm extends Component {
  state = {
    username: '',
    password: '',
    RePassword: "",
    email: '',
    fullname: '',
    showSubmitErr: false,
    errorMsg: ""

  }

  onChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value })
  }

  onChangeRePassword = event => {
    this.setState({ RePassword: event.target.value })
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value })
  }

  onChangeFullname = event => {
    this.setState({ fullname: event.target.value })
  }

  onSubmitSuccess = () => {
    this.setState({ username: '', email: '', password: '', RePassword: '', fullname: '', showSubmitErr: false, errorMsg: "" })

    alert("Registration Successful, Proceed to Login");
  }

  onSubmitFailure = errorMsg => {
    this.setState({ showSubmitErr: true, errorMsg })
  }

  submitForm = async (event) => {
    console.log("submit entered")
    event.preventDefault()
    const { username, password, RePassword, email, fullname } = this.state
    if (username === "" || password === "" || RePassword === "" || email === "" || fullname === "") {
      this.setState({ showSubmitErr: true, errorMsg: "Please fill all entries" })
    } else {
      if (password !== RePassword) {
        this.setState({ showSubmitErr: true, errorMsg: "Passwords did not match", password: "", RePassword: "" })
      } else {
        const response = await Axios.post("http://localhost:3005/register", {

          username: username,
          password: password,
          email: email,
          fullname: fullname

        })

        console.log(response)
        const data = await response.data
        console.log(data)
        if (data === "User created successfully") {
          this.onSubmitSuccess()
        } else {
          this.onSubmitFailure(data)
        }
      }
    }
  }


  render() {
    const { username, password, RePassword, email, fullname, showSubmitErr, errorMsg } = this.state
   
    return (
      <>
        <Navbar />
        <div className='body-div'>
          <form className=' form-div' onSubmit={this.submitForm}>

            <h4 className='mt-3 heading'>Sign up and Login to give your Feedback</h4>

            <div className="form-group">
              <label className='labelName'>Full Name</label>
              <input type="text" value={fullname} className="form-control" placeholder="Enter your full name" onChange={this.onChangeFullname} />
            </div>

            <div className="form-group">
              <label className='labelName'>Username</label>
              <input type="username" value={username} className="form-control" placeholder="Enter your username" onChange={this.onChangeUsername} />
            </div>

            <div className="form-group">
              <label className='labelName'>Password</label>
              <input type="password" value={password} className="form-control" placeholder="Enter your password" onChange={this.onChangePassword} />
            </div>

            <div className="form-group">
              <label className='labelName'>Re-Enter Password</label>
              <input type="password" value={RePassword} className="form-control" placeholder="Enter your password" onChange={this.onChangeRePassword} />
            </div>

            <div className="form-group">
              <label className='labelName'>Email</label>
              <input type="email" value={email} className="form-control" placeholder="Enter your email" onChange={this.onChangeEmail} />
            </div>

            <button type="submit" className="signupBtn mt-3">Sign Up</button>
            <div className='innerCont'>
            <p>Already have an account?</p>
            <button className="loginBtn"><a className='anchorStyle mt-3' href='/login'>Log In</a></button>
            </div>
            {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
        <Footer/>
      </>
    )
  }
}

export default SignupForm
