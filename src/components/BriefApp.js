import React,{Component} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './css/BriefApp.css'
import Grid from '@material-ui/core/Grid';
import Center from 'react-center-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNurse,faStar,faArrowDown } from '@fortawesome/free-solid-svg-icons'
class BriefApp extends Component{
    state={
        doctors:[],
        doctor:''
    }
    componentDidMount()
    {
        
       
    }
    handleRedirect()
    {
        window.location="/Doclist"
    }
    render()
    {
        return(
            
          <div>
           <div className="container">
               <Center><div className="welcome-home">WELCOME</div>
               <div className="col-lg-8">
                <div className="rating-hos">5 <FontAwesomeIcon icon={faStar} className="star-icon"/>Rating</div>  
               <img src={require('./img/hospital-logo.png')} className="hosp-logo"></img>
               <div className="HospName">
               <div className="HospDets">
                   NIZAR HOSPITAL
                  </div>
                  <div className="HospLoc">
                  Pattambi Rd, Vadakancheri, Valanchery, Kerala 676552
                  </div>
                 
               </div>

               </div>
               {/* <div className="row flow-1">
                   <div className="col-lg-8">
                   <FontAwesomeIcon icon={faUserNurse} className='icon' />
                   
                    Select the Doctor for Consultation
                   </div>
               </div>
               <div className='flowArrow'>
                   
                   <FontAwesomeIcon icon={faArrowDown} className="arrow" />

                   
                   </div>

               <div className="row flow-2">
               <div className="col-lg-8">
               Fill In your Details
               </div>
               </div>
               <div className='flowArrow'>
                   <FontAwesomeIcon icon={faArrowDown} className="arrow" />
                   </div>

               <div className="row flow-3">
               <div className="col-lg-8">
               Make Payment
                
               </div>
               </div>
               <div className='flowArrow'>
                   <FontAwesomeIcon icon={faArrowDown} className="arrow" />
                   </div>

               <div className="row flow-3">
               <div className="col-lg-8">
               Once the Payment is Done!!
               You will obtain a Zoom Link for Video Consultation
                
               </div>
               </div> */}
               </Center>
               </div>
               <Center>
               <div className="home-btn">
                   <Grid item xs={12} sm={6} className='submitButton'>
      <button type="submit" onClick={this.handleRedirect} className="btn btn-primary">BOOK APPOINTMENT</button>
      </Grid>
      
               </div>
               </Center>
             
               </div>
             
      
            
          
        )
    }
}
export default BriefApp