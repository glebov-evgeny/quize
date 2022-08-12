import {Link} from 'react-router-dom';
const logo = require('../assets/img/header/home.png');

export function Header(){
    return (
        <header className='header'>
            <div className='container header__container'>
                <Link className='header__logo' to='/'>
                    <img className='header__logo-pic' src={logo} alt='logo' />
                </Link>
                <nav className='header__nav'>
                    {/*<Link className='header__nav-link' to='/'>Главная</Link>*/}
                    {/*<Link className='header__nav-link'  to='/info'>Информация</Link>*/}
                </nav>
            </div>
        </header>
    )
}