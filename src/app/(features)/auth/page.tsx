'use client'

import React, { useState } from 'react';
import { Login } from './components/Login/Login';
import { Register } from './components/Register';
import Button from '@/common/components/atoms/Button';


export default function Auth() {


  const [formType, setFormType] = useState('register')

  return (
    <>
    <Button onClick={() => setFormType('login')}>Switch Login</Button>
    <Button onClick={() => setFormType('register')}>Switch register</Button>

    { formType === 'login' ? <Login/> : <Register/> }

    </>
  )
};

