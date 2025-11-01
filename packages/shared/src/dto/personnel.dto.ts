export type PersonnelDTO = {
	id: string
	personalId: string
	fullName: string
	email: string
}

// API request/body types

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
