import { cookies } from 'next/headers'

export default function Page() {
    const cookieStore = cookies()
    return cookieStore.getAll().map((cookie) => (
        <div style={{margin:100}} key={cookie.name}>
            <p>Name: {cookie.name}</p>
            <p>Value: {cookie.value}</p>
        </div>
    ))
};