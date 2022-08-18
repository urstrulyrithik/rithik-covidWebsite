import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Slider from '../../Components/Slider/Slider'
import Footer from '../../Components/Footer/Footer'
import "./Home.css"
function Home() {
	return (
		<>
			<Navbar />
			<Slider />
			<div className='row m-0 mt-5'>
				<div className='col-md-6 p-4'>
					<h2>Coronavirus disease (COVID-19) pandemic</h2>
					<p>
						<p>On 31 December 2019, WHO was informed of cases of pneumonia of unknown cause in Wuhan City, China. A novel coronavirus was identified as the cause by Chinese authorities on 7 January 2020 and was temporarily named “2019-nCoV”.</p>
						<p>Coronaviruses (CoV) are a large family of viruses that cause illness ranging from the common cold to more severe diseases. A novel coronavirus (nCoV) is a new strain that has not been previously identified in humans. The new virus was subsequently named the “COVID-19 virus”.</p>
						<p>On 30 January 2020, Dr Tedros Adhanom Ghebreyesus, WHO Director-General declared the novel coronavirus outbreak a public health emergency of international concern (PHEIC), WHO's highest level of alarm. At that time there were 98 cases and no deaths in 18 countries outside China.</p>
						<p>On 11 March 2020, the rapid increase in the number of cases outside China led the WHO Director-General to announce that the outbreak could be characterized as a pandemic. By then more than 118 000 cases had been reported in 114 countries, and 4291 deaths had been recorded.</p>
						<p>By mid-March 2020, the WHO European Region had become the epicentre of the epidemic, reporting over 40% of globally confirmed cases. As of 28 April 2020, 63% of global mortality from the virus was from the Region.</p>
						<p>Since the first cases were reported, WHO has worked around the clock to support countries to prepare and respond to the COVID-19 pandemic. In the words of Dr Hans Henri P. Kluge, WHO Regional Director for Europe, “Through transparent knowledge-sharing, tailored support on the ground, and steadfast solidarity, we will beat COVID-19.”</p>
					</p>
				</div>
				<div className='col-md-6'>
					<div className='black_bg' style={{ width: "560px", height: "400px" }}>
						<img className='w-100' src='./images/black.jpg' />
					</div>
				</div>
			</div>
			<div className='row m-0' >
				<div className='col-md-6'>
					<div className='black_bg' style={{ width: "560px", height: "400px" }}>
						<img className='w-100' src='./images/mask.jpg' />
					</div>
				</div>
				<div className='col-md-6 p-4'>
					<h2>Advice for the public</h2>
					<p>
						<h4 className='mt-3'>WHO continues to encourage individuals to take care of their own health and protect others by:</h4>
						<ul className='mt-3'>
							<li>
								Washing hands frequently with water and soap or using hand-sanitizing gel.
							</li>
							<li>Maintaining social distance (keeping a distance of 1 metre (3 feet) between yourself and anyone who is coughing or sneezing).</li>
							<li>
								Avoid touching eyes, nose and mouth.
							</li>
							<li> Wearing a mask is compulsory.</li>
							<li> Following respiratory hygiene (covering your mouth and nose with your folded elbow or tissue when you cough or sneeze, then disposing of the used tissue immediately).</li>
							<li> Seeking medical care early if you have a fever, cough and difficulty breathing, and
								staying informed and following advice given by your health care provider, national and local public health authority, or employer on how to protect yourself and others from COVID-=19.</li>
						</ul>
					</p>
				</div>
			</div>
			<Footer />
		</>
	)
}
export default Home
