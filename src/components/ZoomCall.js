import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './css/Zoom.css'
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
     finalUrl:''
    }
  handleClick()
  {   const { location: { search } } = this.props;
      const values = queryString.parse(search);
      console.log(values.code)
      const token = Buffer.from(`${this.state.ClientId}:${this.state.ClientKey}`, 'utf8').toString('base64')
      console.log(token)
      axios.get(`https://finalbackendprscribe.herokuapp.com/Zoom_token/${values.code}/${token}`).then(res=>{
        if(res.data)
        {
          this.setState({
            Pid:localStorage.getItem('pid'),
            fee:localStorage.getItem('fee')
          })
          localStorage.setItem('url',res.data.join_url)
          window.location=`/Meeting_Booked/${this.state.Pid}/${this.state.fee}`
        }
        
        
        // axios.post(`http://localhost:5000/GetDets/${this.state.Pid}`,zoom).then(res=>{
        //   if(res.data)
        //   {
        //     this.setState({
        //       name:res.data.name,
        //       HospName:res.data.HospitalName,
        //       Slot:res.data.Slot,
        //       DocName:res.data.docName,
        //       Url:res.data.Zoom_link
        //     })
        //   }
         })
         
      
     
     
      
  }
  render()
  {
    return (
      <div className="diff-zoom-grid container">
      <React.Fragment>
      <Typography variant="h3" gutterBottom className="heading-text">
       ZoomCall Link
      </Typography>
      <Grid container spacing={3}>
        
        
        
        <Grid item xs={12} md={6}>
          <img src={require('./img/services/s4.png')} className="loading-sign"></img>
        </Grid>
        <Grid item xs={12} className="zoom-para">
        You will be Redirected please Wait.........
        </Grid>
      </Grid>
    </React.Fragment>
    {this.handleClick()}
    </div>
    );
  }
 
}
