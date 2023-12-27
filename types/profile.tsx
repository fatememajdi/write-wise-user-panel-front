export type Country = {
    commonName: string,
    id: string,
    officialName: string,
    flag: string
}

export type UserProfile = {
    firstName?: string,
    lastName?: string,
    email?: string,
    age?: number,
    gender?: string,
    profile?: string,
    token?: number,
    country: Country
}