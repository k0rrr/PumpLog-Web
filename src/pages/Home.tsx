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
  goTraining: () => void;
  todaySessions: TrainingSession[];

  weeklyCount: number;
  weeklyParts: number;
  weeklyVolume: number;
};

function Home({
  today,
  todayCount,
  todaySessions,
  trained,
  goTraining,
  weeklyCount,
  weeklyParts,
  weeklyVolume,
}: Props) {
  return (
    <div className="home-page">
      <div className="home-header">
        <div>
          <p>Welcome back</p>
          <h2>PumpLog 💪</h2>
        </div>
      </div>

      <div className="hero-card">
        <p>Today's Training</p>

        <h1>
          {todayCount}
          <span> workouts</span>
        </h1>

        <small>{today}</small>

        {todaySessions.map((session) => (
          <div className="recent-row" key={session.id}>
            🏋️ {session.title}
          </div>
        ))}

        <button onClick={goTraining}>Start Training</button>
      </div>

      <section className="home-section">

  <h3>This Week</h3>


  <div className="weekly-summary">

  <div className="main-stat">
    <span>🔥</span>

    <div>
      <h2>{weeklyCount}</h2>
      <p>Workouts this week</p>
    </div>
  </div>


  <div className="summary-row">

    <p>
      💪 {weeklyParts} parts trained
    </p>

    <p>
      🏋️ {(weeklyVolume / 1000).toFixed(1)}t lifted
    </p>

  </div>

</div>

</section>

      <section className="home-section">
        <h3>Body Map</h3>
        <MuscleMap trained={trained} />
      </section>
    </div>
  );
}

export default Home;