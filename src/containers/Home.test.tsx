import React from 'react';
import { getNodeText, render, screen } from '@testing-library/react';
import { Home } from './Home';
import { apiClient } from '../services/apiClient';
import { bookingDialogService } from '../services/bookingDialogService';

describe('Home Component', () => {
	beforeEach(() => {
		jest.spyOn(apiClient, 'getHomes').mockImplementation(() => {
			return Promise.resolve([
				{
					title: 'Apartemen Aeropolis Residence',
					image: 'room.png',
					location: 'Tangerang Airport',
					price: '1337088',
				},
				{
					title: 'Apartemen M-Town Residence',
					image: 'room.png',
					location: 'Gading Serpong',
					price: '5000000',
				},
				{
					title: 'Apartemen Bintaro Plaza Residence Altiz Tower',
					image: 'room.png',
					location: 'Bintaro Jaya',
					price: '6143336',
				}
			])
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders a list of homes', async () => {
		render(<Home />);
		const homeElements = await screen.findAllByTestId('home');
		expect(homeElements).toHaveLength(3); // Assuming you have 3 homes in the data
	});

	it('should show home title', async () => {
		render(<Home />);
		const homeTitles = await screen.findAllByTestId('home-title');
		expect(getNodeText(homeTitles[0])).toBe('Apartemen Aeropolis Residence')
	})

	it('should show home image', async () => {
		render(<Home />);
		const homeImages = await screen.findAllByTestId('home-image');
		expect(homeImages[0]).toBeTruthy();
	})

	it('should show home location', async () => {
		render(<Home />);
		const homeLocations = await screen.findAllByTestId('home-location');
		expect(getNodeText(homeLocations[0])).toBe('Tangerang Airport');
	})

	it('should show home price', async () => {
		render(<Home />);
		const homePrices = await screen.findAllByTestId('home-price');
		expect(getNodeText(homePrices[0])).toBe('IDR 1337088/night');
	})

	it('should show home booking btn', async () => {
		render(<Home />);
		const homeBookingBtn = await screen.findAllByTestId('home-booking-btn');
		expect(homeBookingBtn[0]).toBeTruthy();
	})

	it('should open home booking dialog', async () => {
		render(<Home />);

		jest.spyOn(bookingDialogService, 'open').mockImplementation(() => { });

		const homeBookingBtn = await screen.findAllByTestId('home-booking-btn');
		homeBookingBtn[0].click();

		expect(bookingDialogService.open).toHaveBeenCalledWith({
			title: 'Apartemen Aeropolis Residence',
			image: 'room.png',
			location: 'Tangerang Airport',
			price: '1337088',
		});
	})
});
