import { useContext} from "react";
import { Input } from "../components/basics/Basic";
import { RiContactsBook3Fill } from "react-icons/ri";
import Provider, { AppContext } from "../provider";
import { Link } from "react-router-dom";

// User can add new contact
export default function NewContactPage(){
    // Parent context is obtained
    const { contact, setContact, contacts, setContacts } = useContext(AppContext);
    // method that saves a contact
    const saveHandler = ()=>{
        // All fields must be filled in
        if(!contact.name || !contact.phone || !contact.description){
            alert('Please, fill in all fields')
            return
        }
        // New contact is added to contacts
        setContacts([...contacts, {...contact,isEditing:false}]);
        alert('Contact saved successfully')
        // Form is cleared
        setContact({name:'',phone:'',description:''})
    }

    return (
        <>
            <div>
                <h1>Phone Book</h1>
                <Link to="/contact-list">
                    <RiContactsBook3Fill />
                </Link>
            </div>
            <div>
                <Input 
                    label="Name: " 
                    id="contact-name" 
                    type="text"
                    placeholder="write a contact name"
                    value={contact.name}
                    onChange={(e)=>setContact({...contact, name: e.target.value})}
                    />
                <Input
                    label="Phone: "
                    id="contact-phone" 
                    type="text"
                    placeholder="write a contact phone"
                    value={contact.phone}
                    onChange={(e)=>setContact({...contact, phone: e.target.value})}
                />
                <Input
                    label="Description: "
                    id="contact-description" 
                    type="text" 
                    placeholder="write a description"
                    value={contact.description}
                    onChange={(e)=>setContact({...contact, description: e.target.value})}
                />
            </div>
            <button id="button-save" onClick={saveHandler}>Save</button>
        </>
    )
}