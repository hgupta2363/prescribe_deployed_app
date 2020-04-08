import React ,{Component} from "react"
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import axios from 'axios'
import './css/navbar.css'



export default class Navbar extends Component{

    state={
        LoggedStatus:''
    }
    componentDidMount()
    {
        if(!localStorage.getItem('Logged'))
        this.setState({LoggedStatus:false})
        else
        this.setState({LoggedStatus:true})
    }
    onSubmit(e)
    {
        e.preventDefault();
        axios.post('http://localhost:5000/Logout').then(res=>{
            localStorage.removeItem('Logged');
            window.location='/Login';
        })
    }
    // Update()
    // {
    //
    // }
    render(){

        return(
            <div>
            <header>
                <div></div>
            
            <div></div>
            </header>
           
            </div>
        )
    }
}