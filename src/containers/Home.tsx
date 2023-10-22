import React, { useEffect, useState } from 'react'
import { apiClient } from '../services/apiClient';
import { BookingEvent, bookingDialogService } from '../services/bookingDialogService';
import { Dialog, DialogContent } from '@material-ui/core';

export type HomeData = { title: string; image: string; location: string; price: string; }

export const Home: React.FC<{}> = () => {
	const [homeState, setHomeState] = useState<HomeData[]>([]);
	const [bookingDialog, setBookingDialog] = useState<BookingEvent>({ open: true })

	useEffect(() => {
		const homeData = apiClient.getHomes();

		homeData.then((data) => setHomeState(data))
	}, [])

	useEffect(() => {
		const sub = bookingDialogService.events.subscribe(state => setBookingDialog(state))
		return () => sub.unsubscribe();
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
						<div className='d-flex justify-content-end'>
							<button data-testid="home-booking-btn" type='button' className='btn btn-primary' onClick={() => bookingDialogService.open(item)}>Book</button>
						</div>
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

			<Dialog open={bookingDialog.open} onClose={() => bookingDialogService.close()}>
				<DialogContent>
					{bookingDialog.payload ? bookingDialog.payload.title : null}
				</DialogContent>
			</Dialog>
		</div>
	)
}