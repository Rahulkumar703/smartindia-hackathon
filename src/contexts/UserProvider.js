import { useEffect, useState } from 'react'
import UserContext from './UserContext'

function UserProvider({ children }) {

    const [user, setUser] = useState({
        id: null,
        name: null,
        userType: null
    });


    const getProfile = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        !user.id && getProfile();
    }, [user.id])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
