import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import History from "./pages/History";
import Log from "./pages/Log";
import "./App.css";
import { useEffect, useState } from "react";

type TrainingSet = {
  id: string;
  weight: string;
  reps: string;
};

type TrainingExercise = {
  id: string;
  name: string;
  sets: TrainingSet[];
};

type TrainingSession = {
  id: string;
  title: string;
  parts: string[];
  date: string;
  exercises: TrainingExercise[];
};

type TrainingMenu = {
  name: string;
  parts: string[];
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

  const [tab, setTab] = useState("home");
  const [showAdd, setShowAdd] = useState(false);
  const [showMenuManager, setShowMenuManager] = useState(false);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [menuName, setMenuName] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState<string[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<TrainingMenu | null>(null);
  const [menuRecords, setMenuRecords] = useState<
    Record<string, { weight: string; reps: string; sets: string }>
  >({});
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);

  const parts = ["胸", "背中", "肩", "腕", "脚"];
  const today = new Date().toLocaleDateString("ja-JP");
  const todaySessions = sessions.filter((session) => session.date === today);

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  function addExercise() {
    if (!exerciseName) return;
    setExercises([...exercises, exerciseName]);
    setExerciseName("");
  }

  function togglePart(partName: string) {
    if (selectedParts.includes(partName)) {
      setSelectedParts(selectedParts.filter((p) => p !== partName));
    } else {
      setSelectedParts([...selectedParts, partName]);
    }
  }

  function saveMenu() {
    if (!menuName || selectedParts.length === 0 || exercises.length === 0) {
      return;
    }

    setMenus([
      ...menus,
      {
        name: menuName,
        parts: selectedParts,
        exercises,
      },
    ]);

    setMenuName("");
    setSelectedParts([]);
    setExercises([]);
    setShowMenuManager(false);
    setShowAdd(true);
  }

  function saveMenuRecords() {
    if (!selectedMenu) return;

    const newSession: TrainingSession = {
      id: crypto.randomUUID(),
      title: selectedMenu.name,
      parts: selectedMenu.parts,
      date: today,
      exercises: selectedMenu.exercises.map((exercise) => ({
        id: crypto.randomUUID(),
        name: exercise,
        sets: [
          {
            id: crypto.randomUUID(),
            weight: menuRecords[exercise]?.weight || "",
            reps: menuRecords[exercise]?.reps || "",
          },
        ],
      })),
    };

    setSessions([...sessions, newSession]);
    setSelectedMenu(null);
    setMenuRecords({});
    setShowAdd(false);
  }

  function deleteMenu(menuName: string) {
    setMenus(menus.filter((menu) => menu.name !== menuName));
  }

  function updateTrainingSet(
    sessionId: string,
    exerciseId: string,
    setId: string,
    field: "weight" | "reps",
    value: string
  ) {
    setSessions(
      sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              exercises: session.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      sets: exercise.sets.map((set) =>
                        set.id === setId
                          ? {
                              ...set,
                              [field]: value,
                            }
                          : set
                      ),
                    }
                  : exercise
              ),
            }
          : session
      )
    );
  }

  function addTrainingSet(sessionId: string, exerciseId: string) {
    setSessions(
      sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              exercises: session.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      sets: [
                        ...exercise.sets,
                        {
                          id: crypto.randomUUID(),
                          weight: "",
                          reps: "",
                        },
                      ],
                    }
                  : exercise
              ),
            }
          : session
      )
    );
  }

  function deleteTrainingSet(
    sessionId: string,
    exerciseId: string,
    setId: string
  ) {
    setSessions(
      sessions.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              exercises: session.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      sets: exercise.sets.filter((set) => set.id !== setId),
                    }
                  : exercise
              ),
            }
          : session
      )
    );
  }

  function trained(partName: string) {
    const todayDate = new Date();

    return sessions.some((session) => {
      const sessionDate = new Date(session.date);

      const diff =
        (todayDate.getTime() - sessionDate.getTime()) /
        (1000 * 60 * 60 * 24);

      return diff <= 7 && session.parts?.includes(partName);
    });
  }

  function isWithin7Days(date: string) {
    const todayDate = new Date();
    const sessionDate = new Date(date);

    const diff =
      (todayDate.getTime() - sessionDate.getTime()) /
      (1000 * 60 * 60 * 24);

    return diff <= 7;
  }

  function countPart(partName: string) {
    return sessions.filter(
      (session) =>
        session.parts?.includes(partName) &&
        isWithin7Days(session.date)
    ).length;
  }

  function maxPartCount() {
    return Math.max(...parts.map((part) => countPart(part)), 1);
  }

  function getWeakParts() {
    return parts.filter((part) => countPart(part) === 0);
  }

  function groupedSessions() {
    return sessions.reduce<Record<string, TrainingSession[]>>(
      (groups, session) => {
        if (!groups[session.date]) {
          groups[session.date] = [];
        }

        groups[session.date].push(session);
        return groups;
      },
      {}
    );
  }

  function getPRs() {
    const prs: Record<string, number> = {};

    sessions.forEach((session) => {
      session.exercises.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          const weight = Number(set.weight);

          if (!prs[exercise.name] || weight > prs[exercise.name]) {
            prs[exercise.name] = weight;
          }
        });
      });
    });

    return prs;
  }

  function getExerciseNames() {
    return [
      ...new Set(
        sessions.flatMap((session) =>
          session.exercises.map((exercise) => exercise.name)
        )
      ),
    ];
  }

  function getExerciseProgress(exerciseName: string) {
    const progressMap: Record<string, number> = {};

    sessions.forEach((session) => {
      const targetExercise = session.exercises.find(
        (exercise) => exercise.name === exerciseName
      );

      if (!targetExercise) return;

      const maxWeight = Math.max(
        ...targetExercise.sets.map((set) => Number(set.weight) || 0)
      );

      if (!progressMap[session.date] || maxWeight > progressMap[session.date]) {
        progressMap[session.date] = maxWeight;
      }
    });

    return Object.entries(progressMap).map(([date, weight]) => ({
      date,
      weight,
    }));
  }

  function weeklyCount() {
    return sessions.filter((session) => isWithin7Days(session.date)).length;
  }

  function streakCount() {
    const uniqueDates = [...new Set(sessions.map((session) => session.date))];
    return uniqueDates.length;
  }

  return (
    <div className="app">
      <h1>PumpLog 💪</h1>

      {tab === "home" && (
        <Home
          today={today}
          todayCount={todaySessions.length}
          trained={trained}
          prs={getPRs()}
          weeklyCount={weeklyCount()}
          streak={streakCount()}
          goTraining={() => setTab("training")}
          todaySessions={todaySessions}
        />
      )}

      {tab === "training" && (
        <Log
          todaySessions={todaySessions}
          sessions={sessions}
          setSessions={setSessions}
          menus={menus}
          deleteMenu={deleteMenu}
          editingSessionId={editingSessionId}
          setEditingSessionId={setEditingSessionId}
          parts={parts}
          showAdd={showAdd}
          setShowAdd={setShowAdd}
          showMenuManager={showMenuManager}
          setShowMenuManager={setShowMenuManager}
          menuName={menuName}
          setMenuName={setMenuName}
          selectedParts={selectedParts}
          togglePart={togglePart}
          exerciseName={exerciseName}
          setExerciseName={setExerciseName}
          exercises={exercises}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          menuRecords={menuRecords}
          setMenuRecords={setMenuRecords}
          addExercise={addExercise}
          saveMenu={saveMenu}
          saveMenuRecords={saveMenuRecords}
          updateTrainingSet={updateTrainingSet}
          addTrainingSet={addTrainingSet}
          deleteTrainingSet={deleteTrainingSet}
        />
      )}

      {tab === "analysis" && (
        <Analysis
          parts={parts}
          countPart={countPart}
          maxPartCount={maxPartCount}
          getWeakParts={getWeakParts}
          exerciseNames={getExerciseNames()}
          getExerciseProgress={getExerciseProgress}
        />
      )}

      {tab === "calendar" && <History groupedSessions={groupedSessions} />}

      <div className="bottom-nav">
        <button
          className={tab === "home" ? "active-tab" : ""}
          onClick={() => setTab("home")}
        >
          🏠
        </button>

        <button
          className={tab === "training" ? "active-tab" : ""}
          onClick={() => setTab("training")}
        >
          🏋️
        </button>

        <button
          className={tab === "analysis" ? "active-tab" : ""}
          onClick={() => setTab("analysis")}
        >
          📊
        </button>

        <button
          className={tab === "calendar" ? "active-tab" : ""}
          onClick={() => setTab("calendar")}
        >
          📅
        </button>
      </div>
    </div>
  );
}

export default App;