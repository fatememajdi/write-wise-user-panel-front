import { Inter, Lato } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
})

export const lato = Lato({
    subsets: ['latin'],
    weight: ['300', '400', '900'],
    variable: '--font-lato'
})