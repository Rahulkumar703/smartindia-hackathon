'use client'
import UserProvider from "./contexts/UserProvider"

export const Providers = ({ children }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
};