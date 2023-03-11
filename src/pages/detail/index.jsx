import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Layout from '../../component/layout';
import { CardLong } from '../../component/cards';
import { AiOutlineLeft } from 'react-icons/ai'

function Details() {
  const { id } = useParams(); // get the ID from the URL
  const [activity, setActivity] = useState({});
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
                <h5 className='mb-0'>{activity.title}</h5>
              </div>
            </div>
            <CardLong/>
      </Layout>
    </div>
  )
}

export default Details