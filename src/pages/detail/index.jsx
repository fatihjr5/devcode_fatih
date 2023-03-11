import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Layout from '../../component/layout';

function Details() {
  const [todo, setTodo] = useState([]);
  const [activity, setActivity] = useState([]);
  
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
            <h5>{todo.name}ddd</h5>
          </Layout>
        ) : ( 
          <div className='mt-5'>gada</div>
        )
      }
    </div>
  )
}

export default Details