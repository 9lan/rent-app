import React from 'react'
import { Header } from './Header';
import { render, screen } from '@testing-library/react';

describe('Header components', () => {

	it('should show logo', () => {
		render(<Header />);
		expect(screen.getByTestId("logo")).toBeTruthy();
	})

	it('should show search', () => {
		render(<Header />);
		expect(screen.getByTestId("search")).toBeTruthy();
	})

	it('should show menu', () => {
		render(<Header />);
		expect(screen.getByTestId("menu")).toBeTruthy();
	})

	it('should show filter', () => {
		render(<Header />);
		expect(screen.getByTestId("home-type")).toBeTruthy();
		expect(screen.getByTestId("dates")).toBeTruthy();
		expect(screen.getByTestId("guests")).toBeTruthy();
		expect(screen.getByTestId("price")).toBeTruthy();
		expect(screen.getByTestId("rooms")).toBeTruthy();
		expect(screen.getByTestId("amenities")).toBeTruthy();
	})

})