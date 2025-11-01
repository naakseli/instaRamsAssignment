import {
	IconBuildingFactory2,
	IconCalendarEvent,
	IconCalendarStats,
	IconUser,
} from '@tabler/icons-react'
import { NavLink, useLocation } from 'react-router'
import classes from './NavBar.module.scss'

const data = [
	{ link: '/factories', label: 'Factories', icon: IconBuildingFactory2 },
	{ link: '/personnel', label: 'Personnel', icon: IconUser },
	{ link: '/reservations', label: 'Reservations', icon: IconCalendarEvent },
	{ link: '/scheduling-overview', label: 'Scheduling Overview', icon: IconCalendarStats },
]

export function NavBar() {
	const location = useLocation()

	const links = data.map(item => {
		const isActive =
			location.pathname === item.link || location.pathname.startsWith(item.link + '/')
		return (
			<NavLink
				className={classes.link}
				to={item.link}
				key={item.label}
				data-active={isActive ? true : undefined}
			>
				<item.icon className={classes.linkIcon} stroke={1.5} />
				<span>{item.label}</span>
			</NavLink>
		)
	})

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>{links}</div>
		</nav>
	)
}
