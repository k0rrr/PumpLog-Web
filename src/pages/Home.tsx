import MuscleMap from "../components/MuscleMap";

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
  today: string;
  todayCount: number;
  trained: (part: string) => boolean;
  prs: Record<string, number>;
  
  goTraining: () => void;
  todaySessions: TrainingSession[];
};

function Home({
  today,
  todayCount,
  todaySessions,
  trained,
  prs,
  
  goTraining,
}: Props) {
  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <p>Welcome back</p>
          <h2>Dashboard</h2>
        </div>

        <span>💪</span>
      </div>

   

      <div className="today-section">

  <p className="date-text">{today}</p>

  <h1>
    {todayCount}
    <span> workouts</span>
  </h1>

  {todaySessions.map((session) => (
    <p 
      className="today-workout"
      key={session.id}
    >
      {session.title}
    </p>
  ))}

  <button 
    className="start-button"
    onClick={goTraining}
  >
    Start Training
  </button>

</div>

      <section className="home-section">
  <h3>Body</h3>
  <MuscleMap trained={trained} />
</section>

      <section className="home-section">
  <h3>Personal Records</h3>

        {Object.keys(prs).length === 0 ? (
          <p className="empty-text">
            まだPR記録がありません
          </p>
        ) : (
          Object.entries(prs)
            .slice(0, 3)
            .map(([name, weight], index) => (
              <div className="pr-row" key={name}>

                <span>
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : "🥉"}
                </span>

                <div>
                  <h4>{name}</h4>
                  <p>{weight}kg</p>
                </div>

              </div>
            ))
                )}
      </section>
    </div>
  );
}

export default Home;