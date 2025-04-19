import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id}
      id={question.id}
      prompt={question.prompt}
      answers={question.answers}
      correctIndex={question.correctIndex}
      onDelete={onDeleteQuestion}
      onUpdate={onUpdateQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
