import React from 'react';
import Case from '../Case';
import Conditions from '../Conditions';
import './Style.css';

function MainSection() {
  return (
    <div className="MainSection">
      <Case />
      <Conditions />
    </div>
  );
}

export default MainSection;
