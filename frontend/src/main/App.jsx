import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

import Logo from '../components/view/Logo'
import Nav from '../components/view/Nav'
import Footer from '../components/view/Footer'
import { BrowserRouter } from 'react-router-dom'
import Roteamento from './Rotas'

export default props=>
<BrowserRouter>
<div className="app">
    <Logo/>
    <Nav/>
   <Roteamento/>
    <Footer/>

</div>
</BrowserRouter>
