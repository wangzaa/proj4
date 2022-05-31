import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime update for document, collection, id as dependency
  useEffect(()=>{
    const ref = projectFirestore.collection(collection).doc(id)

    const unsub = ref.onSnapshot(snapshot => {
    // check doc exists
    if(snapshot.data()){
      setDocument({...snapshot.data(), id: snapshot.id})
      setError(null)
    }
     else {
       setError('no such document exists')
     } 
    }, err =>{
      setError('failed to get document')
    })
    // unsub on unmount
    return () => unsub();

  },[collection, id])

  return {document, error};
}

export default useDocument;