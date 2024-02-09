import './App.css';
import React, { useState } from 'react';
function App() {
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [list,setList] = useState([]);
  const [isEditingId, setIsEditingId] = useState(null);
  const [updateTitle,setUpdateTitle] = useState('');
  const [updateDescription,setUpdateDescription] = useState('');

  const handleAddtasks = () =>{
    if (title.trim() !== '' && description.trim() !== ''){
      setList([...list,{id:Date.now(),Title:title,Description:description}]);
      console.log(list);
      setTitle('');
      setDescription('');
    }else{
      alert('enter the valid title and description');
    }
  };
  
  const handleEditClick = (inf0,inf1,inf2) => {
      setIsEditingId(inf0);
      setUpdateTitle(inf1);
      setUpdateDescription(inf2);
};

  const handleSaveClick = () =>{
      const updatelist = list.map(
        (item) =>{
          if (item.id === isEditingId){
            return {...item,Title: updateTitle,Description: updateDescription};
          }
          return item;
        }
      );
      setList(updatelist);
      setIsEditingId(null);
  }
  const handleDeleteClick = (taskid) => {
    const updatedTasks = list.filter(task => task.id !== taskid);
    setList(updatedTasks);
  }

  return (
    <div className='App'>
      <div className='container1'>
        <input type='text' value={title} className='title' placeholder='title' onChange={(e)=>setTitle(e.target.value)}/>
        <input type='text' value={description} className='description' placeholder='description' onChange={(e)=>setDescription(e.target.value)}/>
        <button className='add' onClick={handleAddtasks}>add</button>
      </div>

      <div className='container2' >
                {
                  list.map((item,index)=>{
                    return(
                      <>
                      {
                        isEditingId === item.id?(
                          <div key={index} className='card'>
                          <input className='title' 
                                type='text'
                                value={updateTitle}
                                placeholder='Title'
                                onChange={(e) => setUpdateTitle(e.target.value)} />
                          <input className='description'  
                                type='text'
                                value={updateDescription}
                                placeholder='Description'
                                onChange={(e) => setUpdateDescription(e.target.value)} />
                          <button onClick={handleSaveClick} className='button-17'>save</button>
                          </div>
                        ):(
                          <div key={item.id} className='card'onDoubleClick={() => handleEditClick(item.id,item.Title,item.Description)}>
                            <div className='stitle'>{item.Title}</div>
                            <div className='sdescription'>{item.Description}</div>
                            <button onClick={()=>handleDeleteClick(item.id)} className='button-17'><i class="fa-solid fa-trash-can"></i></button>
                          </div>
                        )
                      }
                      </>
                    )
                  })
                }
      </div>
    </div>
  );
}

export default App;