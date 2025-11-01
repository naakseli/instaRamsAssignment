import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '../../prisma/generated/prisma/client'
import type { PersonnelCreateBody, PersonnelResponse, PersonnelUpdateBody } from '../types/api.type'

const prisma = new PrismaClient()

const allRelations = {
	allocatableToFactories: true,
	reservations: true,
}

const personnelRouter: FastifyPluginAsync = async fastify => {
	// GET all personnel
	fastify.get<{ Reply: PersonnelResponse[] }>('/', async (request, reply) => {
		const personnel = await prisma.personnel.findMany({
			include: allRelations,
		})
		return reply.send(personnel)
	})

	// GET personnel by ID
	fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
		const personnel = await prisma.personnel.findUnique({
			where: { id: request.params.id },
			include: allRelations,
		})

		if (!personnel) {
			return reply.status(404).send({ error: 'Personnel not found' })
		}

		return reply.send(personnel)
	})

	// POST create new personnel
	fastify.post<{ Body: PersonnelCreateBody }>('/', async (request, reply) => {
		const { personalId, fullName, email } = request.body

		if (!personalId || !fullName || !email) {
			return reply.status(400).send({
				error: 'Missing required fields: personalId, fullName, email',
			})
		}

		const personnel = await prisma.personnel.create({
			data: { personalId, fullName, email },
			include: allRelations,
		})

		return reply.status(201).send(personnel)
	})

	// PUT update personnel
	fastify.put<{
		Params: { id: string }
		Body: PersonnelUpdateBody
	}>('/:id', async (request, reply) => {
		const personnel = await prisma.personnel.update({
			where: { id: request.params.id },
			data: request.body,
			include: allRelations,
		})

		return reply.send(personnel)
	})

	// PUT /personnel/:id/factories
	fastify.put<{ Params: { id: string }; Body: { factoryIds: string[] } }>(
		'/:id/factories',
		async (request, reply) => {
			const { id } = request.params
			const { factoryIds } = request.body

			const personnel = await prisma.personnel.update({
				where: { id },
				data: { allocatableToFactories: { connect: factoryIds.map(id => ({ id })) } },
				include: allRelations,
			})
			return reply.send(personnel)
		}
	)
}

export default personnelRouter
