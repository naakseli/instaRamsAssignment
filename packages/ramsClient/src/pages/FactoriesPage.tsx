import { FactoryResponse } from '@insta/ramsbackend/src/types/api.type'
import { ActionIcon, Center, Container, Loader, Menu, Table, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots } from '@tabler/icons-react'
import { useState } from 'react'
import { useFactories } from '../api/factory/useGetAllFactories'
import { EditFactoryModal } from '../components/EditFactoryModal/EditFactoryModal'

const FactoriesPage = () => {
	const { data: factories, isLoading } = useFactories()
	const [editFactoryModalOpened, { open: openEditFactoryModal, close: closeEditFactoryModal }] =
		useDisclosure(false)
	const [editingFactory, setEditingFactory] = useState<FactoryResponse | null>(null)

	const handleEditFactory = (factory: FactoryResponse) => {
		setEditingFactory(factory)
		openEditFactoryModal()
	}

	if (isLoading) {
		return (
			<Center h='100vh'>
				<Loader />
			</Center>
		)
	}

	return (
		<Container size='xl' py='xl'>
			<Title order={1} mb='lg'>
				Factories
			</Title>
			<Table highlightOnHover>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Name</Table.Th>
						<Table.Th>Time Zone</Table.Th>
						<Table.Th>Reservations</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{factories
						?.sort((a, b) => a.name.localeCompare(b.name))
						.map(factory => (
							<Table.Tr key={factory.id}>
								<Table.Td>
									<Text fw={500}>{factory.name}</Text>
								</Table.Td>
								<Table.Td>
									<Text size='sm' c='dimmed'>
										{factory.timeZone}
									</Text>
								</Table.Td>
								<Table.Td>
									<Text size='sm' c='dimmed'>
										0
									</Text>
								</Table.Td>
								<Table.Td>
									<Menu>
										<Menu.Target>
											<ActionIcon variant='subtle' size='xs'>
												<IconDots />
											</ActionIcon>
										</Menu.Target>
										<Menu.Dropdown>
											<Menu.Item onClick={() => handleEditFactory(factory)}>Edit</Menu.Item>
										</Menu.Dropdown>
									</Menu>
								</Table.Td>
							</Table.Tr>
						))}
				</Table.Tbody>
			</Table>

			<EditFactoryModal
				opened={editFactoryModalOpened}
				onClose={() => {
					closeEditFactoryModal()
					setEditingFactory(null)
				}}
				factory={editingFactory}
			/>
		</Container>
	)
}

export default FactoriesPage
