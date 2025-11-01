// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
import personnelRouter from './routers/personnelRouter.js'

const fastify = Fastify({
	logger: true,
})

fastify.register(personnelRouter, { prefix: '/personnel' })

fastify.listen({ port: 3000 }, function (err, address) {
	if (err) {
		fastify.log.error(err)
		process.exit(1)
	}
	console.log(`Server is running on ${address}`)
})
