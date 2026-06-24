import { useState } from "react";

type Progress = {
  date: string;
  weight: number;
};

type Props = {
  exerciseNames: string[];
  getExerciseProgress: (exerciseName: string) => Progress[];
  weeklyVolume: number;
  weeklyCount: number;
};

function Analysis({
  exerciseNames,
  getExerciseProgress,
  weeklyVolume,
  weeklyCount,
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

<div className="analysis-summary-card">
  <p>This Week Volume</p>

  <h2>
    {(weeklyVolume / 1000).toFixed(1)}t
  </h2>

  <span>
    {weeklyCount} workouts this week
  </span>
</div>

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

          <option
            key={name}
            value={name}
          >
            {name}
          </option>

        ))}

      </select>



      {!selectedExercise && (

        <p className="empty-text">
          成長を見たい種目を選択してください。
        </p>

      )}




      {selectedExercise &&
        progress.length === 0 && (

        <p className="empty-text">
          この種目の記録がありません。
        </p>

      )}




      {selectedExercise &&
        progress.length > 0 && (

        <div className="line-chart-card">


          <h3>{selectedExercise}</h3>



          <div className="progress-summary">

            <p>Best</p>

            <h2>
              {maxWeight}kg
            </h2>

          </div>



          <div className="simple-line-chart">

            <svg
              viewBox="0 0 320 180"
              className="line-chart-svg"
            >

              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"

                points={
                  progress
                    .map((item, index) => {

                      const x =
                        progress.length === 1
                          ? 160
                          : (index /
                              (progress.length - 1))
                              * 280 + 20;


                      const y =
                        160 -
                        (item.weight / maxWeight)
                        * 120;


                      return `${x},${y}`;

                    })
                    .join(" ")
                }
              />



              {progress.map((item, index) => {

                const x =
                  progress.length === 1
                    ? 160
                    : (index /
                        (progress.length - 1))
                        * 280 + 20;


                const y =
                  160 -
                  (item.weight / maxWeight)
                  * 120;


                return (

                  <circle
                    key={item.date}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#ef4444"
                  />

                );

              })}

            </svg>

          </div>



          <div className="chart-records">

            {progress.map((item) => (

              <div
                className="chart-record-row"
                key={item.date}
              >

                <span>
                  {item.date}
                </span>


                <strong>
                  {item.weight}kg
                </strong>

              </div>

            ))}

          </div>


        </div>

      )}


    </div>
  );
}


export default Analysis;