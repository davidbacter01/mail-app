import "./Servers.scss";

import {useState} from "react";

export default function AddServer({onSubmit, onAbort}) {
    const [formState, setFormState] = useState({});
    function onCancel() {
        setFormState({});
        onAbort();
    }

    function handleSubmit() {
        const data = {
            "name": formState.name,
            "service": formState.service,
            "user": formState.user,
            "password": formState.password
        };
        onSubmit(data);
    }

    return (
        <div className={"add-server-container"}>
            <form className={"add-server server-card"} onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type={"text"} value={formState.name? formState.name: ""}
                           onChange={(e)=>setFormState({...formState,name:e.target.value})}/>
                </label>
                <label>
                    Service:
                    <input type={"text"} value={formState.service? formState.service: ""}
                           onChange={(e)=>setFormState({...formState, service: e.target.value})}/>
                </label>
                <label>
                    Email:
                    <input type={"text"} value={formState.user? formState.user: ""}
                           onChange={(e)=>setFormState({...formState, user: e.target.value})}/>
                </label>
                <label>
                    Password:
                    <input type={"password"} value={formState.password? formState.password: ""}
                           onChange={(e)=>setFormState({...formState, password: e.target.value})}/>
                </label>
                <div className={"form-footer"}>
                    <button type={"submit"} className={"button button-success"}>SAVE</button>
                    <button className="button button-danger"
                            onClick={onCancel}>CANCEL</button>
                </div>
            </form>
        </div>
    )
}