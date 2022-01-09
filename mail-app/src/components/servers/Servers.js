import "./Servers.scss";
import {useState, useEffect} from "react";
// import {useFetch} from "../../utils/use-fetch";
import Server from "../server/Server";
import AddServer from './AddServer';
import {API} from "../../utils/constants";

export default function Servers() {
    const [servers, setServers] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(()=>{
        fetch(`${API}/servers`)
            .then(response => response.json())
            .then((response) => {
                console.log("servers: ", response)
                setServers(response);
            })
    },[])

    function onSubmit(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(`${API}/servers`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("data after servers post: ", data);
                setServers([...servers, data])
            });
    }

    function onDelete(id) {
        const requestOptions = {
            method: "DELETE",
        }
        fetch(`${API}/servers/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("data after servers delete: ", data);
                setServers(servers.filter(s=>s.id!== id))
            });
    }

    return (
        <div className={"container"}>
            <button className={"button button-primary left"}
                    onClick={()=>setShowCreate(true)}>CREATE</button>
            <div>
                {
                    showCreate && <AddServer onSubmit={onSubmit} onAbort={()=>setShowCreate(false)}/>
                }
            </div>

            <div className={"servers-list"}>
                {!servers? "LOADING...": servers.map(server => <Server key={server.id}
                                                                       server={server}
                                                                       onDelete={onDelete}/>)}
            </div>
        </div>
    );
}