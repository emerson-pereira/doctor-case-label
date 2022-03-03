import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';
import './Style.css';

function TopBar() {
  let auth = useAuth();
  let navigate = useNavigate();

  return (
    <section className="TopBar">
      <nav className='TopBar-Menu'>
        {!auth.user && <span>Hello, Doctor!</span>}

        {auth.user && (
          <>
            <span>{auth.user.name}</span>
            <span> | </span>
            <button
              onClick={() => {
                auth.signout(() => navigate("/login"));
              }}
            >Logout</button>
          </>
        )}
      </nav>
    </section>
  );
}

export default TopBar;
