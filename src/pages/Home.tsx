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
  weeklyCount: number;
  streak: number;
  goTraining: () => void;
  todaySessions: TrainingSession[];
};

function Home({
  today,
  todayCount,
  todaySessions,
  trained,
  prs,
  weeklyCount,
  streak,
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

      <div className="stats-grid">
        <div className="training-card stat-card">
          <h3>This Week 🔥</h3>
          <h1>{weeklyCount}</h1>
          <p>workouts</p>
        </div>

        <div className="training-card stat-card">
          <h3>🔥 Streak</h3>
          <h1>{streak}</h1>
          <p>days</p>
        </div>
      </div>

      <div className="training-card today-card">
        <h3>🔥 Today</h3>
        <p>{today}</p>
        <p>今日のトレーニング：{todayCount}件</p>

        {todaySessions.length === 0 ? (
          <p className="today-message">
            今日はまだ記録がありません
          </p>
        ) : (
          todaySessions.map((session) => (
            <p key={session.id}>
              {session.title}
            </p>
          ))
        )}

        <button onClick={goTraining}>
          Start Workout
        </button>
      </div>

      <div className="training-card">
        <h3>7Days Muscle</h3>
        <MuscleMap trained={trained} />
      </div>

      <div className="training-card">
        <h3>🏆 PR</h3>

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
      </div>
    </div>
  );
}

export default Home;