import './Nav.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default props=>
<aside className="menu-area">
    <nav className="menu">
        <Link to="/">
            <i className="fa fa-home"></i>Inicio
        </Link>
        <Link to="/users"><i className="fa fa-users"></i> Funcionários </Link>
        <Link to="/cargos"><i className="fa fa-briefcase"></i> Cargos</Link>
    </nav>
   
</aside>