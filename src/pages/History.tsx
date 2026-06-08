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


type Props = {
  groupedSessions: () => Record<string, TrainingSession[]>;
};


function History({ groupedSessions }: Props) {
  return (
    <div className="calendar-page">

      <h1>History</h1>

      {Object.entries(groupedSessions()).map(
        ([date, sessions]) => (
          <div key={date}>

            <h2>{date}</h2>

            {sessions.map((session) => (
              <div 
                className="training-card"
                key={session.id}
              >
                <h3>{session.title}</h3>

                {session.exercises.map(
                  (exercise) => (
                    <p key={exercise.id}>
                      {exercise.name}
                      {" "}
                      {exercise.weight}kg ×
                      {exercise.reps}回 ×
                      {exercise.sets}セット
                    </p>
                  )
                )}

              </div>
            ))}

          </div>
        )
      )}

    </div>
  );
}

export default History;