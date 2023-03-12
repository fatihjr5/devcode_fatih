import React, { useState, useEffect } from 'react'
import Layout from '../component/layout'
import { CardShort } from '../component/cards'
import axios from 'axios'
import { AiOutlineLoading3Quarters,AiOutlinePlus } from 'react-icons/ai'
function App() {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${id}`)
      .then(res => {
        const updatedActivity = activity.filter(item => item.id !== id);
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
        <button className='btn btn-primary d-flex align-items-center gap-1' onClick={()=>handleCreateTodo('Tambah baru', 1)} data-cy="activity-add-button">
          <AiOutlinePlus/>
          <span>tambah</span>
        </button>
      </section>
      <section className="mt-5">
        <div className="row">
        {activity === null || activity === 0 ? (
          <AiOutlineLoading3Quarters className="rotate"/>
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