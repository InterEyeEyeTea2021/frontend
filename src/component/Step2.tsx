import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useAuth, registerForm } from '../hooks/Auth';

interface Props {
	address: string;
	productSold: string;
	contact: string;
	industryType: string;
  type: string;
  currentStep: number;

  handleChange: (e: any) => void;
}

export default function Step2({
	address,
	productSold,
	contact,
  industryType,
  type,
  currentStep,
  handleChange,
}: Props) {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (currentStep != 2) return null;
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
      <span className='label'> Address </span>
      <input
        name='address'
        placeholder={address}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Product Sold </span>
      <input
        name='productSold'
        placeholder={productSold}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Contact Number (WhatsApp) </span>
      <input
        name='contact'
        placeholder={contact}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Industry Type </span>
      <input
        name='industryType'
        placeholder={industryType}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}