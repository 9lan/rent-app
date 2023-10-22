import { HomeData } from "../containers"

export const apiClient = {
	getHomes: async (): Promise<HomeData[]> => {
		return fetch('https://run.mocky.io/v3/13810a66-8b32-419f-9e46-78d37dcfd776')
			.then(response => response.json())
	},
	bookHome: (_payload: HomeData | null | undefined, _checkIn: any, _checkOut: any) => {
		return fetch('https://run.mocky.io/v3/6dc9a171-12a0-4d3d-9565-596678eb3c8f')
			.then(response => response.json())
	}
}