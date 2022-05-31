import {Link} from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

//styles
import './Navbar.css';
import Logo from '../assets/x-files.png';

const Navbar = () => {
  const {logout, isPending} = useLogout();
  const {user} = useAuthContext();

  return ( 
    <div className="navbar">
      <ul>
        <li className="logo">
          <Link to = "/">
          <img src= {Logo} alt="logo" />
          <span>Files</span>
          </Link>
        </li>
        {!user && (
          <>
          <li><Link to ="/login">Login</Link></li>
          <li><Link to ="/signup">Signup</Link></li>
          </>
        )}
        {user && (
          <li>
            {!isPending && <button className="btn" onClick = {logout}>Logout</button>}
            {isPending && <button className="btn" disabled>Logging out</button>}
          </li>
        )}
      </ul>
    </div>
   );
}
 
export default Navbar;