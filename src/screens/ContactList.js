import { useContext, useState } from "react";
import { Input } from "../components/basics/Basic";
import { Contact, EditContact } from "../components/contacts/Contact";
import { AppContext } from "../provider";
import { IoMdArrowRoundBack, IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import './../assets/styles/screens/ContactList.css'

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
                            className="div-target"
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
                            className="div-target"
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
        <div className="div-main">
            <div className="div-header">
                <h1>Phones</h1>
            </div>
            <div className="body">
            <div className="div-search">
            <Input className="input-search"
                    classNameLabel="input-search-label"
                    classNameInput="input-search-input"
                    id="search" 
                    type="text"
                    label="Search: " 
                    placeholder="write a contact name" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                <Link to="/new-contact">
                    <IoMdPersonAdd className="icon-add-contact"/>
                </Link>
            </div>
            <div>
            {generateList()}
            </div>
            </div>
        </div>
    )
}