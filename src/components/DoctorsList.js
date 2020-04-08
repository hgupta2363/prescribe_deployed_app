import React,{Component} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './css/Doctor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserNurse,faArrowDown,faRupeeSign } from '@fortawesome/free-solid-svg-icons'


class DoctorsList extends Component{
    state={
        doctors:[],
        doctor:''
    }
    componentDidMount()
    {
        axios.get('https://finalbackendprscribe.herokuapp.com/getData').then(res=>{
                this.setState({
                    doctors:res.data,
                })
        })
        console.log(this.state.doctors)
    }
    render()
    {
        return(
            
       <div>
            <h1 className="heading center"><span className="indiv-D">D</span>octors Available</h1>
  
              <div className="container doc-grid">
               
                {
                    this.state.doctors.map((value,index)=>{
                        return (
                            
                            <Link to={'/PatientDets/'+value.doctorId+'/'+value.doctor+'/'+value.slot+'/'+value.fee} className="link"> 
                           
                           <Card style={{ width: '22rem' }} className="card">
                           <Card.Img variant="top" className="image_card" src={require('./img/doc-dp.jpg')} />
                                    <Card.Body>
                                    <Card.Title className="title">{value.doctor} </Card.Title>
                                    
                                    <Card.Text className="card-text">
                                        <span className="doc-post">{value.designation}</span>
                                        <br></br>
                                        <br></br>
                                    Timings: {value.slot} 
                                    <br></br>
                                    Fee:
                                    <FontAwesomeIcon icon={faRupeeSign} className='icon-rupee' /> {value.fee}
                                    </Card.Text>
                                    {(value.slot!='unavailable')?<Button type="submit" className="doc-button">Book Appointment</Button>:<Button className="disabled">Not Available</Button>}
                                    
                                        </Card.Body>
                                        </Card>
                          
                            </Link>
                            
                            )
                    })
                }
               
      
            </div>
            </div>
            
           
          
        )
    }
}
export default DoctorsList