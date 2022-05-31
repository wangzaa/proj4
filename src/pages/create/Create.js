import {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';
import {useCollection} from '../../hooks/useCollection';
import {useAuthContext} from '../../hooks/useAuthContext';
import {useFirestore} from '../../hooks/useFirestore';


//styles
import './Create.css';

const categories = [
  { value: 'Abduction', label: 'Abduction' },
  { value: 'Disturbance', label: 'Disturbance' },
  { value: 'Sighting', label: 'Sighting' },
  { value: 'Murder', label: 'Murder' },
  { value: 'Other', label: 'Other' },
]

const Create = () => {
  const history = useHistory();
  const {addDocument, response} = useFirestore('projects');
  const {documents} = useCollection('users');
  const[users,setUsers] = useState([]);
  const {user} = useAuthContext();

  // form field values
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  // documents as dependency, refreshed when it is updated
  // map documents to users with value and label pairs
  useEffect(()=>{
    if(documents){
      const options = documents.map(user =>{
        return {value:user, label: user.displayName}
      })
      setUsers(options)
    }
  },[documents])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setFormError(null)

    if(!category){
      setFormError('Please select type of incident')
      return
    }
    if(assignedUsers.length<1){
      setFormError('Please assign agent')
      return
    }

    //current user logged-in is firebase object with 'uid' property
    const createdBy ={
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const assignedUsersList = assignedUsers.map((u)=>{
      return{
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    // create project object, check response, redirecto to dashboard
    const project = {
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      assignedUsersList,
      comments:[],
      createdBy
    }
    console.log(project);
    await addDocument(project)
    if(!response.error){
      history.push('/')
    }
  }


  return ( 
    <div className="create-form">
      <h2 className="page-title">
        FORM 302
      </h2>
      <form onSubmit ={handleSubmit}>
      <label>
        <span>Type of incident:</span>
        <Select
          onChange={(option)=>setCategory(option)}
          options = {categories}
        />
      </label>
      <label>
        <span>Available Evidence:</span>
        <textarea
          type = "text"
          onChange={(e)=> setDetails(e.target.value)}
          value = {details}
        ></textarea>
      </label>
      <label>
        <span>Date of Incident:</span>
        <input
          type = "date"
          onChange={(e)=> setDueDate(e.target.value)}
          value = {dueDate}
        />
      </label>
      <label>
        <span>Assign to:</span>
        <Select
          onChange={(option)=> setAssignedUsers(option)}
          options = {users}
          isMulti
        />
      </label>
      <button className="btn">Submit</button>
      {formError && <p className="error">{formError}</p>}
      </form>
    </div>
   );
}
 
export default Create;