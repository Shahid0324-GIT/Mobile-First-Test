import {Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
  </Switch>
)

export default App
