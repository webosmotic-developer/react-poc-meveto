import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './App.css';
import RegistrationForm from "../src/register";

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <RegistrationForm/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
