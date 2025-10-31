import { PrismaClient } from '../generated/prisma/client'

export const prisma = new PrismaClient()

const main = async () => {
	await prisma.factory.create({
		data: {
			name: 'Factory 1',
			timeZone: 'UTC',
		},
	})
}

main().catch(e => {
	console.error(e)
})
