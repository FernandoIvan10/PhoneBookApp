import { Input } from "../components/basics/Basic";

// User can add new contact
export default function NewContactPage(){
    return (
        <>
            <Input 
                label="Name: " 
                id="contact-name" 
                placeholder="write a contact name"
                />
        </>
    )
}