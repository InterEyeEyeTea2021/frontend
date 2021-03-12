import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useAuth, registerForm } from '../hooks/Auth';

interface Props {
  nameSHG: string;
  productionCap: string;
  contact: string;
  type: string;
  orderSize: string;
  industryType: string;
  currentStep: number;

  handleChange: (e: any) => void;
}

export default function StepTwo({
  nameSHG,
  productionCap,
  orderSize,
  contact,
  type,
  industryType,
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
      <span className='label'> Name of SHG </span>
      <input
        name='nameSHG'
        placeholder={nameSHG}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Prodcution Capacity </span>
      <input
        name='productionCap'
        placeholder={productionCap}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Order Size </span>
      <input
        name='orderSize'
        placeholder={orderSize}
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
