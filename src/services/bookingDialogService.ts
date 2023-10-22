import { HomeData } from "../containers"
import { BehaviorSubject } from "rxjs"

export type BookingEventBase = {
	payload?: HomeData | null;
};

export interface BookingEvent extends BookingEventBase {
	open: boolean;
}

const events = new BehaviorSubject<BookingEvent>({ open: false, payload: null })

export const bookingDialogService = {
	open: (payload: HomeData) => events.next({ open: true, payload }),
	close: () => events.next({ open: false, payload: null }),
	events: events.asObservable()
}