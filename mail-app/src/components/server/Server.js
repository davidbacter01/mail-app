import "./Server.scss";
import {useState} from "react";
import {API} from "../../utils/constants";

export default function Server({server, onDelete}) {
    const [editMode, setEditMode] = useState(false);
    const [serverState, setServerState] = useState(server);
    const [formState, setFormState] = useState(server);

    function onCancel() {
        setEditMode(false);
        setFormState(serverState);
    }

    function handleDelete() {
        onDelete(serverState.id);
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        let formData = {
            "name": formState.name,
            "service": formState.service,
            "user": formState.user,
            "password": formState.password
        };
        const requestOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        fetch(`${API}/servers/${server.id}`, requestOptions)
            .then((res)=>res.json())
            .then((res)=>{
                console.log("res after post: ", res)
                if (res?.id) {
                    console.log("set edit mode");
                    setEditMode(false);
                    setServerState(res);
                }
            });
    }
    return (
        <>
            {
                editMode?
                    <form onSubmit={handleSubmit} className={"server-card"}>
                        <label>
                            Name:
                            <input type={"text"} value={formState.name}
                                   onChange={(e)=>setFormState({...formState,name:e.target.value})}/>
                        </label>
                        <label>
                            Service:
                            <input type={"text"} value={formState.service}
                                   onChange={(e)=>setFormState({...formState, service: e.target.value})}/>
                        </label>
                        <label>
                            Email:
                            <input type={"text"} value={formState.user}
                                   onChange={(e)=>setFormState({...formState, user: e.target.value})}/>
                        </label>
                        <label>
                            Password:
                            <input type={"password"} value={formState.password}
                                   onChange={(e)=>setFormState({...formState, password: e.target.value})}/>
                        </label>
                        <div className={"form-footer"}>
                            <button type={"submit"} className={"button button-success"}>SAVE</button>
                            <button className="button button-danger"
                                    onClick={onCancel}>CANCEL</button>
                        </div>
                    </form>:
                    <div className={"server-card"}>
                        <p>Name: {serverState.name}</p>
                        <p>Service: {serverState.service}</p>
                        <p>Email: {serverState.user}</p>
                        <p>Password: *****</p>
                        <div>
                            <button className="button button-primary"
                                    onClick={()=>setEditMode(true)}>EDIT</button>
                            <button className={"button button-danger"} onClick={handleDelete}>
                                DELETE
                            </button>
                        </div>
                    </div>
            }
        </>

    )
}