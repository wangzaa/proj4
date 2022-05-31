import { useState } from 'react';

const filterList = ['ALL', 'ASSIGNED'];

const ProjectFilter = ({changeFilter}) => {
  const [currentFilter, setCurrentFilter] = useState('ALL')

  const handleClick = (newFilter)=>{
    changeFilter(newFilter)
  }

  return ( 
    <div className="project-filter">
      <nav>
        {filterList.map((f)=>
        <button key ={f}
          onClick = {()=> handleClick(f)}
          className = {currentFilter === f? 'active':''}
        >
          {f}
        </button>
        )}
      </nav>
    </div>
   );
}
 
export default ProjectFilter;