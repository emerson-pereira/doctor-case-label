import React from 'react';
import Case from '../Case';
import Conditions from '../Conditions';
import './Style.css';

function MainSection() {
  return (
    <main className="MainSection">
      <Case />
      <aside className='MainSection-Aside'>
        <Conditions />
        <section className='MainSection-NextButton'>
          <button>Next Case</button>
        </section>
      </aside>
    </main>
  );
}

export default MainSection;
