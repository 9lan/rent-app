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
				notificationService.open(res)
			})
	}

	if (!props.payload) {
		return <div data-testid="dialog-empty"></div>
	}

	return (
		<div>
			<div data-testid="dialog-title">{props.payload?.title}</div>
			<div data-testid="dialog-price">{props.payload?.price}</div>
			<input data-testid="dialog-checkin" type='date' onChange={e => setCheckIn(e.target.value)} />
			<input data-testid="dialog-checkout" type='date' onChange={e => setCheckOut(e.target.value)} />
			<div data-testid="dialog-total-price">IDR {totalPrice}</div>
			<button data-testid="dialog-book-btn" type='button' onClick={handleBooking}>Book</button>
		</div>
	)
}