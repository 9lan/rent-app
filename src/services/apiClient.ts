import { HomeData } from "../containers"

export const apiClient = {
	getHomes: async (): Promise<HomeData[]> => {
		return fetch('https://run.mocky.io/v3/13810a66-8b32-419f-9e46-78d37dcfd776')
			.then(response => response.json())
	}
}