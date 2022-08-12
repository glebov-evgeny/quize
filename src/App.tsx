import {Route, Routes} from 'react-router-dom';
import {IntroPage} from './pages/IntroPage';
import {Header} from './components/Header';


function App() {
    return(
        <>
            <Header/>
            <main className='main'>
                <Routes>
                    <Route path='/' element={<IntroPage />} />
                </Routes>
            </main>
        </>
    )
}

export default App;