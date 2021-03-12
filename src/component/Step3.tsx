import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useAuth, registerForm } from '../hooks/Auth';

interface Props {
  accountNumber: string;
  branchCode: string;
  type: string;
  currentStep: number;

  handleChange: (e: any) => void;
}

export default function Step3({
  accountNumber,
  branchCode,
  type,
  currentStep,
  handleChange,
}: Props) {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (currentStep != 3) return null;
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
      <span className='label'> Account Number </span>
      <input
        name='accountNumber'
        placeholder={accountNumber}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> IFSC Code </span>
      <input
        name='branchCode'
        placeholder={branchCode}
        onChange={(e) => handleChange(e)}
      />

      <input type='button' value='Add Member' />
    </>
  );
}
