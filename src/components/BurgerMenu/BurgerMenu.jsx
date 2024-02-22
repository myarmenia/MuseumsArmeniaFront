import React from 'react'
import './BurgerMenu.css'
import NavMenu from '../NavMenu/NavMenu'

function BurgerMenu() {
  return (
    <nav role="navigation" className='burger_menu'>
        <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            
            <NavMenu/>
        </div>
    </nav>
  )
}

export default BurgerMenu