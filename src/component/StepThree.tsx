import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useAuth, registerForm } from '../hooks/Auth';

interface Props {
  memberName: string;
  memberContact: string;
  memberAadhar: string;
  skill: string;
  type: string;
  currentStep: number;

  handleChange: (e: any) => void;
}

export default function StepThree({
  type,
  memberName,
  memberAadhar,
  memberContact,
  skill,
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
      <span className='label'> Member Name </span>
      <input
        name='memberName'
        placeholder={memberName}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Member Aadhar </span>
      <input
        name='memberAadhar'
        placeholder={memberAadhar}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Contact Number </span>
      <input
        name='memberContact'
        placeholder={memberContact}
        onChange={(e) => handleChange(e)}
      />

      <span className='label'> Skill </span>
      <input
        name='skill'
        placeholder={skill}
        onChange={(e) => handleChange(e)}
      />

      <input type='button' value='Add Member' />
    </>
  );
}
