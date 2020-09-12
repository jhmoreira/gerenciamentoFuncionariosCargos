import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Home from '../components/home/Home'
import Funcionarios from '../components/funcionario/Funcionario'
import Cargo from '../components/cargo/Cargo'

export default props=>

<Switch>
<Route exact path='/' component={Home}/>
<Route path='/users' component={Funcionarios}/>
<Route path='/cargos' component={Cargo}/>
<Redirect from="*" to='/'/>    
</Switch>