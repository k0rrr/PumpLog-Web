import MuscleMap from "./components/MuscleMap";
import "./App.css";
import { useEffect, useState } from "react";

type TrainingExercise = {
  id: string;
  name: string;
  weight: string;
  reps: string;
  sets: string;
};

type TrainingSession = {
  id: string;
  title: string;
  part: string;
  date: string;
  exercises: TrainingExercise[];
};

type TrainingMenu = {
  name: string;
  part: string;
  exercises: string[];
};

function App() {
  const [sessions, setSessions] = useState<TrainingSession[]>(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [menus, setMenus] = useState<TrainingMenu[]>(() => {
    const saved = localStorage.getItem("menus");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  const [tab, setTab] = useState("training");
  const [showAdd, setShowAdd] = useState(false);
  const [part, setPart] = useState("");
  const [menuName, setMenuName] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<TrainingMenu | null>(null);
  const [menuRecords, setMenuRecords] = useState<Record<string, { weight: string; reps: string; sets: string }>>({});

  const parts = ["胸", "背中", "肩", "腕", "脚", "腹筋"];
  const today = new Date().toLocaleDateString("ja-JP");

  const todaySessions = sessions.filter((session) => session.date === today);

  function addExercise() {
    if (!exerciseName) return;
    setExercises([...exercises, exerciseName]);
    setExerciseName("");
  }

  function saveMenu() {
    if (!menuName || !part || exercises.length === 0) return;

    setMenus([...menus, { name: menuName, part, exercises }]);
    setMenuName("");
    setPart("");
    setExercises([]);
  }

  function saveMenuRecords() {
    if (!selectedMenu) return;

    const newSession: TrainingSession = {
      id: crypto.randomUUID(),
      title: selectedMenu.name,
      part: selectedMenu.part,
      date: today,
      exercises: selectedMenu.exercises.map((exercise) => ({
        id: crypto.randomUUID(),
        name: exercise,
        weight: menuRecords[exercise]?.weight || "",
        reps: menuRecords[exercise]?.reps || "",
        sets: menuRecords[exercise]?.sets || "",
      })),
    };

    setSessions([...sessions, newSession]);
    setSelectedMenu(null);
    setMenuRecords({});
    setShowAdd(false);
  }

  function trained(partName: string) {
    return todaySessions.some((session) => session.part === partName);
  }

  return (
    <div className="app">
      <h1>PumpLog 💪</h1>

      {tab === "training" && (
        <>
          <h2>今日のトレーニング</h2>

          {todaySessions.map((session) => (
            <div className="training-card" key={session.id}>
              <p className="training-date">{session.date}</p>
              <h3>{session.title}</h3>

              {session.exercises.map((exercise) => (
                <p key={exercise.id}>
                  {exercise.name} {exercise.weight}kg × {exercise.reps}回 × {exercise.sets}セット
                </p>
              ))}

              <button onClick={() => setSessions(sessions.filter((item) => item.id !== session.id))}>
                削除
              </button>
            </div>
          ))}

          {showAdd && (
            <div className="add-form">
              <h2>メニューから記録</h2>

              {menus.map((menu, index) => (
                <button key={index} onClick={() => setSelectedMenu(menu)}>
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
                            [exercise]: { ...menuRecords[exercise], weight: e.target.value },
                          })
                        }
                      />

                      <input
                        placeholder="回数"
                        value={menuRecords[exercise]?.reps || ""}
                        onChange={(e) =>
                          setMenuRecords({
                            ...menuRecords,
                            [exercise]: { ...menuRecords[exercise], reps: e.target.value },
                          })
                        }
                      />

                      <input
                        placeholder="セット数"
                        value={menuRecords[exercise]?.sets || ""}
                        onChange={(e) =>
                          setMenuRecords({
                            ...menuRecords,
                            [exercise]: { ...menuRecords[exercise], sets: e.target.value },
                          })
                        }
                      />
                    </div>
                  ))}

                  <button onClick={saveMenuRecords}>メニューを記録</button>
                </div>
              )}
            </div>
          )}

          <button className="add-button" onClick={() => setShowAdd(true)}>＋</button>
        </>
      )}

      {tab === "menu" && (
        <div className="menu-page">
          <h1>Menu</h1>

          <input placeholder="メニュー名 例：胸の日" value={menuName} onChange={(e) => setMenuName(e.target.value)} />

          <div className="part-buttons">
            {parts.map((p) => (
              <button key={p} className={part === p ? "selected" : ""} onClick={() => setPart(p)}>
                {p}
              </button>
            ))}
          </div>

          <input placeholder="種目名 例：ベンチプレス" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />

          <button onClick={addExercise}>種目を追加</button>

          {exercises.map((exercise, index) => (
            <div className="training-card" key={index}>{exercise}</div>
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

      {tab === "body" && (
        <div className="body-page">
          <h1>Today</h1>
          <MuscleMap trained={trained} />
        </div>
      )}

      {tab === "calendar" && (
        <div className="calendar-page">
          <h1>Calendar</h1>

          {sessions.map((session) => (
            <div className="training-card" key={session.id}>
              <p className="training-date">{session.date}</p>
              <h3>{session.title}</h3>

              {session.exercises.map((exercise) => (
                <p key={exercise.id}>
                  {exercise.name} {exercise.weight}kg × {exercise.reps}回 × {exercise.sets}セット
                </p>
              ))}
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