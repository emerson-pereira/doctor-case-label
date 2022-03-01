import React from 'react';
import './Style.css';

function TopBar() {
  return (
    <section className="TopBar">
      <nav className='TopBar-Menu'>
        <span>John Doe</span>
        <span> | </span>
        <a href="#">Logout</a>
      </nav>
    </section>
  );
}

export default TopBar;
