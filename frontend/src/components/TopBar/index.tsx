import React from 'react';
import './Style.css';

function TopBar() {
  return (
    <div className="TopBar">
      <p className='TopBar-Menu'>
        <span>John Doe</span>
        <span> | </span>
        <a href="#">Logout</a>
      </p>
    </div>
  );
}

export default TopBar;
