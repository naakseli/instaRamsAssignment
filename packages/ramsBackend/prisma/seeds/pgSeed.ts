import { PrismaClient } from '../generated/prisma/client'

export const prisma = new PrismaClient()

const main = async () => {
	await prisma.factory.createMany({
		data: [
			{
				name: 'Kuminauha & Kärrynpyörät Oy',
				timeZone: 'Europe/Helsinki',
			},
			{
				name: 'Pulutehdas',
				timeZone: 'America/New_York',
			},
			{
				name: 'Sukkahousun sukkamarkkina yhdistys',
				timeZone: 'Asia/Tokyo',
			},
			{
				name: 'Tuppisuinen Tupakka Ab Oy',
				timeZone: 'Australia/Sydney',
			},
			{
				name: 'Koodarin Kooditehdas',
				timeZone: 'Europe/London',
			},
		],
	})

	await prisma.personnel.createMany({
		data: [
			{
				personalId: '1234567890',
				fullName: 'John Doe',
				email: 'john.doe@example.com',
			},
			{
				personalId: '1234567891',
				fullName: 'Jane Doe',
				email: 'jane.doe@example.com',
			},
			{
				personalId: '1234567892',
				fullName: 'Jim Doe',
				email: 'jim.doe@example.com',
			},
			{
				personalId: '1234567893',
				fullName: 'Jill Doe',
				email: 'jill.doe@example.com',
			},
		],
	})
}

main().catch(e => {
	console.error(e)
})
