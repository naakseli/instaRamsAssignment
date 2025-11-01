import {
	IconBuildingFactory2,
	IconCalendarEvent,
	IconCalendarStats,
	IconUser,
} from '@tabler/icons-react'
import { useState } from 'react'
import classes from './NavBar.module.css'

const data = [
	{ link: '', label: 'Factories', icon: IconBuildingFactory2 },
	{ link: '', label: 'Personnel', icon: IconUser },
	{ link: '', label: 'Reservations', icon: IconCalendarEvent },
	{ link: '', label: 'Scheduling Overview', icon: IconCalendarStats },
]

export function NavBar() {
	const [active, setActive] = useState('Billing')

	const links = data.map(item => (
		<a
			className={classes.link}
			data-active={item.label === active || undefined}
			href={item.link}
			key={item.label}
			onClick={event => {
				event.preventDefault()
				setActive(item.label)
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</a>
	))

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>{links}</div>
		</nav>
	)
}
