import React, { useEffect, useState } from 'react'
import { BookingEventBase, bookingDialogService } from '../services/bookingDialogService'
import moment from 'moment'
import { apiClient } from '../services/apiClient'
import { notificationService } from '../services/notificationService'

export const DialogData: React.FC<BookingEventBase> = (props) => {
	const [checkIn, setCheckIn] = useState('')
	const [checkOut, setCheckOut] = useState('')
	const [totalPrice, setTotalPrice] = useState('');

	useEffect(() => {
		const price = props.payload ? props.payload.price : 0;
		const checkInDate = moment(checkIn, 'YYYY-MM-DD');
		const checkOutDate = moment(checkOut, 'YYYY-MM-DD');
		const totalNights = checkOutDate.diff(checkInDate, 'days');
		const total = totalNights * Number(price);

		if (total) {
			setTotalPrice(total.toString());
		} else {
			setTotalPrice('--')
		}

	}, [checkIn, checkOut, props.payload])

	const handleBooking = () => {
		apiClient.bookHome(props.payload, checkIn, checkOut)
			.then(res => {
				bookingDialogService.close()
				notificationService.open(res.message)
			})
	}

	if (!props.payload) {
		return <div data-testid="dialog-empty"></div>
	}

	return (
		<div>
			<h2 data-testid="dialog-title">{props.payload?.title}</h2>
			<div>
				<span className='fw-bold text-primary fs-6' data-testid="dialog-price">
					IDR {props.payload?.price}
				</span> per night
			</div>
			<div>
				<label htmlFor='checkInDate' className='form-label'>Check-in date: </label>
				<input data-testid="dialog-checkin" type='date' onChange={e => setCheckIn(e.target.value)} className='form-control' id='checkInDate' />
			</div>
			<div>
				<label htmlFor='checkOutDate' className='form-label'>Check-out date: </label>
				<input data-testid="dialog-checkout" type='date' onChange={e => setCheckOut(e.target.value)} className='form-control' id='checkOutDate' />
			</div>
			<div className='my-3 text-end'>
				Total <span className='fw-bold' data-testid="dialog-total-price">IDR {totalPrice}</span>
			</div>
			<div className='d-flex justify-content-end'>
				<button data-testid="dialog-book-btn" type='button' onClick={handleBooking} className='btn btn-primary'>Book</button>
			</div>
		</div>
	)
}