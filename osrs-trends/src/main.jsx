import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@src/App.jsx'
import { BrowserRouter as Router } from "react-router-dom";
import '@src/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <h1 className="mainTitle" >Osrs-trends</h1>
        <div className="mainContainer">
            <React.StrictMode>
                <Router>
                    <App />
                </Router>
            </React.StrictMode>
        </div>
    </>

)
