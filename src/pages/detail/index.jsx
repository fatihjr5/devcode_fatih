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
  const [addTitle, setAddTitle] = useState('');
  const [addPriority, setAddPriority] = useState();
  const [activity_group_id, setActivityGroupId] = useState('3');
  const [newTitle, setNewTitle] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setIsLoading] = useState(false);
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
  // Create component
  const handleNameChange = (event) => {
    setAddTitle(event.target.value);
  };
  
  const handlePriorityChange = (event) => {
    setAddPriority(event.target.value);
  };
  
  const handleSubmitTodo = async () => {
    try {
      await axios.post(
        'https://todo.api.devcode.gethired.id/todo-items',
        { 
          title: addTitle,
          priority: addPriority,
          activity_group_id: activity_group_id
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setAddTitle('');
      setAddPriority('very-high');
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEditTodo = async () => {
    try {
      await axios.patch(
        `https://todo.api.devcode.gethired.id/todo-items/${id}`,
        { 
          title: addTitle,
          priority: addPriority,
          activity_group_id: activity_group_id
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setAddTitle('');
      setAddPriority('very-high');
    } catch (error) {
      console.log(error.response);
    }
  };
  
  const handleDeleteTodo = (id) => {
    axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${id}`)
      .then(res => {
        const updatedTodo = todo.filter(item => item.id !== id);
        setTodo(updatedTodo);
        setTimeout(() => {
          window.location.reload();
        }, 10);
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
              Tambah
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah List Item</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form className='d-flex flex-column gap-3'onSubmit={handleSubmitTodo}>
                      <section className="d-flex flex-column">
                        <span className='fs-6 fw-semibold mb-1'>NAMA LIST ITEM</span>
                        <input type="text" name="title" className="form-control" placeholder="Enter todo item" value={addTitle} onChange={handleNameChange}/>
                      </section>
                      <section className="d-flex flex-column">
                        <span className='fs-6 fw-semibold mb-1'>PRIORITY</span>
                        <select name="priority" className="form-select" aria-label="Select priority" value={addPriority} onChange={handlePriorityChange}>
                          <option value="very-high" className='d-flex align-items-center gap-2'>
                            {addPriority === 'very-high' && <div className="p-2 bg-danger rounded-pills"></div>}
                            <p className='mb-0'>Very High</p>
                          </option>
                          <option value="high" className='d-flex align-items-center gap-2'>
                            {addPriority === 'high' && <div className="p-2 bg-danger rounded-pills"></div>}
                            <p className='mb-0'>High</p>
                          </option>
                          <option value="medium" className='d-flex align-items-center gap-2'>
                            {addPriority === 'medium' && <div className="p-2 bg-danger rounded-pills"></div>}
                            <p className='mb-0'>Medium</p>
                          </option>
                          <option value="low" className='d-flex align-items-center gap-2'>
                            {addPriority === 'low' && <div className="p-2 bg-danger rounded-pills"></div>}
                            <p className='mb-0'>Low</p>
                          </option>
                          <option value="very-low" className='d-flex align-items-center gap-2'>
                            {addPriority === 'very-low' && <div className="p-2 bg-danger rounded-pills"></div>}
                            <p className='mb-0'>Very Low</p>
                          </option>
                        </select>
                      </section>
                      <button className='btn btn-primary w-25 ms-auto mt-2' type="submit">Simpan</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {todo === null || todo === 0 ? (
          <AiOutlineLoading3Quarters className="rotate"/>
        ) : todo.length === 0 ? (
          <button className='border-0 bg-transparent w-50 mx-auto mt-4' data-cy="activity-empty-state">
            <img className='w-50' src="/add.svg" alt="" />
          </button>
        ) : (
          selectedFilter === 'latest' && todo
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((item) => (
              <CardLong edit={()=>handleEditTodo(item.id)} priority={item.priority} delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
            ))
          )}
        {todo !== null && todo !== 0 && todo.length > 0 && selectedFilter === 'oldest' && (
          todo
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((item) => (
              <CardLong edit={()=>handleEditTodo(item.id)} priority={item.priority} delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
            ))
        )}
        {todo !== null && todo !== 0 && todo.length > 0 && selectedFilter === 'az' && (
          todo
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item) => (
              <CardLong edit={()=>handleEditTodo(item.id)} priority={item.priority} delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
            ))
        )}
        {todo !== null && todo !== 0 && todo.length > 0 && selectedFilter === 'za' && (
          todo
            .sort((a, b) => b.title.localeCompare(a.title))
            .map((item) => (
              <CardLong edit={()=>handleEditTodo(item.id)} priority={item.priority} delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
            ))
        )}
        {todo !== null && todo !== 0 && todo.length > 0 && selectedFilter === 'unfinished' && (
          todo
            .filter((item) => !item.is_active)
            .map((item) => (
              <CardLong edit={()=>handleEditTodo(item.id)} priority={item.priority} delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
            ))
        )}
        {todo !== null && todo !== 0 && todo.length > 0 && !selectedFilter && (
          todo.map((item) => (
            <CardLong edit={()=>handleEditTodo(item.id)} priority={item.priority} delete={()=>handleDeleteTodo(item.id)} key={item.id} title={item.title} />
          ))
        )}
      </Layout>
    </div>
  )
}

export default Details;