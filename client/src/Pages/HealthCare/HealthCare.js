import React, { useState, useEffect } from 'react'
import './HealthCare.css'
import { useSearchParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function HealthCare() {
	const [type, setType] = useState('')
	const [medicalData, setMedicalData] = useState('')
	const [medical, setMedical] = useState('')
	const [searchParams] = useSearchParams();
	const [selectedMedical, setSelectedMedical] = useState('')

	const handleChange = (e) => {
		console.log(e.target.value, "value")
		setSelectedMedical(e.target.value)
	}
	useEffect(() => {
		setType(searchParams.get('type'));
	}, [searchParams])

	function getUniqueListBy(arr, key) {
		return [...new Map(arr.map(item => [item[key], item])).values()]
	}

	useEffect(() => {
		if (type && type == 'medical') {
			fetch('https://api.rootnet.in/covid19-in/hospitals/medical-colleges')
				.then(response => response.json())
				.then(data => {
					setMedicalData(getUniqueListBy(data.data.medicalColleges, 'state'))
					setMedical(data.data.medicalColleges)
				});
		}
		else if (type && type == 'hospital') {
			fetch('https://api.rootnet.in/covid19-in/hospitals/beds')
				.then(response => response.json())
				.then(data => {
					// setMedicalData(getUniqueListBy(data.data.medicalColleges, 'state'))
					setMedicalData(data.data.regional)
				});
		}
	}, [type])

	console.log(medicalData, "medical")
	return (
		<>
			<Navbar />

			<div className='health_main'>
				<div className='health_select_div'>
					<Form.Select aria-label="Default select example" className="health_select" onChange={(e) => handleChange(e)}>
						<option>Pick a State</option>
						{medicalData &&
							medicalData && medicalData.map((response, index) => (
								<option value={response.state} key={index}>{response.state}</option>
							))}
					</Form.Select>
				</div>
			</div>
			<div className='row m-0'>
				{type && type == 'hospital' &&
					medicalData && medicalData.filter(name => name.state == selectedMedical).map(data => (
						<div className='col-md-12'>
							<div class="cards">
								<div class="card card-1">
									<h2 class="card__title">TotalHospitals :{data.totalHospitals}</h2>
									<h2 class="card__title">Total Beds :{data.totalBeds}</h2>

									<div className='row'>
										<div className='col-md-6'>
											<p>Rural Hospitals :{data.ruralHospitals}</p>
										</div>
										<div className='col-md-6'>
											<p>Urban Hospitals :{data.urbanHospitals}</p>
										</div>
									</div>

									<div className='row'>
										<div className='col-md-6'>
											<p>Rural Beds :{data.ruralBeds}</p>
										</div>
										<div className='col-md-6'>
											<p>Urban Beds :{data.urbanBeds}</p>
										</div>
									</div>

								</div>
							</div>
						</div>
					))
				}
				{medical && medical.filter(name => name.state == selectedMedical).map(data => (
					<div className='col-md-4'>
						<div class="cards">
							<div class="card card-1">
								<h2 class="card__title">{data.name} - {data.city}</h2>

								<div className='row'>
									<div className='col-md-6'>
										<p>Hospital Beds :{data.hospitalBeds}</p>
									</div>
									<div className='col-md-6'>
										<p>Admission Capacity :{data.admissionCapacity}</p>
									</div>
								</div>

								<p class="card__apply">
									<a class="card__link" href="#">Contact Now <i class="fas fa-arrow-right"></i></a>
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<Footer />
		</>
	)
}

export default HealthCare
