import Avatar from "../../components/Avatar"
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProjectSummary = ({project}) => {
  const {deleteDocument} = useFirestore('projects');
  const {user} = useAuthContext();

  const handleClick =(e) =>{
    deleteDocument(project.id)
  }
  return (
      <div>
        <div className="project-summary">
          <h2 className="page-title">{project.name}</h2>
          <p className="due-date">
            {project.category}
            <br/>
            Incident Date: {project.dueDate.toDate().toDateString()}
          </p>
          <p className="details">
            {project.details}
          </p>
          <p className="details"> Agent of Record:{project.createdBy.displayName}</p>
          <h4>Agents Assigned:</h4>
          <div className="assigned-users">
            {project.assignedUsersList.map(user => (
              <div key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            ))}
          </div>
          {user.uid === project.createdBy.id &&(
          <button className="btn" onClick = {handleClick}>CLOSE FILE</button>
          )}
        </div>
      </div>
    )
  }
 
export default ProjectSummary;
