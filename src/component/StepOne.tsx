import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useAuth, registerForm } from '../hooks/Auth';

interface Props {
	name: string;
	username: string;
	phone: string;
	type: string;
	currentStep: number;

	handleChange: (e: any) => void;
}

export default function StepOne({name, username, phone, type, currentStep, handleChange}: Props) {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

	if(currentStep != 1) return null;
  // const onSubmit = (data: registerForm) => {
  //   setIsLoading(true);
  //   // console.log("Submitted Form Data: ", data);

  //   auth?.register(data, (response: AxiosResponse) => {
  //     // console.log("registration succex");
  //     setIsLoading(false);

  //     if (response === undefined || response.status === 500)
  //       setMessage('Server is down, please try again later');
  //     else if (response.status === 200) setIsRegistered(true);
  //     else setMessage(response.data.message);
  //   });
  // };

  return (
    <>
      <span className='label'> Name </span>
      <input name='name' placeholder={name} onChange={(e) => handleChange(e)} />

      <span className='label'> Username </span>
      <input name='username' placeholder={username} onChange={(e) => handleChange(e)}/>

      <span className='label'> Phone Number </span>
      <input name='phone' placeholder={phone} onChange={(e) => handleChange(e)}/>
    </>
  );
}
