/* eslint-disable eqeqeq */

import './App.css'
import './media.css'
import logo from './images/logo.svg'
import { useState, useEffect, useRef } from 'react'

function App() {

  const billref = useRef();
  const tipperref = useRef();
  const peopleref = useRef();
  const [billAmount, setbillAmount] = useState(0);
  const [tipPercentage, settipPercentage] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [noPeople, setNoPeople] = useState(0);
  const [isActive, setisActive] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const [isDisabled, setisDisabled] = useState(true);

  const validate = (e) => {
    if(e.target.value === '0' || e.target.value === '') {
      setIsValid(false)
      setNoPeople(0)
    }
    else{
      setIsValid(true)
      setNoPeople(parseInt(e.target.value))
    }
  }

  const change = (e) => {
    setisDisabled(false)
    if(e.target.name === 'bill'){
      if(e.target.value === ''){
        setbillAmount(0)
      }
      else{
        setbillAmount(parseInt(e.target.value))
      }
    }
    if(e.target.name === 'tippercent'){
      if(e.target.value === ''){
        settipPercentage(0)
      }
      else{
        settipPercentage(parseInt(e.target.value))
      }
    }

  }

  const tipbtnclick = (e) => {
    settipPercentage(parseInt(e.target.getAttribute("data-percent")))
    setisActive(parseInt(e.target.getAttribute("data-percent")))
    tipperref.current.value=''
  }

  const reset = (e) => {
    billref.current.value=''
    peopleref.current.value=''
    tipperref.current.value=''
    setbillAmount(0)
    setNoPeople(0)
    settipPercentage(0)
    setisDisabled(true)
  }

  useEffect(() => {
    const tip = (billAmount * tipPercentage)/100;
    setTipAmount(tip)
  }, [billAmount, tipPercentage, noPeople]);

  return (
    <div className="App">
      <header>
        <h1>
          <img src={logo} alt="spliter logo" />
        </h1>
      </header>
      <main className='calculator__container'>
        <div className='input'>

          <div className='bill__container'> 
              <div className='label_wrapper'>
                <label htmlFor='bill'>Bill</label>
              </div>
              <div className='input_wrapper'>
                <input
                  className='bill_input'
                  type="number"
                  ref={billref}
                  name='bill'
                  placeholder='0'
                  onChange={change}
                />
              </div>
          </div>
          <div className='tip__container'>
            <div className='label_wrapper'>
              <label htmlFor='tippercent'>Select Tip %</label>
            </div>
            <div className='tip_input_wrapper'>
              <div className={isActive === 5 ? 'tip_btn active' : 'tip_btn'} data-percent={5} onClick={tipbtnclick}>5%</div>
              <div className={isActive === 10 ? 'tip_btn active' : 'tip_btn'} data-percent={10} onClick={tipbtnclick}>10%</div>
              <div className={isActive === 15 ? 'tip_btn active' : 'tip_btn'} data-percent={15} onClick={tipbtnclick}>15%</div>
              <div className={isActive === 25 ? 'tip_btn active' : 'tip_btn'} data-percent={25} onClick={tipbtnclick}>25%</div>
              <div className={isActive === 50 ? 'tip_btn active' : 'tip_btn'} data-percent={50} onClick={tipbtnclick}>50%</div>
              <input
                className='tip_input'
                type="number"
                ref={tipperref}
                name='tippercent'
                placeholder='Custom'
                onChange={change}
                onClick={() => setisActive(0)}
              />
            </div>
          </div>
          <div className='total_people__container'>
            <div className='label_wrapper'>
              <label htmlFor='noOfPeople'>Number of People <span className={isValid ?'hidden' :'validation'}>can't be zero</span></label>
            </div>
              <div className='input_wrapper'>
                <input 
                  className={isValid ?  'people_input' : 'people_input invalid_input'}
                  type="number"
                  ref={peopleref}
                  name='noOfPeople'
                  placeholder='0' 
                  onChange={validate}
                />
              </div>
          </div>
        </div>

        <div className='output'>
          <div className='info_wrapper'>
            <div className='tip_perperson_wrapper'>
              <div className='tip_left'>
                <h4>
                  Tip Amount
                </h4>
                <h5>
                  / person
                </h5>
              </div>
              <span className='tip_right'>${billAmount !== '' && noPeople > 0 ? (tipAmount/noPeople).toFixed(2) : '0.00'}</span>
            </div>
            <div className='total_perperson_wrapper'>
              <div className='total_left'>
                <h4>
                  Total
                </h4>
                <h5>
                  / person
                </h5>
              </div>
              <span className='total_right'>${billAmount !== '' && noPeople > 0 ? ((billAmount+tipAmount)/noPeople).toFixed(2) : '0.00'}</span>
            </div>
          </div>
          <div className='reset_btn_wrapper'>
            <button className='reset_btn' disabled={isDisabled} onClick={reset}>
              RESET
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
