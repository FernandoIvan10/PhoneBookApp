// Route handler
import {BrowserRouter as Route, Routes} from 'react-router-dom'
import NewContactPage from '../pages/NewContact'
import ContactListPage from '../pages/ContactList'

export default function AppRoutes(){
    return(
        <Routes>
            <Route path='/new-contact' element={<NewContactPage/>}/>
            <Route path='/contact-list' element={<ContactListPage/>}/>
        </Routes>
    )
}