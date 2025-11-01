import { FastifyPluginAsync, FastifyReply } from 'fastify'
import { PrismaClient } from '../../prisma/generated/prisma/client'

const prisma = new PrismaClient()

const allRelations = {
	allocatableToFactories: true,
	reservations: true,
}

interface PersonnelCreateBody {
	personalId: string
	fullName: string
	email: string
}

interface PersonnelUpdateBody {
	personalId?: string
	fullName?: string
	email?: string
}

interface PrismaError extends Error {
	code?: string
	meta?: { target?: string[] }
}

const handlePrismaError = (error: PrismaError, reply: FastifyReply) => {
	if (error.code === 'P2025') {
		return reply.status(404).send({ error: 'Personnel not found' })
	}

	if (error.code === 'P2002') {
		const field = error.meta?.target?.[0]
		return reply.status(409).send({ error: `${field || 'Field'} must be unique` })
	}

	return reply.status(500).send({ error: 'Internal server error' })
}

const personnelRouter: FastifyPluginAsync = async fastify => {
	// GET all personnel
	fastify.get('/', async (request, reply) => {
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

		try {
			const personnel = await prisma.personnel.create({
				data: { personalId, fullName, email },
				include: allRelations,
			})

			return reply.status(201).send(personnel)
		} catch (error) {
			fastify.log.error(error)
			return handlePrismaError(error as PrismaError, reply)
		}
	})

	// PUT update personnel
	fastify.put<{
		Params: { id: string }
		Body: PersonnelUpdateBody
	}>('/:id', async (request, reply) => {
		try {
			const personnel = await prisma.personnel.update({
				where: { id: request.params.id },
				data: request.body,
				include: allRelations,
			})

			return reply.send(personnel)
		} catch (error) {
			fastify.log.error(error)
			return handlePrismaError(error as PrismaError, reply)
		}
	})

	// PUT /personnel/:id/factories
	fastify.put<{ Params: { id: string }; Body: { factoryIds: string[] } }>(
		'/:id/factories',
		async (request, reply) => {
			const { id } = request.params
			const { factoryIds } = request.body

			try {
				const personnel = await prisma.personnel.update({
					where: { id },
					data: { allocatableToFactories: { connect: factoryIds.map(id => ({ id })) } },
					include: allRelations,
				})
				return reply.send(personnel)
			} catch (error) {
				fastify.log.error(error)
				return handlePrismaError(error as PrismaError, reply)
			}
		}
	)
}

export default personnelRouter
