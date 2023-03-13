import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const CardShort = (props) => {
  return (
    <div className="card-wrapper">
      <Link to={`/detail/${props.url}`} className='text-decoration-none text-black' data-cy="activity_item">
        <div className="card bg-white position-relative">
          <div className="card-body">
            <h5 className="card-title" data-cy="activity-item-title">{props.title}</h5>
            <section className="mt-10">
              <div className="d-flex align-items-center justify-content-between">
                <p className="fs-6 mb-0" data-cy="activity-item-date">{props.date}</p>
              </div>
            </section>
          </div>
        </div>
      </Link>
      <button className='border-0 bg-transparent del-btn' data-bs-toggle="modal" data-bs-target="#exampleModal2" data-cy="activity-item-delete-button"><BsFillTrash3Fill /></button>
      <div className="modal" tabIndex="-1" id="exampleModal2">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <p className='text-center fs-3'>Apakah anda yakin menghapus <br /> <span className='fw-bold'>{props.title}</span>?</p>
            </div>
            <div className="d-flex align-items-center justify-content-center gap-2 pb-4">
              <button type="button" className="btn btn-secondary px-4 py-2 rounded-5" data-bs-dismiss="modal" data-cy="modal-delete-cancel-button">batal</button>
              <button type="button" className="btn btn-danger px-4 py-2 rounded-5" onClick={props.delete} data-cy="modal-delete-confirm-button">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CardLong = (props) => {
  return (
    <div className='p-4 bg-white d-flex align-items-center justify-content-between shadow-lg mt-4 rounded-4'>
      <div className="d-flex align-items-center gap-2">
        <input type="checkbox" name="" id="" />
        <h5 className='mb-0'>{props.priority}</h5>
        <h5 className='mb-0'>{props.title}</h5>
        <button className='border-0 bg-transparent' onClick={props.edit}><AiOutlineEdit/></button>
      </div>
      <button className='border-0 bg-transparent' data-bs-toggle="modal" data-bs-target="#exampleModal1"><BsFillTrash3Fill /></button>
      <div className="modal" tabIndex="-1" id="exampleModal1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <p>Are you sure to delete this?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={props.delete}>Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
