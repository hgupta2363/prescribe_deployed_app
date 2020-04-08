import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import './css/Patient.css'
import { getDefaultNormalizer } from '@testing-library/react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Center from 'react-center-tag'



 class AddressForm extends Component {
    constructor(props)
    {
        super(props)

    this.onChangeName=this.onChangeName.bind(this)
  
    this.onChangeAge=this.onChangeAge.bind(this)
    this.onChangePhone=this.onChangePhone.bind(this)
    // this.onChangeCity=this.onChangeCity.bind(this)
    this.onChangeSex=this.onChangeSex.bind(this)
    this.onChangeEmail=this.onChangeEmail.bind(this)
    this.onChangeAddress=this.onChangeAddress.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    this.state={
    
     name:'',
     age:'',
     phone:'',
    //  City:'',
     sex:'',
     address:'',
     email:'',
     docId:'',
    Alert:false,
    error:'',
    gender:["Male","Female"],
    fee:''
    //  Cities:[]
    }
    }

   
    onChangeName(e)
    {
        this.setState({name:e.target.value})
    }
 
    onChangeSex(e)
    {
        this.setState({
            sex:e.target.value
        })
    }
    onChangeAge(e)
    {
        this.setState({
            age:e.target.value
        })
    }
    // onChangeCity(e)
    // {
    //     this.setState({
    //         City:e.target.value
    //     })
    // }
    onChangePhone(e)
    {
        this.setState({
            phone:e.target.value
        })
    }
    onChangeEmail(e)
    {
        this.setState({
            email:e.target.value
        })
    }
    onChangeAddress(e)
    {
        this.setState({
        address:e.target.value
        })
    }
    onSubmit(e)
    {
        e.preventDefault();
        var id=window.location.pathname.split('/')
        const docId=id[2].replace(/%20/g, '')
        const docName=id[3].replace(/%20/g, '')
        const Slot=id[4].replace(/%20/g, '')
        this.setState({
          fee:id[5]
        })
        const email=this.state.email
        const phone =this.state.phone
        const name=this.state.fName+this.state.lName
        console.log(docId)
        const NewUser={
            name:this.state.name,
            age:this.state.age,
            sex:this.state.sex,
            email:this.state.email,
            phone:this.state.phone,
            address:this.state.address,
            docId:docId,
            docName:docName,
            Slot:Slot
          }
         
        console.log(NewUser)
        axios.post('https://finalbackendprscribe.herokuapp.com/patientDetail',NewUser).then(res=>{
        console.log(res.data)
        if(res.data.status)
          {
            localStorage.setItem('pid',res.data.PatientId)
            localStorage.setItem('fee',this.state.fee)
            window.location='https://finalbackendprscribe.herokuapp.com/payment/'+name+','+phone+','+email+','+docName+','+id[5]
            
          }
         
          console.log(res.data.status)
        })
       

    }
    updateField(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({ [name]: value });
    }
  
    

    render()
    {
    return (
        <div className="row patient">
            <div className="col-lg-6 patient-col">
    <React.Fragment>
      <Typography variant="h6" gutterBottom className="heading-Patient">
        <span className="indiv-P">P</span>atient Details
      </Typography>

      <form onSubmit={this.onSubmit} className="container">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            type="text"
            onKeyPress={event => (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)}
            name="Name"
            label="Name"
            fullWidth
            autoComplete="fname"
            value={this.state.Name}
            onChange={this.onChangeName}
          />
        </Grid>
       
        


        <Grid item xs={12} sm={10}>
          <TextField
          label="Phone Number"
          type="number"
          required="true"
          value={this.state.phone}
          onChange={this.onChangePhone}
          maxlength="10"
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
        }}
          fullWidth />
        </Grid>
   
        <input type="radio" className="radio-input" id="Male" name="gender" value="Male" checked={this.state.sex === "Male"} onChange={this.onChangeSex} required/>
        <label for="Male" >Male</label><br></br>
        <input type="radio"  className="radio-input" id="female" name="gender" value="Female" checked={this.state.sex === "Female"} onChange={this.onChangeSex} required/>
        <label for="female" >Female</label><br></br>
        <input type="radio" className="radio-input"  id="other" name="gender" value={this.state.sex} onChange={this.onChangeSex} required/>
        <label for="other">Other</label>
     
        <Grid item xs={12} sm={6}>
          <TextField
          className="form-input"
            required
            id=""
            name=""
            label="Age"
            type="number"

            fullWidth
            autoComplete=""
            value={this.state.age}
            onChange={this.onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
           className="form-input"
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="billing address-line1"
            value={this.state.address}
            onChange={this.onChangeAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          className="form-input"
            type="email"
            label="Email"
            fullWidth
            autoComplete=""
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
        <select value={this.state.sex} onChange={this.onChangeSex} required >
        <option value="">None</option>
        <option value="Male" >{this.state.gender[0]}</option>
        <option value="Female">{this.state.gender[1]}</option>
        </select>
            
          
        </Grid> */}
        <Grid item xs={12} sm={6}>
      <button type="submit" className="btn btn-primary">Submit</button>
      </Grid>
      </Grid>

    </form>

    </React.Fragment>
    </div>
    </div>
  )
 }
}
export default AddressForm
