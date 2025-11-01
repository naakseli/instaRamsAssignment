// Helper function to validate IANA timezone identifier
export const isValidIANATimezone = (timezone: string): boolean => {
	try {
		Intl.DateTimeFormat(undefined, { timeZone: timezone })
		return true
	} catch {
		return false
	}
}
