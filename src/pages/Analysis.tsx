import { useState } from "react";

type Progress = {
  date: string;
  weight: number;
};

type Props = {
  exerciseNames: string[];
  getExerciseProgress: (exerciseName: string) => Progress[];
};

function Analysis({
  exerciseNames,
  getExerciseProgress,
}: Props) {
  const [selectedExercise, setSelectedExercise] = useState("");

  const progress = selectedExercise
    ? getExerciseProgress(selectedExercise)
    : [];

  const maxWeight = Math.max(
    ...progress.map((item) => item.weight),
    1
  );

  return (
    <div className="analysis-page">
      <div className="page-header">
        <div>
          <p>Progress</p>
          <h2>Analysis</h2>
        </div>
      </div>

      <select
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        <option value="">種目を選択</option>

        {exerciseNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {!selectedExercise && (
        <p className="empty-text">
          成長を見たい種目を選択してください。
        </p>
      )}

      {selectedExercise && progress.length === 0 && (
        <p className="empty-text">
          この種目の記録がありません。
        </p>
      )}

      {selectedExercise && progress.length > 0 && (
        <div className="line-chart-card">
          <h3>{selectedExercise}</h3>

          <div className="simple-line-chart">
            <svg
              viewBox="0 0 320 180"
              className="line-chart-svg"
            >
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={progress
                  .map((item, index) => {
                    const x =
                      progress.length === 1
                        ? 160
                        : (index / (progress.length - 1)) * 280 + 20;

                    const y =
                      160 - (item.weight / maxWeight) * 120;

                    return `${x},${y}`;
                  })
                  .join(" ")}
              />

              {progress.map((item, index) => {
                const x =
                  progress.length === 1
                    ? 160
                    : (index / (progress.length - 1)) * 280 + 20;

                const y =
                  160 - (item.weight / maxWeight) * 120;

                return (
                  <circle
                    key={item.date}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#2563eb"
                  />
                );
              })}
            </svg>
          </div>

          <div className="chart-records">
            {progress.map((item) => (
              <div className="chart-record-row" key={item.date}>
                <span>{item.date}</span>
                <strong>{item.weight}kg</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analysis;