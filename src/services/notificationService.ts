import { BehaviorSubject } from "rxjs"

export type NotificationEventBase = {
	message?: string | null;
};

export interface NotificationEvent extends NotificationEventBase {
	open: boolean;
}

const events = new BehaviorSubject<NotificationEvent>({ open: false, message: null })

export const notificationService = {
	open: (message: string) => events.next({ open: true, message }),
	close: () => events.next({ open: false, message: null }),
	events: events.asObservable()
}