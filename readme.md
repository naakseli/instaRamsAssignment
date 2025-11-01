# Resource Allocation Management System

A proof of concept (POC) for a cloud-based resource allocation management system. The system manages factory information, personnel data, and personnel reservations, providing an overview of resource allocation by factory and personnel.

## Technology Choices

### React
Since the frontend framework was not specified in the requirements, React was chosen for the UI. React's large ecosystem and extensive developer community ensure rapid development, easy maintenance, and availability of skilled developers for future work.

### Node.js
Node.js was chosen for the backend to enable the use of the same language (JavaScript/TypeScript) across both frontend and backend, which speeds up development and facilitates the utilization of full-stack developers. Node.js offers a rich ecosystem of packages and excellent TypeScript support, making it a practical choice for rapid POC development.

### Additional Technologies
- **Fastify**: Fastify offers excellent performance, built-in JSON schema validation, TypeScript support, and a plugin-based architecture that makes it ideal for building RESTful APIs in a POC environment
- **TypeScript**: Provides type safety across both frontend and backend, helping catch errors early during POC development and making the codebase more maintainable
- **Vite**: Modern build tool that offers instant server start and fast HMR, enabling rapid iteration cycles essential for POC development
- **Prisma**: Type-safe ORM for managing the database. It generates TypeScript types from the database schema, ensuring type consistency between the database and application code
- **pnpm**: Package manager chosen for its monorepo support. Efficiently manages shared dependencies across packages using hard linking, reducing disk space usage compared to npm or yarn