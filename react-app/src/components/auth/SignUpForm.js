import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'
   
const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state?.session?.user);
  const dispatch = useDispatch();
  
  const onSignUp = async (e) => {  
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)  
      }
    }
    else {
      alert('Please Enter Matching Passwords!')  
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }
  
  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dash' />;
  }

  return (
    <div className="sign-up-page-container">
      <div className="sign-up-page">
        <div className="sign-up-form-container">
          <div className="sign-up-form-inner-container">
            <div className="sign-up-form-logo-container">
              <div className="sign-up-form-logo">
                <p>Sparrow</p>
              </div>
            </div>
            <div className="sign-up-top-elements">
              <div class="sign-up-top-main-title-container">
                <span class="sign-up-top-main-title">Make Your Money Move</span>
              </div>
              <div className="sign-up-top-message-outer-container">
                <div className="sign-up-top-message-inner-container">
                  <span className="sign-up-top-message">Sparrow lets you invest in companies you love, commission-free.</span>
                </div>
              </div>
            </div>
            <div>
              <div className="sign-up-directions-container">
                <span class="sign-up-directions">Please enter your full legal name. Your legal name should match any form of government ID.</span>
              </div>
              <form className="sign-up-form" onSubmit={onSignUp}>
                <div className="sign-up-first-last">
                  <div className="sign-up-first-name-container">
                    <input className="sign-up-first-name-input"
                      type='text'
                      name='first-name'
                      placeholder='First Name'
                      onChange={updateFirstName}
                      value={firstName}
                      required={true}
                    ></input>
                  </div>
                  <div className="sign-up-last-name-container">
                    <input className="sign-up-last-name-input"
                      type='text'
                      name='last-name'
                      placeholder='Last Name'
                      onChange={updateLastName}
                      value={lastName}
                      required={true}
                    ></input>
                  </div>
                </div>
                <div className="sign-up-form-email-container">
                  <div className="sign-up-form-email">
                    <input
                      className="sign-up-email-input"
                      type='text'
                      name='email'
                      placeholder='Email'
                      onChange={updateEmail}
                      value={email}
                      required={true}
                      type='email'
                    ></input>
                  </div>
                </div>
                <div className="sign-up-form-password-container">
                  <div className="sign-up-form-password">
                    <input
                      className="sign-up-password-input"
                      type='password'
                      name='password'
                      placeholder='Password'
                      onChange={updatePassword}
                      value={password}
                      required={true}
                    ></input>
                  </div>
                </div>
                <div className="sign-up-form-confirm-password-container">
                  <div className="sign-up-form-confirm-password">
                    <input
                      className="sign-up-confirm-password-input"
                      type='password'
                      name='repeat_password'
                      placeholder='Repeat Password'
                      onChange={updateRepeatPassword}
                      value={repeatPassword}
                      required={true}
                    ></input>
                  </div>
                </div>
                <div className="sign-up-form-button-outer-container">
                  <div className="sign-up-form-button-inner-container">
                    <div className={`sign-up-form-button-container`}>
                      <button className={`sign-up-form-button`} type='submit'>  
                        <span className="sign-up-form-button-inner-container">
                          <span className="sign-up-form-button-inner">
                            <span className="sign-up-form-button-label">Continue</span>
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="already-started-container">
                      <span className="already-started-text">Already started?</span>
                      <br></br>
                      <span className="already-started-text">
                        <a rel href='/login' className="already-started-link">Log in to complete your application</a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sign-up-errors">
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
              </form>
            </div>
            <div className="sign-up-disclosure-outer-container">
              <div className="sign-up-disclosure-middle-container">
                <div className="sign-up-disclosure-inner-container">
                  <div className="sign-up-disclosure-container">
                    <div className="sign-up-disclosure-statements">
                      All investments involve risk, including the possible loss of principal.
                      Investors should consider their investment objectives and risks carefully before investing.
                    </div>
                    <div className="sign-up-disclosure-statements">
                      Commission-free trading means $0 commission trading on self-directed individual cash or
                      margin brokerage accounts that trade U.S. listed securities via mobile devices or web.
                      Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees,
                      wire transfer fees, and paper statement fees may apply to your brokerage account.
                      Please see Sparrow Financial’s fee schedule to learn more.
                    </div>
                    <div className="sign-up-disclosure-statements">
                      Securities trading offered through Sparrow Financial LLC.
                      Brokerage clearing services offered through Sparrow Securities, LLC.
                      Both are subsidiaries of Sparrow Markets, Inc.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sign-up-sidebar">
          <div className="sign-up-sidebar-elements">
            <div className="sign-up-sidebar-element1">
              <span className="sign-up-sidebar-style1">Commission-free trading</span>
            </div>
            <div>
              <span className="sign-up-sidebar-style2">Break free from commission-fees and make unlimited commission-free trades in stocks, funds,
                and options with Sparrow Financial. Other fees may apply. View our fee schedule to learn more.</span>
            </div>
            <div className="sign-up-sidebar-element2">
              <span className="sign-up-sidebar-style1">Account Protection</span>
            </div>
            <div>
              <span className="sign-up-sidebar-style2">Robinhood Financial is a member of SIPC. Securities in your account protected up to $500,000.
                For details, please see www.sipc.org.</span>
            </div>
            <div className="sign-up-sidebar-element2">
              <span className="sign-up-sidebar-style1">Stay on top of your portfolio</span>
            </div>
            <div>
              <span className="sign-up-sidebar-style2">Set up customized news and notifications to stay on top of your assets as casually or as
                relentlessly as you like. Controlling the flow of info is up to you.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
