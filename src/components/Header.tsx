import React from 'react'

export const Header: React.FC<{}> = () => {
	return (
		<div>
			<nav className='py-3 border-bottom navbar navbar-expand px-3 justify-content-between'>
				<div className='flex-fill'>
					<a data-testid='logo' href='/#' className='navbar-brand'>
						<img src='logo192.png' width={40} alt='logo' />
					</a>

					<form data-testid='search' className='mr-auto w-50 form-check-inline'>
						<input placeholder='Search homes' type='text' className='w-50 form-control' />
					</form>
				</div>

				<div data-testid='menu' className='ml-auto text-uppercase navbar-nav'>
					<a href='#home' className='nav-link'>Become a host</a>
					<a href='#home' className='nav-link'>Help</a>
					<a href='#home' className='nav-link'>Sign up</a>
					<a href='#home' className='nav-link'>Login</a>
				</div>
			</nav>
			<div className='m-0 px-4 py-2 container-fluid mw-100 border-bottom container'>
				<button className='text-nowrap me-4 py-1 btn btn-outline-secondary' type="button" data-testid="home-type">Home type</button>
				<button className='text-nowrap me-4 py-1 btn btn-outline-secondary' type="button" data-testid="dates">Dates</button>
				<button className='text-nowrap me-4 py-1 btn btn-outline-secondary' type="button" data-testid="guests">Guests</button>
				<button className='text-nowrap me-4 py-1 btn btn-outline-secondary' type="button" data-testid="price">Price</button>
				<button className='text-nowrap me-4 py-1 btn btn-outline-secondary' type="button" data-testid="rooms">Rooms</button>
				<button className='text-nowrap me-4 py-1 btn btn-outline-secondary' type="button" data-testid="amenities">Amenities</button>
			</div>
		</div>
	)
}