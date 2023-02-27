import React from "react";
import {useEffect, useState} from "react"
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(res => res.json())
      .then(questions => setQuestions(questions))
  }, [])

  
  function handleDeletedQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      // one way of working the logic is within the second promise
      // create a variable of the filtered data that's comparing the ids
      // of the deleted questions to the ids of the current questions on display
      // then reset the state of the newly filtered questions
      const deletedQuestions = questions.filter(question => question.id !== id)
      setQuestions(deletedQuestions)
    })
  }
  
  function handleUpdatedQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex})
    })
    .then(res => res.json())
    .then(updatedData => handleUpdatedQuestions(updatedData))
  }
  
  // another way is to pull the logic out of the second promise
  // and then map over the questions (use a map because the item is already in the array just want to update the item)
  // compare the ids once more to update
    const handleUpdatedQuestions = (updatedQuestions) => questions.map(question => 
      question.id === updatedQuestions.id ? updatedQuestions : question)
    
  const questionList = questions.map(question => {
    return <QuestionItem
      key={question.id}
      question={question}
      onDeleteClick={handleDeletedQuestion}
      onChange={handleUpdatedQuestion}
    />
  })


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionList}</ul>
    </section>
  );
}

export default QuestionList;
