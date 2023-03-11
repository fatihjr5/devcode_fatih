import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Layout from '../../component/layout';
import { CardLong } from '../../component/cards';

function Details() {
  const [todo, setTodo] = useState([]);
  
  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`)
      .then(response => {
        setTodo(response.data);
      })
      .catch(error => {
        console.log(error);
    });
  }, [id]);

  return (
    <div>
      {
        todo ? (
          <Layout>
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div className="d-flex align-items-center gap-2">
                <Link to="/">Back</Link>
                <h5 className='mb-0'>{todo.name}ddd</h5>
              </div>
            </div>
            <CardLong/>
          </Layout>
        ) : ( 
          <div className='mt-5'>gada</div>
        )
      }
    </div>
  )
}

export default Details