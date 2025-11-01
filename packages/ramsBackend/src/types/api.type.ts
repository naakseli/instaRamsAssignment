// Use Prisma utility types internally to derive API response types
// based on what your queries actually return

// Derive API response types from Prisma query results
// This ensures type safety while keeping Prisma types internal

// Factory API response (from factoryRouter - no relations by default)
export type FactoryResponse = {
	id: string
	name: string
	timeZone: string
}

// Personnel API response (from personnelRouter with allRelations)
export type PersonnelResponse = {
	id: string
	personalId: string
	fullName: string
	email: string
}

// API request/body types
export type FactoryUpdateBody = {
	name: string
	timeZone: string
}

export type PersonnelCreateBody = {
	personalId: string
	fullName: string
	email: string
}

export type PersonnelUpdateBody = {
	personalId?: string
	fullName?: string
	email?: string
}

export type PersonnelAssignFactoriesBody = {
	factoryIds: string[]
}
