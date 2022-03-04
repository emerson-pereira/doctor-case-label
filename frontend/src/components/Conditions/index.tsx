import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { useLocalState } from '../../contexts/state';
import './Style.css';

async function getConditions(token: string) {
  const conditions = await fetch('http://localhost:4000/conditions', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return conditions.json();
}

function Conditions() {
  const { conditions, updateConditions } = useLocalState();
  const { user } = useAuth();

  useEffect(() => {
    async function populateConditions() {
      const conditions = await getConditions(user.token);
      updateConditions(conditions, () => {});
    }
    populateConditions();
  });

  return (
    <section className="Conditions">
      <h2>Conditions</h2>

      <div className='Conditions-List'>
      <ul>
        {conditions.map((condition) => (
          <li key={condition.code}>{
            `${condition.description} (${condition.code})`
          }</li>
        ))}
        </ul>
      </div>
    </section>
  );
}

export default Conditions;
