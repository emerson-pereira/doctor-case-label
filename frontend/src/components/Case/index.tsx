import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';
import { useLocalState } from '../../contexts/state';
import './Style.css';

export async function getNextCase(token: string) {
  const nextCase = await fetch('http://localhost:4000/cases/next', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const string = await nextCase.text();
  const json = string === "" ? {} : JSON.parse(string);
  return json;
}

function Case() {
  const { case: currentCase, updateCase } = useLocalState();
  const { user } = useAuth();

  useEffect(() => {
    async function populateConditions() {
      const nextCase = await getNextCase(user.token);

      if (!Object.keys(nextCase).length) {
        alert('All finished. Enjoy the day!');
        return;
      }

      updateCase({ caseId: nextCase._id, content: nextCase.content }, () => { });
    }
    populateConditions();
  }, []);

  return (
    <section className="Case">
      <h2>Case</h2>

      <div className='Case-Content'>
        <p>
          {currentCase.content}
        </p>
      </div>
    </section>
  );
}

export default Case;
