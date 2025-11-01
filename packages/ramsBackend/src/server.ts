import cors from '@fastify/cors'
import Fastify from 'fastify'
import factoriesRouter from './routes/factoryRouter.js'
import personnelRouter from './routes/personnelRouter.js'

const fastify = Fastify({
	logger: true,
})

fastify.register(cors, {
	origin: true, // Allow all origins in development
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Add PUT and other methods you might need
})

fastify.register(personnelRouter, { prefix: '/personnel' })
fastify.register(factoriesRouter, { prefix: '/factories' })

fastify.listen({ port: 3000 }, function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	console.log(`Server is running on ${address}`)
})
