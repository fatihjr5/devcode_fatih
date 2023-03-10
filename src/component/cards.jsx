import React from 'react'
import { Link } from 'react-router-dom'

export const CardShort = (props) => {
  return (
    <>
        <Link to={`/detail/${props.url}`} className='text-decoration-none text-black'>
            <div class="card bg-white">
              <div class="card-body">
                <h5 className="card-title" data-cy="activity-item-title">{props.title}</h5>
                <section className="mt-10">
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="fs-6 mb-0" data-cy="activity-item-date">{props.date}</p>
                        <button className='border-0 bg-transparent z-3 position-absolute ms-5' data-cy="activity-item-delete-button" onClick={props.delete}>delete</button>
                    </div>
                </section>
              </div>
            </div>
        </Link>
    </>
  )
}

export const CardLong = () => {
  return (
    <div>cards</div>
  )
}
