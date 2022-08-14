import {Route, Routes} from 'react-router-dom';
import {Header} from './components/Header';
import {IntroPage} from './pages/IntroPage';
import {LoginPage} from './pages/LoginPage';
import {RegistrationPage} from './pages/RegistrationPage';


function App() {
    return(
        <>
            <Header/>
            <main className='main'>
                <Routes>
                    <Route path='/' element={<IntroPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/registration' element={<RegistrationPage />} />
                </Routes>
            </main>
        </>
    )
}

export default App;