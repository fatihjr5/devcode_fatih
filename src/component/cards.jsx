import React from 'react'
import { Link } from 'react-router-dom'

export const CardShort = (props) => {
  return (
    <div className="card-wrapper">
      <Link to={`/detail/${props.url}`} className='text-decoration-none text-black' data-cy="activity_item">
        <div class="card bg-white position-relative">
          <div class="card-body">
            <h5 className="card-title" data-cy="activity-item-title">{props.title}</h5>
            <section className="mt-10">
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-6 mb-0" data-cy="activity-item-date">{props.date}</p>
              </div>
            </section>
          </div>
        </div>
      </Link>
      <button className='border-0 bg-transparent del-btn' data-cy="activity-item-delete-button" onClick={props.delete}>delete</button>
    </div>
  )
}

export const CardLong = () => {
  return (
    <div className='p-4 bg-white d-flex align-items-center justify-content-between shadow-lg mt-4'>
      <h5>dd</h5>
      <h5>dd</h5>
      <h5>dd</h5>
    </div>
  )
}
