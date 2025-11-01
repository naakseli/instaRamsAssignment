import { FastifyPluginAsync } from 'fastify'
import { prisma } from '../../prisma/prisma'
import { isValidIANATimezone } from '../../../shared/src/utils/timezoneValidation'

const factoriesRouter: FastifyPluginAsync = async fastify => {
	// GET all factories
	fastify.get('/', async (request, reply) => {
		const factories = await prisma.factory.findMany()
		return reply.send(factories)
	})

	// GET factory by ID
	fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
		const factory = await prisma.factory.findUnique({
			where: { id: request.params.id },
		})

		if (!factory) {
			return reply.status(404).send({ error: 'Factory not found' })
		}

		return reply.send(factory)
	})

	// update factory
	fastify.put<{ Params: { id: string }; Body: { name: string; timeZone: string } }>(
		'/:id',
		async (request, reply) => {
			const { id } = request.params
			const { name, timeZone } = request.body

			if (!name || !timeZone) {
				return reply.status(400).send({ error: 'Missing required fields: name, timeZone' })
			}

			if (!isValidIANATimezone(timeZone)) {
				return reply.status(400).send({
					error:
						'Invalid timezone. Must be a valid IANA timezone identifier (e.g., Europe/Helsinki, America/New_York)',
				})
			}

			const factory = await prisma.factory.update({
				where: { id },
				data: {
					name,
					timeZone,
				},
			})
			return reply.send(factory)
		}
	)
}

export default factoriesRouter
