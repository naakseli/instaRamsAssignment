import { FactoryResponse } from '@insta/ramsbackend/src/types/api.type'
import { isValidIANATimezone } from '@insta/ramsbackend/src/utils/validation'
import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useUpdateFactory } from '../../api/factory/useUpdateFactory'

interface EditFactoryModalProps {
	opened: boolean
	onClose: () => void
	factory: FactoryResponse | null
}

export function EditFactoryModal({ opened, onClose, factory }: EditFactoryModalProps) {
	const updateFactoryMutation = useUpdateFactory()

	const form = useForm({
		initialValues: {
			name: '',
			timeZone: '',
		},
		validate: {
			name: value => (value.trim().length === 0 ? 'Name is required' : null),
			timeZone: value => {
				if (value.length === 0) {
					return 'Time zone is required'
				}
				if (!isValidIANATimezone(value)) {
					return 'Must be a valid IANA timezone identifier (e.g., Europe/Helsinki, America/New_York)'
				}
			},
		},
	})

	// Update form values when factory changes
	useEffect(() => {
		if (factory && form.values.name !== factory.name) {
			form.setValues({
				name: factory.name,
				timeZone: factory.timeZone,
			})
		}
	}, [factory])

	const handleSubmit = async (values: typeof form.values) => {
		if (!factory) return

		updateFactoryMutation.mutate(
			{
				id: factory.id,
				name: values.name,
				timeZone: values.timeZone,
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
		<Modal opened={opened} onClose={handleClose} title='Edit Factory' centered>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack gap='md'>
					<TextInput
						label='Factory Name'
						placeholder='Enter factory name'
						withAsterisk
						key={form.key('name')}
						{...form.getInputProps('name')}
					/>
					<TextInput
						label='Time Zone'
						placeholder='Enter time zone'
						withAsterisk
						key={form.key('timeZone')}
						{...form.getInputProps('timeZone')}
					/>
					<Button type='submit' fullWidth loading={updateFactoryMutation.isPending}>
						Save Changes
					</Button>
					<Button
						variant='subtle'
						onClick={handleClose}
						fullWidth
						disabled={updateFactoryMutation.isPending}
					>
						Cancel
					</Button>
				</Stack>
			</form>
		</Modal>
	)
}
