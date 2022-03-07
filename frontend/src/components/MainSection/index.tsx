import React from 'react';
import { useAuth } from '../../contexts/auth';
import { useLocalState } from '../../contexts/state';
import Case, { getNextCase } from '../Case';
import Conditions from '../Conditions';
import './Style.css';

async function submitCurrentCase(caseId: string, conditionId: string, token: string) {
  const caseResult = await fetch(`${process.env.REACT_APP_BACKEND_URL}/cases/review/${caseId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ conditionId })
  });
  return caseResult.json();
}

function MainSection() {
  const {
    case: currentCase,
    selectedConditionId,
    updateCase,
    updateSelectedConditionId
  } = useLocalState();

  const { user } = useAuth();

  async function handleNextCase() {
    if (!selectedConditionId) {
      alert('Oops, forgetting something?');
      return;
    }

    const caseSubmitResult = await submitCurrentCase(
      currentCase.caseId,
      selectedConditionId,
      user.token,
    );

    if (!caseSubmitResult.isReviewed) {
      throw Error('Error on subimiting case to review.');
    }

    const nextCase = await getNextCase(user.token);

    if (!Object.keys(nextCase).length) {
      alert('All finished. Enjoy the day!');
      return;
    }

    updateCase({ caseId: nextCase._id, content: nextCase.content }, () => { });
  }

  return (
    <main className="MainSection">
      <Case />
      <aside className='MainSection-Aside'>
        <Conditions />
        <section className='MainSection-NextButton'>
          <button onClick={handleNextCase}>Next Case</button>
        </section>
      </aside>
    </main>
  );
}

export default MainSection;
