import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Layout from '../../component/layout';
import { CardLong } from '../../component/cards';
import { AiOutlineEdit, AiOutlineLeft } from 'react-icons/ai'

function Details() {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // UPDATE TITLE SETTINGS
  const handleEdit = () => {
    setEditMode(true);
    setNewTitle(activity.title);
  }

  const handleTitleChange = (newTitle) => {
    setNewTitle(newTitle);
  };

  const handleTitleBlur = () => {
    if (newTitle !== activity.title) {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${id}`, 
      {
        title: newTitle
      }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        setActivity({ ...activity, title: newTitle });
        setEditMode(false);
        setTimeout(100);
      }).catch(error => {
        console.error('Error updating activity group:', error);
    });
  };  
  
  
  useEffect(() => {
    // make GET request to API with ID as parameter
    axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      .then(response => {
        setActivity(response.data);
      })
      .catch(error => {
        console.log(error);
    });
  }, [id]);
  
  return (
    <div>
      <Layout>
        <div className="d-flex align-items-center justify-content-between mt-4">
          <div className="d-flex align-items-center gap-2">
            <Link to="/">
              <AiOutlineLeft />
            </Link>
            {editMode ? (
              <input type="text" value={newTitle} onChange={(e) => handleTitleChange(e.target.value)} onBlur={handleTitleBlur} />
            ) : (
              <h5 className='mb-0'>{updateSuccess ? activity.title : activity.title ? activity.title : 'Loading...'}</h5>
            )}
            { editMode ? (
              <button onClick={handleSubmit}>Save</button>
            ) : (
              <button onClick={handleEdit}><AiOutlineEdit/></button>
            )}
          </div>
        </div>
        <CardLong/>
      </Layout>
    </div>
  )
}

export default Details;