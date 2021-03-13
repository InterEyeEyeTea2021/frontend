import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth, registerForm } from '../hooks/Auth';

interface Props {
  accountNumber: string;
  branchCode: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function Step3({
  accountNumber,
  branchCode,
  type,
  currentStep,
  handleNextSubmit,
}: Props) {
  let auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
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
    <form onSubmit={handleSubmit(handleNextSubmit)}>
      <span className='label'> Account Number </span>
      <input
        name='accountNumber'
        placeholder={accountNumber}
        ref={register({ required: false })}
      />

      <span className='label'> IFSC Code </span>
      <input
        name='branchCode'
        placeholder={branchCode}
        ref={register({ required: false })}
      />

      <input type='submit' value='Next' />
      <span> Steps: {currentStep}/3</span>
    </form>
  );
}
