import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'

import LandingPage from './Landingpage';
import Form from './Form';
import StudentList from './studentList';
import Search from './Search'
import StudentProfile from './studentprofile';
import Updatedata from './updatedata'

export default function Mainnavigation(props)
{
    return(
        <div>
            <Router>
                <div>
                    <Route path="/home" component={LandingPage} history={props.history} />
                    <Route path="/form" component={Form} history={props.history}/>
                    <Route path="/Studentlist" component={StudentList} history={props.history}/>
                    <Route path="/search" component={Search} history={props.history}/>
                    <Route path="/studentprofile" component={StudentProfile} history={props.history}/>
                    <Route path="/update" component={Updatedata} history={props.history}/>
                </div>
            </Router>
        </div>
    )
}