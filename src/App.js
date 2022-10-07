import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [exercises, setExercises] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    async function loadExercises() {
      const response = await fetch("Equinox_FE_exercises.json");
      const exerciseFromAPI = await response.json();
      setExercises(exerciseFromAPI);
    }
    loadExercises();
  }, []);

  const handleChange = (e) => {
    let userInput = e.target.value.toLowerCase();
    setUserSearch(userInput);
  };

  const handleClick = (id) => {
    let exercise = exercises.find((exercise) => exercise.id === id);
    setSelectedExercise(exercise);
  };

  return (
    <div className="main">
      <div className="left-pane">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            onChange={handleChange}
          ></input>
        </div>
        <ul className="list-of-exercises">
          {exercises
            .filter((exercise) =>
              exercise.name.toLowerCase().includes(userSearch)
            )
            .map((exercise) => (
              <li key={exercise.id}>
                <button
                  onClick={() => handleClick(exercise.id)}
                  className={`${
                    selectedExercise && exercise.id === selectedExercise.id
                      ? "highlight"
                      : ""
                  }`}
                >
                  {exercise.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="right-pane">
        {selectedExercise ? (
          <>
            <h2>{selectedExercise.name}</h2>
            <video
              id="myvideo"
              src={selectedExercise.video.url}
              controls
              muted
              width="640"
              height="360"
            >
              <source src={selectedExercise.video.url} type="video/mp4" />
              <audio id="myaudio" controls>
                <source src={selectedExercise.audio.url} type="audio/m4a" />
              </audio>
            </video>
            <p>{selectedExercise.description}</p>
          </>
        ) : (
          <h2>Select Exercise</h2>
        )}
      </div>
    </div>
  );
}

export default App;
