import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './css/Zoom.css'
import './css/confirm.css'
import {Link} from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string'

export default class Zoomcall extends Component{
  state={
     Name:'',
     HospName:'',
     DocName:'',
     Slot:'',
     Pname:'',
     ClientId:'bMuzuK72TOigchDSFxqNRA',
     ClientKey:'mYdUhLKE3CI22eRCsmgcl2NyuG4GZjPU',
     token:'',
     Url:'',
     Pid:'',
     fee:'',
     finalUrl:'',

     startSlot:'',
     startMins:'',
     endSlot:'',
     SlotArray:[]
    }
  componentDidMount()
  {  
    window.onload = function() {
      if(!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
      }
  }    
    var id=window.location.pathname.split('/')
        var child;
        const zoom={
            link:localStorage.getItem('url')}
         axios.post(`http://localhost:5000/GetDets/${id[2]}/${child}`,zoom).then(res=>{
          if(res.data.object)
          {
            this.setState({
              name:res.data.object.name,
              HospName:res.data.object.HospitalName,
              Slot:res.data.object.Slot,
              DocName:res.data.object.docName,
              Url:res.data.link,
              Token:res.data.childno,

            })
            var id1=this.state.Slot.split('-')
            var id2=id1[0].split(':')[0]
            id2=parseInt(id2);
            var id3=(this.state.Token*10)
            id3=parseInt(id3)
            if(id3>=60)
            {
              id2=id2+1;
              id3=id3%60;
            }
            this.setState({
              startSlot:id2,
              startMins:id3
            })
         
           
            console.log(this.state.startSlot)
            console.log(this.state.startMins)
            console.log(this.state.SlotArray)
            console.log(res.data.object)
          }
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phone: res.data.object.phone,
                name: res.data.object.name,
                hospital: res.data.object.HospitalName,
                doctor: res.data.object.docName,
                time:"9:00 - 12:00" ,
                zoom_link: res.data.link,
                type: "CONFIRMATION" //don't change this
            }),
          };
          console.log(requestOptions.body)
          fetch("https://prescribe-webapp.herokuapp.com", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
              

            }).catch(err=>{
                console.log(err)
            })
         
        })
        
    }
    handleClick()
    {
      window.location="/"
    }
  render()
  {
    return (
      <div className="zoom-grid container">
      <React.Fragment>
        <img src={require('./img/sign-check-icon.png')} className='confirm-logo'></img>
      <Typography variant="h4" gutterBottom className="confirm-header">
      Booking Confirmed !!
      </Typography>
      <Grid container spacing={3}>
        
        
        
        <Grid item xs={12} md={6}>
          <TextField
            required
          className="url-zoom"
            fullWidth
            value={this.state.Url}
          />
        </Grid>
        <Grid item xs={12} className="zoom-para">
          <div className="main-para">
        Dear <b>{this.state.name}</b> your appointment has been confirmed at <b>{this.state.HospName}</b> hospital with <b>{this.state.DocName}</b> at Approx <b>{this.state.startSlot}:{this.state.startMins}</b> hours. "
        Please install Zoom app using the below link for video consulting with your Doctor.
        <link/>
        Your Token Number is: <b>{this.state.Token}</b><br></br>
        </div>
        <button className="back-home btn btn-primary" onClick={this.handleClick}>Back to Home</button>

        <div className="seperate-para">
        Requesting you to follow the live status through whats-app by typing "STATUS"
        Kindly note that the doctor's availability and token order may vary to handle emergency cases.
        We will alert you once the Doctor is ready
        </div>
        
        </Grid>
      </Grid>
    </React.Fragment>
    </div>
    );
  }
 
}
