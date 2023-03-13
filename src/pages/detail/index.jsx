import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Layout from '../../component/layout';
import { CardLong } from '../../component/cards';
import { AiOutlineEdit, AiOutlineLeft, AiOutlineSortAscending } from 'react-icons/ai'
import { TbArrowsUpDown } from 'react-icons/tb'
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { BsSortAlphaDownAlt } from 'react-icons/bs';

function Details() {
  const { id } = useParams();
  const [activity, setActivity] = useState('');
  const [title, setTitle] = useState([]);
  const [priority, setPriority] = useState('');
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  

  // UPDATE TITLE SETTINGS
  const handleEdit = () => {
    setEditMode(true);
    setNewTitle(activity.title);
  }

  const handleTitleChange = (newTitle) => {
    setNewTitle(newTitle);
  };

  const handleCreateTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleCreatePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleTitleBlur = () => {
    if (newTitle !== activity.title) {
      handleSubmit();
    }
  }

  const getDataActivity = () => {
    axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      .then(response => {
        setActivity(response.data);
      })
      .catch(error => {
        console.log(error);
    });
  }

  const getDataTodo = () => {
    axios.get(`https://todo.api.devcode.gethired.id/todo-items`)
      .then(response => {
        setTodo(response.data.data);
      })
      .catch(error => {
        console.log(error);
    });
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
  
  const handleDeleteTodo = (id) => {
    axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
      .then(res => {
        const updatedTodo = todo.filter(item => item.id !== id);
        setTodo(updatedTodo);
      }).catch(error => {
        console.error(error);
      });
  }
  
  
  useEffect(() => {
    getDataActivity()
    getDataTodo()
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
          <div className="dropdown">
            <button className='filter-btn' role="button" data-bs-toggle="dropdown" aria-expanded="false"><TbArrowsUpDown/></button>   
            <ul className="dropdown-menu">
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#" onClick={() => setSelectedFilter('latest')}><BiSortDown className='icons-set'/>Terbaru</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#" onClick={() => setSelectedFilter('oldest')}><BiSortUp className='icons-set'/>Terlama</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#" onClick={() => setSelectedFilter('az')}><AiOutlineSortAscending className='icons-set'/>A-Z</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#" onClick={() => setSelectedFilter('za')}><BsSortAlphaDownAlt className='icons-set'/>Z-A</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#" onClick={() => setSelectedFilter('unfinished')}><TbArrowsUpDown className='icons-set'/>Belum Selesai</a></li>
            </ul>
          </div>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <form>
                    <input type="text" value={title} onChange={handleCreateTitle} placeholder="New todo title"/>
                    <select value={priority} onChange={handleCreatePriority}>
                      <option value="">Select Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="very-high">Very High</option>
                    </select>
                    <button type="submit">Create</button>
                  </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        {selectedFilter === 'latest' && todo
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((item) => (
            <CardLong delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
          ))}       

        {selectedFilter === 'oldest' && todo
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((item) => (
            <CardLong delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
          ))}       

        {selectedFilter === 'az' && todo
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((item) => (
            <CardLong delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
          ))}       

        {selectedFilter === 'za' && todo
          .sort((a, b) => b.title.localeCompare(a.title))
          .map((item) => (
            <CardLong delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
          ))}       

        {selectedFilter === 'unfinished' && todo
          .filter((item) => !item.is_active)
          .map((item) => (
            <CardLong delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
          ))}       

        {!selectedFilter && todo.map((item) => (
          <CardLong delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
        ))}

      </Layout>
    </div>
  )
}

export default Details;