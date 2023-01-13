import React from 'react'
import styled from "styled-components";
import CompaniesHalf from './components/CompaniesHalf';
import Employees from './components/Employees';
import {StyledFC} from "./_shared/types";


const App: StyledFC = ({className}) => {

  return (
    <div className={className}>
      <div className={'container'}>
      <CompaniesHalf />
      <Employees/>
      </div>
    </div>
  )
}


export default styled(App)`
  background-color: #D9D9D9;
  width: 100%;
  height: 100vh;
  
  .container {
    display: flex;
    justify-content: space-around;
  }
`
