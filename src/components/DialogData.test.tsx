import { act, fireEvent, getNodeText, render, screen } from "@testing-library/react"
import { DialogData } from "./DialogData"
import { apiClient } from "../services/apiClient";
import { bookingDialogService } from "../services/bookingDialogService";
import { notificationService } from "../services/notificationService";

const mockedData = {
	title: 'Apartemen Aeropolis Residence',
	image: 'room.png',
	location: 'Tangerang Airport',
	price: '1337088',
};

describe('description', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should show title', () => {
		render(<DialogData payload={mockedData} />);
		const title = screen.getByTestId('dialog-title');
		expect(getNodeText(title)).toBe('Apartemen Aeropolis Residence')
	})

	it('should show price', () => {
		render(<DialogData payload={mockedData} />);
		const price = screen.getByTestId('dialog-price');
		expect(getNodeText(price)).toBe('1337088');
	})

	it('should show check-in date field', () => {
		render(<DialogData payload={mockedData} />);
		const checkIn = screen.getByTestId('dialog-checkin');
		expect(checkIn).toBeTruthy();
	})

	it('should show check-out date field', () => {
		render(<DialogData payload={mockedData} />);
		const checkOut = screen.getByTestId('dialog-checkout');
		expect(checkOut).toBeTruthy();
	})

	it('should calculate total price', () => {
		render(<DialogData payload={mockedData} />);
		const checkIn = screen.getByTestId('dialog-checkin');
		const checkOut = screen.getByTestId('dialog-checkout');
		const totalPrice = screen.getByTestId('dialog-total-price');

		fireEvent.change(checkIn, { target: { value: '2023-10-22' } })
		fireEvent.change(checkOut, { target: { value: '2023-10-25' } })

		expect(getNodeText(totalPrice)).toBe('IDR 4011264')
	})

	it('should book home after clicking the book btn', () => {
		render(<DialogData payload={mockedData} />);

		jest.spyOn(apiClient, 'bookHome').mockImplementation(() => {
			return Promise.resolve();
		})

		const checkIn = screen.getByTestId('dialog-checkin');
		const checkOut = screen.getByTestId('dialog-checkout');

		fireEvent.change(checkIn, { target: { value: '2023-10-22' } })
		fireEvent.change(checkOut, { target: { value: '2023-10-25' } })

		screen.getByTestId('dialog-book-btn').click();

		expect(apiClient.bookHome).toHaveBeenCalledWith(mockedData, '2023-10-22', '2023-10-25')
	})

	it('should close the dialog and show notification after booking a home', async () => {
		render(<DialogData payload={mockedData} />);

		jest.spyOn(apiClient, 'bookHome').mockImplementation(() => Promise.resolve('Message: Booked success!'))
		jest.spyOn(bookingDialogService, 'close').mockImplementation(() => { })
		jest.spyOn(notificationService, 'open').mockImplementation(() => { })

		const checkIn = screen.getByTestId('dialog-checkin');
		const checkOut = screen.getByTestId('dialog-checkout');

		fireEvent.change(checkIn, { target: { value: '2023-10-22' } })
		fireEvent.change(checkOut, { target: { value: '2023-10-25' } })

		await act(() => {
			screen.getByTestId('dialog-book-btn').click();
		});

		expect(bookingDialogService.close).toHaveBeenCalled()
		expect(notificationService.open).toHaveBeenCalledWith('Message: Booked success!')
	})

	it('should show empty data wben no payload provided', () => {
		render(<DialogData payload={null} />);
		const empty = screen.getByTestId('dialog-empty');
		expect(empty).toBeTruthy();
	})

})