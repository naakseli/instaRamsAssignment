export type FactoryDTO = {
	id: string
	name: string
	timeZone: string
}

export type FactoryUpdateBody = {
	name?: string
	timeZone?: string
}
