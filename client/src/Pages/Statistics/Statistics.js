import React, { useEffect, useState } from 'react'
import './Statistics.css'
import Form from 'react-bootstrap/Form'
import 'chart.js/auto'
import { Doughnut } from "react-chartjs-2"
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function Statistics() {
	const [countries, setCountries] = useState('')
	const [data, setData] = useState('')
	const [data1, setData1] = useState('')
	const [details, setDetails] = useState('')
	const [selectedCountry, setSelectedCountry] = useState('')
	const [countryDetails, setCountryDetails] = useState('')

	const handleChange = (e) => {
		console.log(e.target.value, "value")
		setSelectedCountry(e.target.value)
	}

	useEffect(() => {
		if (selectedCountry && selectedCountry !== "") {
			const index = details && details.Countries.findIndex(x => x.Slug === selectedCountry);
			if (index !== -1) {
				setCountryDetails(details && details.Countries[index])
			}
		}

	}, [selectedCountry])

	useEffect(() => {
		fetch('https://api.covid19api.com/countries')
			.then(response => response.json())
			.then(data => setCountries(data));

		fetch('https://api.covid19api.com/summary')
			.then(response => response.json())
			.then(data => setDetails(data));
	}, [])


	useEffect(() => {
		if (countryDetails && countryDetails !== '') {
			const recoveredNumber=countryDetails.TotalConfirmed-countryDetails.TotalDeaths;
			const newRecoveredNumber= countryDetails.NewConfirmed-countryDetails.NewDeaths;
			const data = {
				labels: ["TotalConfirmed", "TotalDeaths", "Under Recovery/Recovered"],
				datasets: [
					{
						data: [countryDetails.TotalConfirmed, countryDetails.TotalDeaths, recoveredNumber],
						backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
						hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
						borderWidth: 2
					}
				]
			};
			setData(data)

			const data1 = {
				labels: ["NewConfirmed", "NewDeaths", "Under Recovery/Recovered"],
				datasets: [
					{
						data: [countryDetails.NewConfirmed, countryDetails.NewDeaths, newRecoveredNumber],
						backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
						hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
						borderWidth: 2
					}
				]
			};
			setData1(data1)

		}
	}, [countryDetails])


	const orderedCountriesList=details.Countries
	
	return (
		<>
			<Navbar />

			<div className='stat_main'>
				<div className='stat_select_div'>
					<Form.Select aria-label="Default select example" className="stat_select" onChange={(e) => handleChange(e)}>
						<option>Pick a country</option>
						
							{orderedCountriesList &&
							orderedCountriesList.map((response, index) => (
								
								<option value={response.Slug} key={index}>{response.Country}</option>
							))}
					</Form.Select>
				</div>

			</div>
			<div className='d-flex mt-5'>
				<div className='doughnut_div'>
					{data && data !== '' &&
						<Doughnut data={data} />
					}
				</div>

				<div className='doughnut_div'>
					{data1 && data1 !== '' &&
						<Doughnut data={data1} />
					}
				</div>
			</div>


			<Footer />
		</>
	)
}

export default Statistics
