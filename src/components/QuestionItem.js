import React, { useState } from "react";

function QuestionItem({
  id,
  prompt,
  answers,
  correctIndex,
  onDelete,
  onUpdate,
}) {
  const [currentCorrectIndex, setCurrentCorrectIndex] = useState(correctIndex);

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) onDelete(id);
      })
      .catch((err) => console.error("Delete failed:", err));
  }

  function handleCorrectAnswerChange(event) {
    const newIndex = parseInt(event.target.value);
    setCurrentCorrectIndex(newIndex);  // Update state to reflect the change immediately

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update correct answer");
        return res.json();
      })
      .then((updatedQuestion) => {
        onUpdate(updatedQuestion); // Pass the updated question to the parent
      })
      .catch((err) => console.error("Update failed:", err));
  }

  const answerList = answers.map((answer, index) => (
    <li
      key={index}
      style={{ fontWeight: index === currentCorrectIndex ? "bold" : "normal" }}
    >
      {answer}
    </li>
  ));

  return (
    <li>
      <h4>{prompt}</h4>
      <ul>{answerList}</ul>
      <label>
        Correct Answer:
        <select
          value={currentCorrectIndex}
          onChange={handleCorrectAnswerChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
