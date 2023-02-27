import React from "react";

function QuestionItem({ question, onDeleteClick, onChange }) {
  const { id, prompt, answers, correctIndex } = question;

  function deleteQuestion(){
    onDeleteClick(id)
  }

  function handleUpdateAnswer(e) {
    onChange(id, parseInt(e.target.value))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateAnswer}>{options}</select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
