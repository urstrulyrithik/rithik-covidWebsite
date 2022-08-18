import Cookies from 'js-cookie'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Axios from 'axios'
import Footer from '../../Components/Footer/Footer'

import './Feedback.css'

class FeedbackForm extends Component {
  state = {
    UiRating: "good",
    feedbackText: "",
    informativeRating: "good",
    codingStructureRating: "good",
    overallRating: "good",
    feedbackSubmitted: false

  }

  onChangeUiRating = event => {
    this.setState({ UiRating: event.target.value })
  }

  onChangeFeedbackText = event => {
    this.setState({ feedbackText: event.target.value })
  }

  onChangeinformativeRating = event => {
    this.setState({ informativeRating: event.target.value })
  }

  onChangeOverallRating = event => {
    this.setState({ overallRating: event.target.value })
  }

  onChangeCodingStructureRating = event => {
    this.setState({ codingStructureRating: event.target.value })
  }

  onSubmitSuccess = () => {
    this.setState({ overallRating: 0, codingStructureRating: 0, informativeRating: 0, feedbackText: '', UiRating: 0, feedbackSubmitted: true })
  }

  onSubmitFailure = errorMsg => {
    alert(`${errorMsg} error while submitting your feedback`)

  }

  logoutClicked = () => {
    Cookies.remove('jwt_token')
  }

  submitForm = async (event) => {
    console.log("submit entered")
    event.preventDefault()
    const { UiRating,
      feedbackText,
      informativeRating,
      codingStructureRating,
      overallRating,
    } = this.state

    const response = await Axios.post("http://localhost:3005/feedback", {

      UiRating: UiRating,
      feedbackText: feedbackText,
      codingStructureRating: codingStructureRating,
      informativeRating: informativeRating,
      overallRating: overallRating

    })

    console.log(response)
    const data = await response.data
    console.log(data)

    if (data === "Feedback posted successfully") {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data)
    }
  }

  render() {
    const { UiRating,
      feedbackText,
      informativeRating,
      codingStructureRating,
      overallRating,
      feedbackSubmitted } = this.state

    const jwtToken = Cookies.get('jwt_token')

    console.log(jwtToken)
    if (jwtToken === undefined) {
      return <Navigate to="/login" />
    } else {
      if (feedbackSubmitted === false) {

        return (
          <>
            <Navbar />
            <div className='body-div'>

              <form className=' form-div' onSubmit={this.submitForm}>

                <h6 className='mt-3 heading'>Give Your Feedback On This Website</h6>

                <div className="form-group">

                  <label>
                    How Informative is this Website ?</label>
                  <select value={informativeRating} onChange={this.onChangeinformativeRating}>
                    <option value="very good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="decent">Decent</option>
                    <option value="poor">Poor</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>
                    How to you rate User Interface ? </label>
                  <select value={UiRating} onChange={this.onChangeUiRating}>
                    <option value="very good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="decent">Decent</option>
                    <option value="poor">Poor</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>
                    How do you rate the Coding Structure and efficiency ?</label>
                  <select value={codingStructureRating} onChange={this.onChangeCodingStructureRating}>
                    <option value="very good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="decent">Decent</option>
                    <option value="poor">Poor</option>
                  </select>

                </div>

                <div className="form-group">
                  <label className='labelName'>Any Compliments or Remarks ?</label>
                  <input type="textbox" value={feedbackText} className="form-control" placeholder="Enter your feedback" onChange={this.onChangeFeedbackText} />

                </div>
                <div className="form-group">
                  <label className='selectLabel'>
                    Overall Rating ?
                  </label>
                  <select value={overallRating} onChange={this.onChangeOverallRating}>
                    <option value="very good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="decent">Decent</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>

                <button type="submit" className="signBtn ">Submit Feedback</button>

                <button onClick={this.logoutClicked} className="logoutBtn"><a className='anchorStyle mt-3' href='/'>Logout</a></button>

              </form>
            </div>
            <Footer/>
          </>
        )
      }
      return (
        <>
          <Navbar />
          <div className='cont'>
            <h3>Your Feedback has been submitted.<br />Please proceed to <span><button onClick={this.logoutClicked} className="logoutBtnFb mt-3"><a className='anchorStyle mt-1' href='/'>Logout</a></button></span></h3>
          </div>
          <Footer/>
        </>
      )

    }
  }

}

export default FeedbackForm
