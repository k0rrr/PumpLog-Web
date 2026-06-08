import MuscleMap from "../components/MuscleMap";

type Props = {
  today: string;
  todayCount: number;
  trained: (part: string) => boolean;
  prs: Record<string, number>;
  weeklyCount: number;
  streak: number;
  goTraining: () => void;
};

function Home({
  today,
  todayCount,
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


      <div className="training-card">
        <h3>This Week 🔥</h3>
        <div className="training-card">
        <h3>🔥 Streak</h3>

        <h1>{streak} days</h1>

        <p>
            Keep going
        </p>
        </div>

        <h1>{weeklyCount}</h1>

        <p>
          workouts completed
        </p>
      </div>


      <div className="training-card today-card">
        <h3>🔥 Today</h3>

        <p>{today}</p>

        <p>
          今日のトレーニング：
          {todayCount}件
        </p>

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
            .map(([name, weight]) => (
              <p key={name}>
                {name}：{weight}kg
              </p>
            ))
        )}

      </div>

    </div>
  );
}

export default Home;