import React, { useState, useEffect } from 'react'
import Layout from '../component/layout'
import { CardShort } from '../component/cards'
import axios from 'axios'

function App() {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateTodo = async (title, activity) => {
    try {
      setIsLoading(true);
      await axios.post(
        'https://todo.api.devcode.gethired.id/activity-groups',
        { 
          title: title,
          activity_group_id: activity,
          email: "shilla.ibra@gmail.com"
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTitle('');
      setActivity('');
      setIsLoading(false);
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
    const fetchActivity = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('https://todo.api.devcode.gethired.id/activity-groups?email=shilla.ibra@gmail.com');
        setActivity(res.data.data)
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchActivity();
    setInterval(fetchActivity, 100);
  }, []);

  return (
    <Layout>
      <section className="mt-5 d-flex align-items-center justify-content-between">
        <h5 className="fs-5 fw-bold" data-cy="activity-title">Activity</h5>
        <button className='btn btn-primary' onClick={()=>handleCreateTodo('Tambah baru', 1)} data-cy="activity-add-button">Tambah</button>
      </section>
      <section className="mt-5">
        <div className="row">
        {activity === null || activity === 0 ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise rotate mx-auto w-50 mt-4" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        ) : activity.length === 0 ? (
          <button className='border-0 bg-transparent w-50 mx-auto mt-4' onClick={()=>handleCreateTodo('Tambah baru', 1)} data-cy="activity-empty-state">
            <img className='w-50' src="/add.svg" alt="" />
          </button>
        ) : activity.length > 0 ? (
          activity.map((item) => {
            const createdAt = new Date(item.created_at);
            const createdAtDateOnly = createdAt.toLocaleDateString('id-ID');
            return (
              <div className="col-md-2 col-lg-3 mb-4" key={item.id}>
                <CardShort title={item.title} date={createdAtDateOnly} url={item.id} delete={() => handleDelete(item.id)} />
              </div>
            );
          })
        ):null}
        </div>
      </section>
    </Layout>
  )
}

export default App