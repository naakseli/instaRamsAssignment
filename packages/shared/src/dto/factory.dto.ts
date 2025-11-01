export type FactoryDTO = {
	id: string
	name: string
	timeZone: string
}

// API request/body types

export type FactoryUpdateBody = {
	name?: string
	timeZone?: string
}
