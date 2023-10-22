import React, { useEffect, useState } from 'react'
import { apiClient } from '../services/apiClient';

export type HomeData = { title: string; image: string; location: string; price: string; }

export const Home: React.FC<{}> = () => {
	const [homeState, setHomeState] = useState<HomeData[]>([]);

	useEffect(() => {
		const homeData = apiClient.getHomes();

		homeData.then((data) => setHomeState(data))
	}, [])

	const homes = homeState.map((item, index) => {
		return (
			<div key={index} className='col-6 col-md-6 col-lg-4 col-xl-3 mb-3'>
				<div data-testid="home" className='card w-100'>
					<img data-testid="home-image" src={item.image} alt={item.title} className='card-img-top' />
					<div className='card-body'>
						<div data-testid="home-title" className='card-title h5'>{item.title}</div>
						<div data-testid="home-location">{item.location}</div>
						<div data-testid="home-price">IDR {item.price}/night</div>
					</div>
				</div>
			</div>
		)
	})

	return (
		<div className='container m-2'>
			<h1>Homes</h1>
			<div className='row'>
				{homes}
			</div>
		</div>
	)
}