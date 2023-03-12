import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Layout from '../../component/layout';
import { CardLong } from '../../component/cards';
import { AiOutlineEdit, AiOutlineLeft } from 'react-icons/ai'
import { TbArrowsUpDown } from 'react-icons/tb'

function Details() {
  const { id } = useParams();
  const [activity, setActivity] = useState({});
  const [todo, setTodo] = useState([]);
  const [priority, setPriority] = useState([]);
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
    axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${id}`, 
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
    axios.get(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
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
          {/* Left */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/">
              <AiOutlineLeft />
            </Link>
            {editMode ? (
              <input type="text" className='border-b' value={newTitle} onChange={(e) => handleTitleChange(e.target.value)} onBlur={handleTitleBlur} />
            ) : (
              <h5 className='mb-0'>{updateSuccess ? activity.title : activity.title ? activity.title : 'Loading...'}</h5>
            )}
            { editMode ? (
              null
            ) : (
              <button onClick={handleEdit} className='border-0 bg-transparent'><AiOutlineEdit/></button>
            )}
          </div>
          {/* Right */}
          <div className="d-flex align-items-center gap-2">
            <button className='filter-btn'><TbArrowsUpDown/></button>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ...
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardLong/>
      </Layout>
    </div>
  )
}

export default Details;