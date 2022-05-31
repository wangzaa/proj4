import {Link} from 'react-router-dom';
import Avatar from './Avatar';

//styles
import './ProjectList.css';

const ProjectList = ({projects}) => {
  return ( 
    <div className='project-list'>
      {projects.length === 0 && <p>No files!</p>}
      {projects.map(project =>(
        <Link to = {`/projects/${project.id}`} key = {project.id}>
          <h4>{project.category}</h4>
          <p>Date: {project.dueDate.toDate().toDateString()}</p>
          <p>{project.details}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map(user =>(
                <li key = {user.photoURL}>
                  <Avatar src ={user.photoURL}/>
                </li>
            ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
   );
}
 
export default ProjectList;