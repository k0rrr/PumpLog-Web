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
  part: string;
  date: string;
  exercises: TrainingExercise[];
};

type Props = {
  groupedSessions: () => Record<string, TrainingSession[]>;
};

function History({ groupedSessions }: Props) {
  return (
    <div className="calendar-page">
      <h1>History</h1>

      {Object.entries(groupedSessions()).map(([date, sessions]) => (
        <div key={date}>
          <h2>{date}</h2>

          {sessions.map((session) => (
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
        </div>
      ))}
    </div>
  );
}

export default History;