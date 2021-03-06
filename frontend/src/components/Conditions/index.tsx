import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { useLocalState } from '../../contexts/state';
import './Style.css';

async function getConditions(token: string) {
  const conditions = await fetch(`${process.env.REACT_APP_BACKEND_URL}/conditions`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return conditions.json();
}

function Conditions() {
  const {
    conditions,
    selectedConditionId,
    updateConditions,
    updateSelectedConditionId
  } = useLocalState();

  const { user } = useAuth();

  useEffect(() => {
    async function populateConditions() {
      const conditions = await getConditions(user.token);
      updateConditions(conditions);
    }
    populateConditions();
  }, []);

  function handleConditionClick(conditionCode: string) {
    updateSelectedConditionId(conditionCode);
  }

  return (
    <section className="Conditions">
      <h2>Conditions</h2>

      <div className='Conditions-List'>
        <ul>
          {conditions.map((condition, i) => (
            <li
              key={`${condition.code}-${i}`}
              className={`${condition.code === selectedConditionId ? 'selected' : '' }`}
              onClick={() => handleConditionClick(condition.code)}
            >
              {`${condition.description} (${condition.code})`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Conditions;
