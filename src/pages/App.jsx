import React, { useState, useEffect } from 'react'
import Layout from '../component/layout'
import { CardShort } from '../component/cards'
import axios from 'axios'

function App() {
  const [activity, setActivity] = useState([]);
  
  const handleCreateTodo = async (title, activity) => {
    try {
      await axios.post(
        'https://todo.api.devcode.gethired.id/activity-groups',
        { 
          title: title,
          activity_group_id: activity
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTitle('');
      setActivity('');
      // Reload the todo list
      const res = await axios.get('https://todo.api.devcode.gethired.id/activity-groups');
      setTodo(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      .then(res => {
        const updatedActivity = res.filter(item => item.id !== id);
        setActivity(updatedActivity);
      }).catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    axios.get('https://todo.api.devcode.gethired.id/activity-groups')
      .then(res => {
        setActivity(res.data.data)
      }).catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Layout>
      <section className="mt-5 d-flex align-items-center justify-content-between">
        <h5 className="fs-5 fw-bold" data-cy="activity-title">Activity</h5>
        <button className='btn btn-primary' onClick={()=>handleCreateTodo('Nambah baru nich', 1)} data-cy="activity-add-button">Tambah</button>
      </section>
      <section className="mt-5">
        <div className="row">
          {
            activity.map((item)=> {
            const createdAt = new Date(item.created_at);
            const createdAtDateOnly = createdAt.toLocaleDateString('id-ID');
            return (
              <div className="col-md-2 col-lg-3 mb-4" key={item.id}>
                <CardShort title={item.title} date={createdAtDateOnly} url={item.id} delete={()=>handleDelete(item.id)}/>
              </div>
            );})
          }
        </div>
      </section>
    </Layout>
  )
}

export default App