import './App.scss';
import Home from './components/home/Home';
import Servers from './components/servers/Servers';
import Email from './components/email/Email';
import Server from './components/server/Server';
import Navigation from './components/navigation/Navigation';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
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
  return (
    <div className="App">
        <Navigation urls={LINKS}/>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/servers" element={<Servers/>}>
                    <Route path=":serverId" element={<Server/>}/>
                </Route>
                <Route path="/email" element={<Email/>}>

                </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
