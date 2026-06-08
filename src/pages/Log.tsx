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

type MenuRecord = {
  weight: string;
  reps: string;
  sets: string;
};

type Props = {
  todaySessions: TrainingSession[];
  sessions: TrainingSession[];
  setSessions: React.Dispatch<React.SetStateAction<TrainingSession[]>>;
  menus: TrainingMenu[];
  parts: string[];
  showAdd: boolean;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  showMenuManager: boolean;
  setShowMenuManager: React.Dispatch<React.SetStateAction<boolean>>;
  menuName: string;
  setMenuName: React.Dispatch<React.SetStateAction<string>>;
  part: string;
  setPart: React.Dispatch<React.SetStateAction<string>>;
  exerciseName: string;
  setExerciseName: React.Dispatch<React.SetStateAction<string>>;
  exercises: string[];
  selectedMenu: TrainingMenu | null;
  setSelectedMenu: React.Dispatch<React.SetStateAction<TrainingMenu | null>>;
  menuRecords: Record<string, MenuRecord>;
  setMenuRecords: React.Dispatch<React.SetStateAction<Record<string, MenuRecord>>>;
  addExercise: () => void;
  saveMenu: () => void;
  saveMenuRecords: () => void;
};

function Log({
  todaySessions,
  sessions,
  setSessions,
  menus,
  parts,
  showAdd,
  setShowAdd,
  showMenuManager,
  setShowMenuManager,
  menuName,
  setMenuName,
  part,
  setPart,
  exerciseName,
  setExerciseName,
  exercises,
  selectedMenu,
  setSelectedMenu,
  menuRecords,
  setMenuRecords,
  addExercise,
  saveMenu,
  saveMenuRecords,
}: Props) {
  return (
    <>
      <h2>Log</h2>

      <button onClick={() => setShowMenuManager(!showMenuManager)}>
        {showMenuManager ? "記録に戻る" : "メニュー管理"}
      </button>

      {showMenuManager && (
        <div className="menu-page">
          <h1>Menu</h1>

          <input
            placeholder="メニュー名 例：胸の日"
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
            placeholder="種目名 例：ベンチプレス"
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

      {!showMenuManager && (
        <>
          <h2>今日のトレーニング</h2>

          {todaySessions.map((session) => (
            <div className="training-card" key={session.id}>
              <p className="training-date">{session.date}</p>
              <h3>{session.title}</h3>

              {session.exercises.map((exercise) => (
                <p key={exercise.id}>
                  {exercise.name} {exercise.weight}kg × {exercise.reps}回 ×{" "}
                  {exercise.sets}セット
                </p>
              ))}

              <button
                onClick={() =>
                  setSessions(sessions.filter((item) => item.id !== session.id))
                }
              >
                削除
              </button>
            </div>
          ))}

          {showAdd && (
            <div className="add-form">
              <h2>メニューから記録</h2>

              {menus.length === 0 && (
                <div className="training-card">
                  <p>まだメニューがありません。</p>
                  <button onClick={() => setShowMenuManager(true)}>
                    メニューを作る
                  </button>
                </div>
              )}

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

                  <button onClick={saveMenuRecords}>メニューを記録</button>
                </div>
              )}

              <button onClick={() => setShowAdd(false)}>閉じる</button>
            </div>
          )}

          <button className="add-button" onClick={() => setShowAdd(true)}>
            ＋
          </button>
        </>
      )}
    </>
  );
}

export default Log;