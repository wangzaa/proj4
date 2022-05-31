import {useState} from 'react';
import { useSignup } from '../../hooks/useSignup';

//styles
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const {signup, isPending, error} = useSignup();

const handleSubmit =(e)=>{
  e.preventDefault();
  signup(email, password, displayName, thumbnail);
}

const handleFileChange = (e) =>{
  setThumbnail(null)
  let selected = e.target.files[0]

  if(!selected){
    setThumbnailError('Please select a file')
    return
  }
  if(!selected.type.includes('image')){
    setThumbnailError('File must be an image')
    return
  }
  if(selected.size>1000000){
    setThumbnailError('File size is too large')
    return
  }

setThumbnailError(null);
setThumbnail(selected);
}


  return ( 
    <form onSubmit ={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type = "email"
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type = "password"
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
        <label>
        <span>Agent Name:</span>
        <input
          type = "text"
          onChange={(e)=> setDisplayName(e.target.value)}
          value={displayName}
          required
        />
      </label>
      <label>
        <span>Picture:</span>
        <input
          type = "file"
          onChange ={handleFileChange}
          required
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
        {!isPending && <button className="btn">Sign Up</button>}
        {isPending && <button className="btn" disabled>Loading...</button>}
        {error &&  <div className="error">{error}</div>}
    </form>
   );
}
 
export default Signup;