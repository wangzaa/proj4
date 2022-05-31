import {NavLink} from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';

const Sidebar = () => {
  const {user} = useAuthContext();

  return ( 
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src ={user.photoURL}/>
          <p>GM Agent {user.displayName}</p>
          </div>
        <nav className='links'>
          <ul>
            <li>
              <NavLink exact to = "/">
                <img src= {DashboardIcon} alt="icon" />
                <span>OPEN FILES</span>
              </NavLink>
            </li>
            <li>
              <NavLink to = "/create">
                <img src= {AddIcon} alt="icon" />
                <span>FORM 302</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
   );
}
 
export default Sidebar;