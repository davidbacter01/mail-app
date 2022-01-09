import './Navigation.scss';
// import {Link} from "react-router-dom";

function Navigation({urls}) {
    return (
        <div className={"nav-bar"}>
            <nav className="Navigation container">
                <div className={"logo"}>
                    <img src={"/logos/App-logos_transparent.png"} alt={"logo"}/>
                </div>
                <ul className="Navigation-links">
                    {
                        urls.map(link =><li key={link.name}>
                            <a href={link.to}>{link.name}</a>
                        </li>)
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;