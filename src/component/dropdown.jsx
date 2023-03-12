import React from 'react'
import { TbArrowsUpDown } from 'react-icons/tb'
import { AiOutlineSortAscending } from 'react-icons/ai'
import { BiSortDown,BiSortUp } from 'react-icons/bi'
import { BsSortAlphaDownAlt } from 'react-icons/bs'

function Dropdown() {
  return (
    <div>
        <div className="dropdown">
            <button className='filter-btn' role="button" data-bs-toggle="dropdown" aria-expanded="false"><TbArrowsUpDown/></button>   
            <ul className="dropdown-menu">
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#"><BiSortDown className='icons-set'/>Terbaru</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#"><BiSortUp className='icons-set'/>Terlama</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#"><AiOutlineSortAscending className='icons-set'/>A-Z</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#"><BsSortAlphaDownAlt className='icons-set'/>Z-A</a></li>
              <li><a className="dropdown-item gap-1 d-flex align-items-center" href="#"><TbArrowsUpDown className='icons-set'/>Belum Selesai</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Dropdown