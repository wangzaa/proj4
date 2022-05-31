import {useCollection} from '../../hooks/useCollection';
import { useState } from "react";
import {useAuthContext} from '../../hooks/useAuthContext';
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

//styles
import './Dashboard.css';

const Dashboard = () => {
  const {user} = useAuthContext();
  const {documents, error} = useCollection('projects');
  const [filter, setFilter] = useState('ALL');
  
  const changeFilter = (newFilter) =>{
    setFilter(newFilter)
  }

  // check documents exist (tenary) and filter
  const projects = documents ? documents.filter(document=>{
    switch(filter){
      case 'ALL':
        return true
      case 'ASSIGNED':
        let assignedProject = false
        document.assignedUsersList.forEach((u)=>{
          if (u.id === user.uid){
            assignedProject = true
          }
        })
        return assignedProject
      default:
        return true
    }
  }) : null

  return ( 
    <div>
      <h2 className="page-title">OPEN FILES</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
      <ProjectFilter changeFilter = {changeFilter}/>
      )}
      {projects && <ProjectList projects = {projects}/>} 
    </div>
   );
}
 
export default Dashboard;