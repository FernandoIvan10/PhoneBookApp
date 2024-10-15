import { useContext, useState } from "react";
import { Contact, EditContact, Input } from "../components/basics/Basic";
import { MdPersonSearch } from "react-icons/md";
import { AppContext } from "../provider";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

// User can see his contact list
export default function ContactListPage(){
    // Parent context is obtained
    const { contacts, setContacts } = useContext(AppContext);
    // Function that deletes a contact
    const deleteContact=(id)=>{
        const contactsFiltered = contacts.filter((_,index) => index!==id)
        setContacts(contactsFiltered)
    }
    // Variable containing value of input search
    const [search, setSearch] = useState('')

    // Method that change isEditing value in a contact
    const editContact=(id)=>{
        // Saving changes to a new list
        const contactsAux = contacts.map((contact, index)=>{
            // Changing isEditing value in the contact
            if(index===id){
                return{...contact, isEditing: true}
            }
            return contact
        })
        // Set new list to Contacts
        setContacts(contactsAux)
    }
    
    // Method that save changes in the contact
    const saveChanges = (index, updatedContact) => {
        const updatedContacts = contacts.map((contact, id) => 
            id === index ? { ...contact, ...updatedContact, isEditing: false } : contact
        );
        setContacts(updatedContacts);
    }

    // method that generate a contact list
    const generateList = () => {
        return contacts
            .filter(contact => {
                //If the search is empty, it returns the full list.
                if (search === '') {
                    return true
                }
                //Return filtered list
                return contact.name.toLowerCase().startsWith(search.toLowerCase());
            })
            // Display contact list
            .map((contact, id) => {
                // Display the contact depending on the "isEditing" value
                if(contact.isEditing===false){
                    return (
                        <Contact 
                            key={id}
                            name={contact.name} 
                            phone={contact.phone} 
                            description={contact.description}
                            deleteContact={() => deleteContact(id)}
                            editContact={()=>editContact(id)}
                        />
                    )
                }else{
                    return(
                        <EditContact
                            key={id}
                            name={contact.name} 
                            phone={contact.phone} 
                            description={contact.description}
                            saveChanges={(updatedContact) => saveChanges(id,updatedContact)}/>
                    )
                }
                
            })
    }

    return(
        <>
            <Link to="/new-contact">
                <IoMdArrowRoundBack />
            </Link>
            <div>
                <Input 
                    id="search" 
                    type="text" 
                    placeholder="write a contact name" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                <button><MdPersonSearch /></button>
            </div>
            <h2>Phones</h2>
            <div>
            {generateList()}
            </div>
        </>
    )
}