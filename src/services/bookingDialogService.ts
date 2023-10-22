import { HomeData } from "../containers"
import { BehaviorSubject } from "rxjs"

export type BookingEvent = {
	open: boolean;
	payload?: HomeData | null;
};

const events = new BehaviorSubject<BookingEvent>({ open: false, payload: null })

export const bookingDialogService = {
	open: (payload: HomeData) => events.next({ open: true, payload }),
	close: () => events.next({ open: false, payload: null }),
	events: events.asObservable()
}