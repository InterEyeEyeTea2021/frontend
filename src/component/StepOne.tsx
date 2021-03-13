import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth, registerForm } from '../hooks/Auth';

interface Props {
  name: string;
  username: string;
  phone: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function StepOne({
  name,
  username,
  phone,
  type,
  currentStep,
  handleNextSubmit,
}: Props) {
  let auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [current, setCurrent] = useState(type);

  const handleTypeChange = (s: any) => {
    setCurrent(s);
  };

  if (currentStep != 1) return null;
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
      <span className='label'> Name </span>
      <input
        name='name'
        placeholder={name}
        ref={register({ required: false })}
      />

      <span className='label'> Username </span>
      <input
        name='username'
        placeholder={username}
        ref={register({ required: false })}
      />

      <span className='label'> Phone Number </span>
      <input
        name='phone'
        placeholder={phone}
        ref={register({ required: false })}
      />

      <span className='label'> Type of User </span>
      <div className='types'>
        <div
          className={`type ${current == 'SHG' && 'current'}`}
          onClick={() => handleTypeChange('SHG')}
        >
          SHG
        </div>
        <div
          className={`type ${current == 'SME' && 'current'}`}
          onClick={() => handleTypeChange('SME')}
        >
          SME
        </div>
      </div>
      {/* <input
        name='type'
        placeholder={type}
        ref={register({ required: false })}
      /> */}

      <input type='submit' value='Next' />
      <span> Steps: {currentStep}/3</span>
    </form>
  );
}
