import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router'
import { NavBar } from './NavBar/NavBar'

function AppLayout() {
	const [opened, { toggle }] = useDisclosure(false)

	return (
		<AppShell
			padding='md'
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Navbar>
				<NavBar />
			</AppShell.Navbar>

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
