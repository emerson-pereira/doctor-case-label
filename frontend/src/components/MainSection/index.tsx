import React from 'react';
import Case from '../Case';
import Conditions from '../Conditions';
import './Style.css';

function MainSection() {
  return (
    <main className="MainSection">
      <Case />
      <Conditions />
    </main>
  );
}

export default MainSection;
