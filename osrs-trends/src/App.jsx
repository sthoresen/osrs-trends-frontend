import '@src/App.css'
import Returns from '@pages/Returns/Returns'
import Trends from '@pages/Trends/Trends'
import About from '@pages/About/About'
import NavigationButtons from '@components/NavigationButtons/NavigationButtons'

import { Routes, Route} from "react-router-dom";

function App() {

    return (
        <section className="App">
            <NavigationButtons />
            <Routes>
                <Route path="/" element={<Trends />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </section>
    )
}

export default App
