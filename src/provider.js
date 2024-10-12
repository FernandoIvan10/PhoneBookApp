import { createContext, useState } from 'react';

// Context is created
export const AppContext = createContext()

// Context provider is created
export const Provider = ({ children }) => {
    //Status hook that stores a contact
    const [contact, setContact] = useState({
        name: '',
        phone: '',
        description: ''
    })
    //Status hook that stores a contact list
    const [contacts, setContacts] = useState([])

    return (
        // Hooks are shared with children
        <AppContext.Provider value={{ contact, setContact, contacts, setContacts }}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider