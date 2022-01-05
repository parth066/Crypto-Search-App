// import { Button } from '@mui/material'
import React from 'react'
import './Select.css'

const SelectButton = ({children, selected, onClick}) => {
    return (
        <span onClick={onClick} className='selectbutton' style={{ backgroundColor : selected ? "gold" : "", fontWeight: selected ? 700 : 500 }} >
        {children}
      </span>
    )
}

export default SelectButton
