import './Navigation.scss';
import {Link} from "react-router-dom";

function Navigation({urls}) {
    return (
        <nav className="Navigation">
            <div className={"logo"}></div>
            <ul className="Navigation-links">
                {
                    urls.map(link => <a key={link.name} href={link.to}>{link.name}</a>)
                }
            </ul>
        </nav>
    );
}

export default Navigation;