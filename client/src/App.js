import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Statistics from './Pages/Statistics/Statistics'
import HealthCare from './Pages/HealthCare/HealthCare'
import Login from './Pages/Login/Login'
import Signup from "./Pages/Signup/Signup";
import Feedback  from "./Pages/Feedback/Feedback";


function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route exact path="/statistics" element={<Statistics />} />
					<Route exact path="/feedback" element={<Feedback />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
					<Route exact path="/health" element={<HealthCare />} />
					<Route exact path="/" element={<Home />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
