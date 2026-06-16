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
  deleteMenu: (menuName: string) => void;
  editingSessionId: string | null;
  setEditingSessionId: React.Dispatch<React.SetStateAction<string | null>>;
  parts: string[];
  showAdd: boolean;
  setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
  showMenuManager: boolean;
  setShowMenuManager: React.Dispatch<React.SetStateAction<boolean>>;
  menuName: string;
  setMenuName: React.Dispatch<React.SetStateAction<string>>;
  selectedParts: string[];
  togglePart: (partName: string) => void;
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
  updateTrainingSet: (
    sessionId: string,
    exerciseId: string,
    setId: string,
    field: "weight" | "reps",
    value: string
  ) => void;
  addTrainingSet: (sessionId: string, exerciseId: string) => void;
  deleteTrainingSet: (
    sessionId: string,
    exerciseId: string,
    setId: string
  ) => void;
};

function Log({
  todaySessions,
  sessions,
  setSessions,
  menus,
  deleteMenu,
  editingSessionId,
  setEditingSessionId,
  parts,
  showAdd,
  setShowAdd,
  showMenuManager,
  setShowMenuManager,
  menuName,
  setMenuName,
  selectedParts,
  togglePart,
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
  updateTrainingSet,
  addTrainingSet,
  deleteTrainingSet,
}: Props) {
  return (
    <>
      <div className="page-header">
        <div>
          <p>Workout</p>
          <h2>Log</h2>
        </div>
      </div>

      {showMenuManager && (
        <div className="menu-page">
          <h1>メニュー作成</h1>

          <button
            className="small-button"
            onClick={() => {
              setShowMenuManager(false);
              setShowAdd(true);
            }}
          >
            記録画面に戻る
          </button>

          <input
            placeholder="メニュー名 例：Pushの日"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />

          <div className="part-buttons">
            {parts.map((p) => (
              <button
                key={p}
                className={selectedParts.includes(p) ? "selected" : ""}
                onClick={() => togglePart(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="exercise-add-row">
            <input
              placeholder="種目名 例：ベンチプレス"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />

            <button onClick={addExercise}>＋</button>
          </div>

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
              <p>{menu.parts.join(" / ")}</p>
              <p>{menu.exercises.join(" / ")}</p>

              <button
                className="delete-button"
                onClick={() => deleteMenu(menu.name)}
              >
                メニュー削除
              </button>
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
              <p>{session.parts?.join(" / ")}</p>

              {session.exercises.map((exercise) => (
                <div key={exercise.id}>
                  <h4>{exercise.name}</h4>

                  {exercise.sets.map((set, index) => (
                    <div key={set.id}>
                      {editingSessionId === session.id ? (
                        <div className="edit-record-row">
                          <p>Set {index + 1}</p>

                          <input
                            value={set.weight}
                            placeholder="重量"
                            onChange={(e) =>
                              updateTrainingSet(
                                session.id,
                                exercise.id,
                                set.id,
                                "weight",
                                e.target.value
                              )
                            }
                          />

                          <input
                            value={set.reps}
                            placeholder="回数"
                            onChange={(e) =>
                              updateTrainingSet(
                                session.id,
                                exercise.id,
                                set.id,
                                "reps",
                                e.target.value
                              )
                            }
                          />

                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteTrainingSet(session.id, exercise.id, set.id)
                            }
                          >
                            削除
                          </button>
                        </div>
                      ) : (
                        <p>
                          Set {index + 1}：{set.weight}kg × {set.reps}回
                        </p>
                      )}
                    </div>
                  ))}

                  {editingSessionId === session.id && (
                    <button onClick={() => addTrainingSet(session.id, exercise.id)}>
                      ＋セット追加
                    </button>
                  )}
                </div>
              ))}

              <div className="record-actions">
                {editingSessionId === session.id ? (
                  <button onClick={() => setEditingSessionId(null)}>完了</button>
                ) : (
                  <button onClick={() => setEditingSessionId(session.id)}>
                    編集
                  </button>
                )}

                <button
                  className="delete-button"
                  onClick={() =>
                    setSessions(sessions.filter((item) => item.id !== session.id))
                  }
                >
                  削除
                </button>
              </div>
            </div>
          ))}

          {showAdd && (
            <div className="add-form">
              <h2>メニューから記録</h2>

              <button
                className="create-menu-button"
                onClick={() => setShowMenuManager(true)}
              >
                ＋ メニュー作成
              </button>

              {menus.length === 0 && (
                <div className="training-card">
                  <p>まだメニューがありません。</p>
                </div>
              )}

              {menus.map((menu, index) => (
                <div className="menu-select-row" key={index}>
                  <button
                    className="menu-select-button"
                    onClick={() => setSelectedMenu(menu)}
                  >
                    {menu.name} / {menu.parts.join(" / ")}
                  </button>

                  <button
                    className="menu-delete-button"
                    onClick={() => deleteMenu(menu.name)}
                  >
                    削除
                  </button>
                </div>
              ))}

              {selectedMenu && (
                <div className="training-card">
                  <h3>{selectedMenu.name}</h3>
                  <p>{selectedMenu.parts.join(" / ")}</p>

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
                    </div>
                  ))}

                  <button onClick={saveMenuRecords}>メニューを記録</button>
                </div>
              )}

              <button
                onClick={() => {
                  setShowAdd(false);
                  setSelectedMenu(null);
                  setMenuRecords({});
                }}
              >
                閉じる
              </button>
            </div>
          )}

          <div className="start-workout-card">
            <div>
              <p>Ready?</p>
              <h3>Start Workout</h3>
            </div>

            <button onClick={() => setShowAdd(true)}>Start</button>
          </div>
        </>
      )}
    </>
  );
}

export default Log;