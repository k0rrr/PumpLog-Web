import { useState } from "react";
type Progress = {
  date: string;
  weight: number;
};

type Props = {
  parts: string[];
  countPart: (part: string) => number;
  maxPartCount: () => number;
  getWeakParts: () => string[];

  exerciseNames: string[];
  getExerciseProgress: (
    exerciseName: string
  ) => Progress[];
};

function Analysis({
  parts,
  countPart,
  maxPartCount,
  getWeakParts,
  exerciseNames,
  getExerciseProgress,
}: Props) {

  const [selectedExercise, setSelectedExercise] =
    useState("");
  
  const progress =
      selectedExercise
        ? getExerciseProgress(selectedExercise)
        : [];

    const maxWeight = Math.max(
      ...progress.map((item) => item.weight),
      1
    );

  const trainedCount = parts.filter(
    (part) => countPart(part) > 0
  ).length;

  return (
    <div className="analysis-page">
      <h1>7Days Analysis</h1>
      <div className="training-card balance-card">

      <h3>Weekly Balance</h3>


      <h1>
        {trainedCount}/{parts.length}
      </h1>

      <p>
        muscle groups trained
      </p>

    </div>

    <div className="training-card">

  <h2>Progress 📈</h2>

  <select
    value={selectedExercise}
    onChange={(e) =>
      setSelectedExercise(e.target.value)
    }
  >
    <option value="">
      種目を選択
    </option>

    {exerciseNames.map((name) => (
      <option key={name} value={name}>
        {name}
      </option>
    ))}
  </select>


  {selectedExercise &&
    getExerciseProgress(selectedExercise).map(
      (record) => (
        <div
          className="progress-row"
          key={record.date}
        >
          <span>{record.date}</span>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(record.weight / maxWeight) * 100}%`,
              }}
            >
              {record.weight}kg
            </div>
          </div>
        </div>
      )
    )}

</div>

      {getWeakParts().length > 0 && (
        <div className="training-card">
          <h2>💡 Next Workout</h2>
          <p>おすすめ：{getWeakParts()[0]}</p>
          <p>最近刺激が少ない部位です</p>
        </div>
      )}

      {parts.map((part) => {
        const count = countPart(part);
        const percent = (count / maxPartCount()) * 100;

        

        return (
          <div className="training-card" key={part}>
            <div className="analysis-row">
              <h3>{part}</h3>
              <p>{count}回</p>
            </div>

            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Analysis;