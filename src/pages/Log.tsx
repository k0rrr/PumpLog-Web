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
  menuRecords: Record<string, TrainingSet[]>;
  setMenuRecords: React.Dispatch<
    React.SetStateAction<Record<string, TrainingSet[]>>
  >;
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

  function confirmDeleteMenu(name:string){
    const ok = window.confirm(
      `${name}を本当に削除しますか？`
    );

    if(ok){
      deleteMenu(name);
    }
  }

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

          <div className="button-right">
            <button
              onClick={()=>{
                setShowMenuManager(false);
                setShowAdd(true);
              }}
            >
              戻る
            </button>
          </div>


          <input
            placeholder="メニュー名"
            value={menuName}
            onChange={(e)=>setMenuName(e.target.value)}
          />


          <div className="part-buttons">

          {parts.map((p)=>(
            <button
              key={p}
              className={
                selectedParts.includes(p)
                ? "selected"
                : ""
              }
              onClick={()=>togglePart(p)}
            >
              {p}
            </button>
          ))}

          </div>


          <div className="exercise-add-row">

            <input
              placeholder="種目"
              value={exerciseName}
              onChange={(e)=>setExerciseName(e.target.value)}
            />

            <button onClick={addExercise}>
              ＋
            </button>

          </div>


          {exercises.map((e)=>(
            <div className="training-card" key={e}>
              {e}
            </div>
          ))}


          <div className="button-right">
            <button onClick={saveMenu}>
              保存
            </button>
          </div>


          {menus.map((menu)=>(
            <div className="training-card" key={menu.name}>

              <h3>{menu.name}</h3>

              <button
                className="delete-button"
                onClick={()=>
                  confirmDeleteMenu(menu.name)
                }
              >
                削除
              </button>

            </div>
          ))}


        </div>
      )}




      {!showMenuManager && (
      <>


      {showAdd && (

        <div className="add-form">


        <h2>メニューから記録</h2>


        {!selectedMenu && (
          <>

          <button
            className="create-menu-button"
            onClick={()=>
              setShowMenuManager(true)
            }
          >
            ＋ メニュー作成
          </button>


          {menus.map((menu)=>(
            <div
              className="menu-select-row"
              key={menu.name}
            >

              <button
                className="menu-select-button"
                onClick={()=>
                  setSelectedMenu(menu)
                }
              >
                {menu.name}
              </button>


              <button
                className="menu-delete-button"
                onClick={()=>
                  confirmDeleteMenu(menu.name)
                }
              >
                削除
              </button>

            </div>
          ))}

          </>
        )}




        {selectedMenu && (

        <div className="training-card">

        <h3>{selectedMenu.name}</h3>


        {selectedMenu.exercises.map((exercise)=>{

        const sets =
          menuRecords[exercise] || [
            {
              id:crypto.randomUUID(),
              weight:"",
              reps:"",
            }
          ];


        return (

        <div
          className="exercise-record"
          key={exercise}
        >


        {sets.map((set,index)=>(

        <div
          className="record-set-row"
          key={set.id}
        >


        <span className="exercise-name-cell">
          {index===0 ? exercise : ""}
        </span>


        <span>{index+1}</span>


        <input
          placeholder="kg"
          value={set.weight}
          onChange={(e)=>
            setMenuRecords({
              ...menuRecords,
              [exercise]:
              sets.map((item)=>
                item.id===set.id
                ?{
                  ...item,
                  weight:e.target.value
                }
                :item
              )
            })
          }
        />


        <input
          placeholder="回数"
          value={set.reps}
          onChange={(e)=>
            setMenuRecords({
              ...menuRecords,
              [exercise]:
              sets.map((item)=>
                item.id===set.id
                ?{
                  ...item,
                  reps:e.target.value
                }
                :item
              )
            })
          }
        />


        {index===sets.length-1 && (

        <button
          className="inline-add-set"
          onClick={()=>
            setMenuRecords({
              ...menuRecords,
              [exercise]:[
                ...sets,
                {
                  id:crypto.randomUUID(),
                  weight:"",
                  reps:"",
                }
              ]
            })
          }
        >
          ＋
        </button>

        )}

        </div>

        ))}


        </div>

        );

        })}


        <button onClick={saveMenuRecords}>
          メニューを記録
        </button>


        </div>

        )}



        <div className="button-right">
          <button
            onClick={()=>{
              setShowAdd(false);
              setSelectedMenu(null);
              setMenuRecords({});
            }}
          >
            閉じる
          </button>
        </div>


        </div>

      )}




      {!showAdd && (

      <div className="start-workout-card">

        <div>
          <p>Ready?</p>
          <h3>Start Workout</h3>
        </div>


        <button
          onClick={()=>
            setShowAdd(true)
          }
        >
          Start
        </button>

      </div>

      )}


      </>
      )}

    </>
  );
}

export default Log;