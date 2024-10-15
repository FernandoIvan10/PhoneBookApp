import { IoIosContact } from "react-icons/io";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";
import { useState } from "react";

// Basic components of the app

// Component containing a label and an Input
export function Input(props){
    return(
        <div>
            <label>{props.label}</label>
            <input 
                id={props.id} 
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            ></input>
        </div>
    )
}

// Component containing a contact card
export function Contact(props){
    return(
        <div>
            <IoIosContact />
            <div>
                <strong>{props.name}</strong>
                <label>{props.phone}</label>
                <label>{props.description}</label>
            </div>
            <button onClick={props.deleteContact}><FaTrashAlt /></button>
            <button onClick={props.editContact}><FaUserEdit /></button>
        </div>
    )
}

// Component containing a edit contact card
export function EditContact(props){
    // Hooks that change a contact's data
    const [name, setName] = useState(props.name)
    const [phone, setPhone] = useState(props.phone)
    const [description, setDescription] = useState(props.description)

    // Method that set the new changes
    const handleSave = () => {
        const updatedContact={name, phone, description}
        props.saveChanges(updatedContact)
    }

    return(
        <div>
            <IoIosContact />
            <div>
                <input 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                ></input>
                <input 
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                ></input>
                <input 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}    
                ></input>
            </div>
            <button onClick={handleSave}><IoSaveSharp /></button>
        </div>
    )
}