import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from 'react-bootstrap/Button';
import './css/Payment.css'
import axios from 'axios'

 class Payment extends Component {
   state={
     payment_data:"",
    
   }
   
    componentDidMount()
    {
        axios.get('https://finalbackendprscribe.herokuapp.com/payment_status').then(res=>{
                this.setState({payment_data:res.data})
                console.log(res.data)
        })
        
    }
    onSubmit(e)
    { e.preventDefault()
       axios.get('https://finalbackendprscribe.herokuapp.com/jwt').then(res=>{
        if(res.data)
        {
          const Pid=localStorage.getItem('pid');
          const fee=localStorage.getItem('fee');
            localStorage.setItem('url',res.data.join_url)
          window.location=`/Meeting_Booked/${Pid}/${fee}`
        }
       })
    }
   Renderstatus(){
      console.log("check")
      if(this.state.payment_data.status=="captured")
      {
  return( <div className="row">
  <div className="col-lg-8 payment-card">
      <div className="payment-grid">
      <div className="payment-dets">
            payment is successful
            </div>
    
      <div className="payment-dets">
          AMOUNT PAID:{Number(this.state.payment_data.amount)/100}
      </div>
      <div className="payment-dets">
          STATUS:{this.state.payment_data.status}
      </div>
      <div className="payment-dets">
          PAYMENT ID:{this.state.payment_data.id}
      </div>
      
      </div>
  
  </div>
  
  </div>)
      }
      else{
        return( <div className="row">
        <div className="col-lg-8 payment-card">
            <div className="payment-grid">
            <div className="payment-dets">
             payment is failed 
            </div>
            <div className="payment-dets">
                ORDER ID:{this.state.payment_data.order_id}
            </div>
        
            <div className="payment-dets">
                STATUS:{this.state.payment_data.status}
            </div>
           
            
            </div>
  
        </div>
  
    </div>)
      }
    }
  render()
  
  {
console.log(this.state.payment_data)
 
    return (
        <div>
       {this.Renderstatus()}
        <form onSubmit={this.onSubmit}>
        <div className='row'>
                        <button class="btn btn-primary" type="submit">Arrange Zoom Meeting</button>

        </div>
        </form>
        </div>
        

  );
}
}
export default Payment

