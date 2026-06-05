import { useEffect, useState } from "react";

type Training = {
  name: string;
  part: string;
  weight: string;
  reps: string;
  sets: string;
};

function App() {
  const [trainings, setTrainings] = useState<Training[]>(() => {
  const saved = localStorage.getItem("trainings");

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
});
useEffect(() => {
  localStorage.setItem(
    "trainings",
    JSON.stringify(trainings)
  );
}, [trainings]);

  const [name, setName] = useState("");
  const [part, setPart] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  function addTraining() {
    const newTraining = {
      name,
      part,
      weight,
      reps,
      sets,
    };

    setTrainings([...trainings, newTraining]);

    setName("");
    setPart("");
    setWeight("");
    setReps("");
    setSets("");
  }

  return (
    <div>
      <h1>PumpLog 💪</h1>

      <h2>今日のトレーニング</h2>

      {trainings.map((training, index) => (
        <div key={index}>
          <h3>{training.name}</h3>
          <p>
            {training.part} /
            {training.weight}kg ×
            {training.reps}回 ×
            {training.sets}セット
          </p>
          <button
            onClick={() => {
            setTrainings(
              trainings.filter((_, i) => i !== index)
              );
               }}
                      >
                      削除
          </button>
        </div>
      ))}

      <h2>追加</h2>

      <input
        placeholder="種目名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="部位"
        value={part}
        onChange={(e) => setPart(e.target.value)}
      />

      <input
        placeholder="重量"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        placeholder="回数"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <input
        placeholder="セット数"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
      />

      <button onClick={addTraining}>
        保存
      </button>
    </div>
  );
}

export default App;