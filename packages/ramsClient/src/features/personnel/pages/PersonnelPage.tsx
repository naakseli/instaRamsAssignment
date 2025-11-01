import { ActionIcon, Center, Container, Loader, Menu, Table, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDots } from '@tabler/icons-react'
import { useState } from 'react'
import { Personnel, useGetAllPersonnel } from '../api/useGetAllPersonnel'
import { EditPersonnelModal } from '../components/EditPersonnelModal'

const PersonnelPage = () => {
	const { data: allPersonnel, isLoading } = useGetAllPersonnel()
	const [editingPersonnel, setEditingPersonnel] = useState<Personnel | null>(null)
	const [
		editPersonnelModalOpened,
		{ open: openEditPersonnelModal, close: closeEditPersonnelModal },
	] = useDisclosure(false)

	const handleEditPersonnel = (person: Personnel) => {
		setEditingPersonnel(person)
		openEditPersonnelModal()
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
				Personnel
			</Title>
			<Table highlightOnHover>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Personal ID</Table.Th>
						<Table.Th>Full Name</Table.Th>
						<Table.Th>Email</Table.Th>
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{allPersonnel
						?.sort((a, b) => a.fullName.localeCompare(b.fullName))
						.map(person => (
							<Table.Tr key={person.id}>
								<Table.Td>
									<Text fw={500}>{person.personalId}</Text>
								</Table.Td>
								<Table.Td>
									<Text fw={500}>{person.fullName}</Text>
								</Table.Td>
								<Table.Td>
									<Text size='sm' c='dimmed'>
										{person.email}
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
											<Menu.Item onClick={() => handleEditPersonnel(person)}>Edit</Menu.Item>
										</Menu.Dropdown>
									</Menu>
								</Table.Td>
							</Table.Tr>
						))}
				</Table.Tbody>
			</Table>

			<EditPersonnelModal
				opened={editPersonnelModalOpened}
				onClose={() => {
					closeEditPersonnelModal()
					setEditingPersonnel(null)
				}}
				personnel={editingPersonnel}
			/>
		</Container>
	)
}

export default PersonnelPage
