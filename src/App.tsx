import MuscleMap from "./components/MuscleMap";
import "./App.css";
import { useEffect, useState } from "react";

type Training = {
  name: string;
  part: string;
  weight: string;
  reps: string;
  sets: string;
  date: string;
};
type TrainingMenu = {
  name: string;
  part: string;
  exercises: string[];
};

function App() {
  const [trainings, setTrainings] = useState<Training[]>(() => {
    const saved = localStorage.getItem("trainings");
    return saved ? JSON.parse(saved) : [];
  });

  const [menus, setMenus] = useState<TrainingMenu[]>(() => {
  const saved = localStorage.getItem("menus");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem(
    "menus",
    JSON.stringify(menus)
  );
}, [menus]);

  useEffect(() => {
    localStorage.setItem("trainings", JSON.stringify(trainings));
  }, [trainings]);

  const [name, setName] = useState("");
  const [part, setPart] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [tab, setTab] = useState("training");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedMenu, setSelectedMenu] =
  useState<TrainingMenu | null>(null);
  const [menuRecords, setMenuRecords] = useState<
  Record<string, {
    weight: string;
    reps: string;
    sets: string;
  }>
>({});
  const [menuName, setMenuName] = useState("");
const [exerciseName, setExerciseName] = useState("");
const [exercises, setExercises] = useState<string[]>([]);

  const parts = ["胸", "背中", "肩", "腕", "脚", "腹筋"];

  function addTraining() {
    const newTraining = {
      name,
      part,
      weight,
      reps,
      sets,
      date: new Date().toLocaleDateString("ja-JP"),
    };

    setTrainings([...trainings, newTraining]);

    setName("");
    setPart("");
    setWeight("");
    setReps("");
    setSets("");
    setShowAdd(false);
  }
function saveMenuRecords() {
  if (!selectedMenu) return;

  const newTrainings = selectedMenu.exercises.map((exercise) => ({
    name: exercise,
    part: selectedMenu.part,
    weight: menuRecords[exercise]?.weight || "",
    reps: menuRecords[exercise]?.reps || "",
    sets: menuRecords[exercise]?.sets || "",
    date: new Date().toLocaleDateString("ja-JP"),
  }));

  setTrainings([...trainings, ...newTrainings]);

  setSelectedMenu(null);
  setMenuRecords({});
  setShowAdd(false);
}
  function addExercise() {
  if (exerciseName === "") return;

  setExercises([...exercises, exerciseName]);
  setExerciseName("");
}

function saveMenu() {
  const newMenu = {
    name: menuName,
    part,
    exercises,
  };

  setMenus([...menus, newMenu]);

  setMenuName("");
  setPart("");
  setExercises([]);
}

  function trained(partName: string) {
    return trainings.some((training) => training.part === partName);
  }

  return (
    <div className="app">
      <h1>PumpLog 💪</h1>

      {tab === "training" && (
        <>
          <h2>今日のトレーニング</h2>

          {trainings.map((training, index) => (
            <div className="training-card" key={index}>
              <h3>{training.name}</h3>
              <p className="training-date">{training.date}</p>
              <p>
                {training.part} / {training.weight}kg × {training.reps}回 ×{" "}
                {training.sets}セット
              </p>
              <button
                onClick={() => {
                  setTrainings(trainings.filter((_, i) => i !== index));
                }}
              >
                削除
              </button>
            </div>
          ))}
          {showAdd && (
  <div className="add-form">
    <h2>追加</h2>
    <h3>メニュー選択</h3>

{menus.map((menu, index) => (
  <button
    key={index}
    onClick={() => setSelectedMenu(menu)}
  >
    {menu.name}
  </button>
))}
{selectedMenu && (
  <div className="training-card">
    <h3>{selectedMenu.name}</h3>

    {selectedMenu.exercises.map((exercise) => (
      <div key={exercise} className="exercise-record">
        <h4>{exercise}</h4>

        <input
          placeholder="重量"
          value={menuRecords[exercise]?.weight || ""}
          onChange={(e) =>
            setMenuRecords({
              ...menuRecords,
              [exercise]: {
                ...menuRecords[exercise],
                weight: e.target.value,
              },
            })
          }
        />

        <input
          placeholder="回数"
          value={menuRecords[exercise]?.reps || ""}
          onChange={(e) =>
            setMenuRecords({
              ...menuRecords,
              [exercise]: {
                ...menuRecords[exercise],
                reps: e.target.value,
              },
            })
          }
        />

        <input
          placeholder="セット数"
          value={menuRecords[exercise]?.sets || ""}
          onChange={(e) =>
            setMenuRecords({
              ...menuRecords,
              [exercise]: {
                ...menuRecords[exercise],
                sets: e.target.value,
              },
            })
          }
        />
      </div>
        ))}

    <button onClick={saveMenuRecords}>
      メニューを記録
    </button>

  </div>
)}

    <input
      placeholder="種目名"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <div className="part-buttons">
      {parts.map((p) => (
        <button
          key={p}
          className={part === p ? "selected" : ""}
          onClick={() => setPart(p)}
        >
          {p}
        </button>
      ))}
    </div>

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

    <button onClick={addTraining}>保存</button>
  </div>
)}
        </>
      )}
<button
  className="add-button"
  onClick={() => setShowAdd(true)}
>
  ＋
</button>

      {tab === "body" && (
        <div className="body-page">
          <h1>Today</h1>

           <MuscleMap trained={trained} />

          <h2>鍛えた部位</h2>

          <div className="muscle-list">
            {parts.map((p) => (
              <div key={p} className={trained(p) ? "muscle active" : "muscle"}>
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "menu" && (
  <div className="menu-page">
    <h1>Menu</h1>
    <p>自分で組んだメニューを保存できます</p>

    <input
      placeholder="メニュー名 例：肩の日"
      value={menuName}
      onChange={(e) => setMenuName(e.target.value)}
    />

    <div className="part-buttons">
      {parts.map((p) => (
        <button
          key={p}
          className={part === p ? "selected" : ""}
          onClick={() => setPart(p)}
        >
          {p}
        </button>
      ))}
    </div>

    <input
      placeholder="種目名 例：サイドレイズ"
      value={exerciseName}
      onChange={(e) => setExerciseName(e.target.value)}
    />

    <button onClick={addExercise}>種目を追加</button>

    {exercises.map((exercise, index) => (
      <div className="training-card" key={index}>
        {exercise}
      </div>
    ))}

    <button onClick={saveMenu}>メニュー保存</button>

    <h2>保存済みメニュー</h2>

    {menus.map((menu, index) => (
      <div className="training-card" key={index}>
        <h3>{menu.name}</h3>
        <p>{menu.part}</p>
        <p>{menu.exercises.join(" / ")}</p>
      </div>
    ))}
  </div>
)}
      
      {tab === "calendar" && (
        <div className="calendar-page">
          <h1>Calendar</h1>
          <p>トレーニング履歴を日付ごとに表示予定</p>

          {trainings.map((training, index) => (
            <div className="training-card" key={index}>
              <p className="training-date">{training.date}</p>
              <h3>{training.name}</h3>
              <p>
                {training.part} / {training.weight}kg × {training.reps}回 ×{" "}
                {training.sets}セット
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="bottom-nav">
      <button onClick={() => setTab("training")}>🏋️</button>
      <button onClick={() => setTab("menu")}>📋</button>
      <button onClick={() => setTab("body")}>🧍</button>
      <button onClick={() => setTab("calendar")}>📅</button>
      </div>
    </div>
  );
}

export default App;