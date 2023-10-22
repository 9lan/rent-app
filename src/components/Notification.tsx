import { Snackbar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { NotificationEvent, notificationService } from '../services/notificationService';

export const Notification: React.FC<{}> = () => {
	const [notif, setNotif] = useState<NotificationEvent>({ open: false })

	useEffect(() => {
		const sub = notificationService.events.subscribe(ev => setNotif(ev));
		return () => sub.unsubscribe();
	}, []);

	return (
		<Snackbar
			open={notif.open}
			onClose={() => notificationService.close()}
			message={notif.message}
			autoHideDuration={3000}
		/>
	)
}