import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//Redux
import {Provider} from 'react-redux';
import './App.css';
import store from './store';
import Alert from './components/layout/Alert'
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile_forms/create_profile'
import EditProfile from './components/profile_forms/EditProfile'
import AddExperience from './components/profile_forms/AddExperience'
import AddEducation from './components/profile_forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'




//whenever the open is opened it should check that wheather or not it has a token 
if(localStorage.token){
  setAuthToken(localStorage.token);
}
//for adding functionality to the load user we must have import useEffect hook 
const App =()=>{
 useEffect(()=>{
   store.dispatch(loadUser())
 },[])
 
 return(
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar/> 
      <Route exact path="/" component={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/profiles' component={Profiles}/>
          <Route exact path='/profile/:id' component={Profile}/>
          <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          <PrivateRoute exact path='/create-profile' component={CreateProfile}/>
          <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
          <PrivateRoute exact path='/add-experience' component={AddExperience}/>
          <PrivateRoute exact path='/add-education' component={AddEducation}/>
          <PrivateRoute exact path='/posts' component={Posts}/>
          <PrivateRoute exact path='/posts/:id' component={Post}/>



        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
)};


export default App;
