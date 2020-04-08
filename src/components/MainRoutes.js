import React from 'react'
import {BrowserRouter as Router,Route} from "react-router-dom";

import Navbar from './Navbar'
import "bootstrap/dist/css/bootstrap.min.css"

import DoctorsList from './DoctorsList'
import PatientDetail from './PatientDetail'
import ZoomCall from './ZoomCall'
import Payment from './Payment'
import BriefApp from './BriefApp'
import ConfirmBooking from './ConfirmBooking'

function MainRoutes()
{
    return(
        <Router>
            <Navbar/>
               <Route exact path="/" component={BriefApp}/>
                <Route exact path='/Doclist' component={DoctorsList}/>
                <Route path='/PatientDets/:id/:name/:slot/:fee' component={PatientDetail}/>
                <Route path='/payment_status' component={Payment}/>
                <Route path='/PaymentConfirmation' component={Payment}/>
                <Route path='/zoom_token' component={ZoomCall}/>
                <Route path='/Meeting_Booked/:pid/:fee' component={ConfirmBooking}/>
        </Router>
    )
}
export default MainRoutes