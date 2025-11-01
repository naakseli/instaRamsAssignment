import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useUpdatePersonnel, type Personnel } from '../../api/personnel'

interface EditPersonnelModalProps {
	opened: boolean
	onClose: () => void
	personnel: Personnel | null
}

export function EditPersonnelModal({ opened, onClose, personnel }: EditPersonnelModalProps) {
	const updatePersonnelMutation = useUpdatePersonnel()

	const form = useForm({
		initialValues: {
			personalId: '',
			fullName: '',
			email: '',
		},
		validate: {
			personalId: value => (value.trim().length === 0 ? 'Personal ID is required' : null),
			fullName: value => (value.trim().length === 0 ? 'Full name is required' : null),
			email: value => {
				if (value.trim().length === 0) {
					return 'Email is required'
				}
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				if (!emailRegex.test(value)) {
					return 'Must be a valid email address'
				}
				return null
			},
		},
	})

	// Update form values when personnel changes
	useEffect(() => {
		if (personnel && form.values.personalId !== personnel.personalId) {
			form.setValues({
				personalId: personnel.personalId,
				fullName: personnel.fullName,
				email: personnel.email,
			})
		}
	}, [personnel])

	const handleSubmit = async (values: typeof form.values) => {
		if (!personnel) return

		updatePersonnelMutation.mutate(
			{
				id: personnel.id,
				personalId: values.personalId,
				fullName: values.fullName,
				email: values.email,
			},
			{
				onSuccess: () => {
					onClose()
					form.reset()
				},
			}
		)
	}

	// Reset form and close modal
	const handleClose = () => {
		form.reset()
		onClose()
	}

	return (
		<Modal opened={opened} onClose={handleClose} title='Edit Personnel' centered>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap='md'>
					<TextInput
						label='Personal ID'
						placeholder='Enter personal ID'
						withAsterisk
						key={form.key('personalId')}
						{...form.getInputProps('personalId')}
					/>
					<TextInput
						label='Full Name'
						placeholder='Enter full name'
						withAsterisk
						key={form.key('fullName')}
						{...form.getInputProps('fullName')}
					/>
					<TextInput
						label='Email'
						placeholder='Enter email address'
						withAsterisk
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
					<Button type='submit' fullWidth loading={updatePersonnelMutation.isPending}>
						Save Changes
					</Button>
					<Button
						variant='subtle'
						onClick={handleClose}
						fullWidth
						disabled={updatePersonnelMutation.isPending}
					>
						Cancel
					</Button>
				</Stack>
			</form>
		</Modal>
	)
}
