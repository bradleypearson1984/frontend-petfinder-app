
import { login, logout } from '../firebase.js';
import {Link} from 'react-router-dom';



const Header = ({user}) => {
  return (
    <nav className='nav'>
        <Link to='/' className="headerDiv" >
            <div  >Pet Purpose App</div>
        </Link>
<ul>
    {user ? (
        <>
            <li className="welcome">Welcome, {user.displayName}</li>
            <li>
                <img className='google-profile-pic' src={user.photoURL} alt={user.displayName} />
               </li>
            <li className="buttonArea">
                <button className='logoutButton' onClick={logout}>Logout</button>
            </li>
        </>
    ) : (
        <li>
            <button className='loginButton'onClick={login}>Login</button>
        </li>
    )}
</ul>
</nav>
  )
}

export default Header;