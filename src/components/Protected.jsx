import React, { Component } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'


function Protected(props) {

    const {Component} = props
    const navigate =  useNavigate();
    useEffect(() =>{
      let login = localStorage.getItem('login');
        if(!login){
            navigate('/admin')
		 }
    });


  return (

  <Component/>
  )
}

export default Protected