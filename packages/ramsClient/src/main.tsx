import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import FactoriesPage from './features/factories/pages/FactoriesPage'
import PersonnelPage from './features/personnel/pages/PersonnelPage'
import AppLayout from './layout/AppLayout'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<AppLayout />}>
							<Route path='factories' element={<FactoriesPage />} />
							<Route path='personnel' element={<PersonnelPage />} />
							<Route path='reservations' />
							<Route path='scheduling-overview' />
						</Route>
					</Routes>
				</BrowserRouter>
			</MantineProvider>
		</QueryClientProvider>
	</StrictMode>
)
