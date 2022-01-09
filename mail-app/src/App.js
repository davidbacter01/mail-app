import './App.scss';
import Home from './components/home/Home';
import Servers from './components/servers/Servers';
import Email from './components/email/Email';
import Server from './components/server/Server';
import Navigation from './components/navigation/Navigation';
import { anonymousUserInfo, Login, UserInfo } from "./components/login/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

const userInfoStoreKey = 'userInfo'

let currentUser = anonymousUserInfo;
const storedUserInfoStr = sessionStorage.getItem(userInfoStoreKey);
if (storedUserInfoStr) {
    currentUser = JSON.parse(storedUserInfoStr)
}


const LINKS = [
    {
        "name": "Home",
        "to": "/"
    },
    {
        "name": "Email Servers",
        "to": "/servers"
    },
    {
        "name": "Email",
        "to": "/email"
    }
]
function App() {
    function requireAuth(nextState, replace, next) {
        if (!currentUser.id) {
            replace({
                pathname: "/login",
                state: {nextPathname: nextState.location.pathname}
            });
        }
        next();
    }
  return (
    <div className="App">
        <Navigation urls={LINKS}/>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/servers" element={<Servers/>} onEnter={requireAuth}>
                    <Route path=":serverId" element={<Server/>}/>
                </Route>
                <Route path="/email" element={<Email/>} onEnter={requireAuth}>

                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
