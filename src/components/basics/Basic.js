// Basic components of the app
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