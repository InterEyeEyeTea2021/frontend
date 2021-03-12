import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useAuth, registerForm } from '../hooks/Auth';
import StepOne from '../component/StepOne';
import { stat } from 'node:fs';
import StepTwo from '../component/StepTwo';
import StepThree from '../component/StepThree';
import Step2 from '../component/Step2';
import Step3 from '../component/Step3';

function Register() {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [state, setState] = useState({
    name: 'Name',
    username: 'Username',
    phone: '+91 XXXX XX XXXX',
    type: 'SHG',
    nameSHG: 'Name of SHG',
    productionCap: 'Production Capacity',
    orderSize: 'Order Size',
    contactSHG: '+91 XXXX XX XXXX',
    industryTypeSHG: '',
    members: 'No members added yet',
    memberName: 'Name',
    memberAadhar: 'Aadhar',
    memberContact: '+91 XXXX XX XXXX',
    skill: '',

    address: 'Address',
    productSold: 'Products Sold',
    contactSME: '+91 XXXX XX XXXX',
    industryTypeSME: '',
    accountNumber: 'Account Number',
    branchCode: 'IFSC Code',
  });

  const [step, setStep] = useState(1);

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

  const handleChange = (e: any) => {
    const { Name, Username, Phone, Type, NameSHG, ProdcutionCap } = e.target;

    setState((prev) => ({
      ...prev,
      name: Name,
      username: Username,
      phone: Phone,
      type: Type,
      nameSHG: NameSHG,
      productionCap: ProdcutionCap,
    }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className='authform register'>
      <div className='form'>
        <h1>Signup</h1>
        <div className='error'>{message}</div>
        <form>
          <StepOne
            name={state.name}
            username={state.username}
            phone={state.phone}
            type={state.type}
            currentStep={step}
            handleChange={handleChange}
          />

          {state.type === 'SHG' ? (
            <>
              <StepTwo
                nameSHG={state.nameSHG}
                productionCap={state.productionCap}
                orderSize={state.orderSize}
                contact={state.contactSHG}
                industryType={state.industryTypeSHG}
                type={state.type}
                currentStep={step}
                handleChange={handleChange}
              />

              <StepThree
                members={state.members}
                memberName={state.memberName}
                memberAadhar={state.memberAadhar}
                memberContact={state.memberContact}
                skill={state.skill}
                type={state.type}
                currentStep={step}
                handleChange={handleChange}
              />
            </>
          ) : (
            ''
          )}

          {state.type === 'SME' ? (
            <>
              <Step2
                address={state.address}
                productSold={state.productSold}
                contact={state.contactSME}
                industryType={state.industryTypeSME}
                type={state.type}
                currentStep={step}
                handleChange={handleChange}
              />

              <Step3
                accountNumber={state.accountNumber}
                branchCode={state.branchCode}
                type={state.type}
                currentStep={step}
                handleChange={handleChange}
              />
            </>
          ) : (
            ''
          )}

          {step < 4 ? (
            <>
              <input type='button' value='Next' onClick={handleNext} />
              <span>{step}/3</span>
            </>
          ) : (
            ''
          )}

          {step > 1 && step < 4 ? (
            <input
              type='button'
              className='back'
              value='Back'
              onClick={handleBack}
            />
          ) : (
            ''
          )}

          {step === 4 ? (
            <input type='submit' value='Verify' onClick={handleNext} />
          ) : (
            ''
          )}

          <hr />
          <span>If you have an account, please login</span>
          <a className='button' href='/login' rel='noreferrer noopener'>
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default Register;
