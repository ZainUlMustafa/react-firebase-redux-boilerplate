import React from 'react'
import { Route, Routes } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import Privacy from '../../general/Privacy';
import Terms from '../../general/Terms';

const GeneralController = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTES.MANUAL} element={<></>} />
        <Route path={ROUTES.CONTACT} element={<></>} />
        <Route path={ROUTES.PRIVACY_DATA} element={<Privacy/>} />
        <Route path={ROUTES.TERMS} element={<Terms/>} />
        <Route path={ROUTES.ABOUT} element={<></>} />
      </Routes>
    </div>
  );
}

export default GeneralController