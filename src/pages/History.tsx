import { useState } from "react";

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

type Props = {
  groupedSessions: () => Record<string, TrainingSession[]>;
};

function History({ groupedSessions }: Props) {
  const groups = groupedSessions();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("ja-JP")
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: firstDay + lastDate }, (_, index) => {
    if (index < firstDay) return null;
    return index - firstDay + 1;
  });

  function formatDate(day: number) {
    return new Date(year, month, day).toLocaleDateString("ja-JP");
  }

  return (
    <div className="calendar-page">
      <h1>Calendar</h1>

      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
          ＜
        </button>

        <h2>
          {year}年{month + 1}月
        </h2>

        <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
          ＞
        </button>
      </div>

      <div className="calendar-week">
        <span>日</span>
        <span>月</span>
        <span>火</span>
        <span>水</span>
        <span>木</span>
        <span>金</span>
        <span>土</span>
      </div>

      <div className="calendar-grid">
        {days.map((day, index) =>
          day === null ? (
            <div key={index} />
          ) : (
            <button
              key={index}
              className={[
                groups[formatDate(day)] ? "trained-day" : "",
                selectedDate === formatDate(day) ? "selected-day" : "",
              ].join(" ")}
              onClick={() => setSelectedDate(formatDate(day))}
            >
              {day}
            </button>
          )
        )}
      </div>

      <h2>{selectedDate}</h2>

      {groups[selectedDate]?.map((session) => (
        <div className="training-card" key={session.id}>
          <h3>{session.title}</h3>

          {session.exercises.map((exercise) => (
            <div key={exercise.id}>
              <h4>{exercise.name}</h4>

              {exercise.sets.map((set, index) => (
                <p key={set.id}>
                  Set {index + 1}：{set.weight}kg × {set.reps}回
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}

      {!groups[selectedDate] && (
        <p className="empty-text">この日の記録はありません。</p>
      )}
    </div>
  );
}

export default History;