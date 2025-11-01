import { FactoryDTO } from '@insta/shared'
import { ActionIcon, Center, Container, Loader, Menu, Table, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconDots } from '@tabler/icons-react'
import { useState } from 'react'
import { useDeleteFactory } from '../api/useDeleteFactory'
import { useFactories } from '../api/useGetAllFactories'
import { EditFactoryModal } from '../components/EditFactoryModal'

const FactoriesPage = () => {
	const { data: factories, isLoading } = useFactories()
	const [editFactoryModalOpened, { open: openEditFactoryModal, close: closeEditFactoryModal }] =
		useDisclosure(false)
	const [editingFactory, setEditingFactory] = useState<FactoryDTO | null>(null)
	const { mutate: deleteFactory } = useDeleteFactory()

	const handleEditFactory = (factory: FactoryDTO) => {
		setEditingFactory(factory)
		openEditFactoryModal()
	}

	const handleDeleteFactory = (factory: FactoryDTO) => {
		modals.openConfirmModal({
			title: 'Delete Factory',
			children: (
				<Text>
					Are you sure you want to delete factory: {factory.name}? This action cannot be undone.
				</Text>
			),
			confirmProps: { color: 'red' },
			onConfirm: () => deleteFactory(factory.id),
			labels: { confirm: 'Delete', cancel: 'Cancel' },
		})
	}

	if (isLoading) {
		return (
			<Center h='100vh'>
				<Loader />
			</Center>
		)
	}

	return (
		<>
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
												<Menu.Item onClick={() => handleDeleteFactory(factory)}>Delete</Menu.Item>
											</Menu.Dropdown>
										</Menu>
									</Table.Td>
								</Table.Tr>
							))}
					</Table.Tbody>
				</Table>
			</Container>

			<EditFactoryModal
				opened={editFactoryModalOpened}
				onClose={() => {
					closeEditFactoryModal()
					setEditingFactory(null)
				}}
				factory={editingFactory}
			/>
		</>
	)
}

export default FactoriesPage
