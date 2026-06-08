import MuscleMap from "../components/MuscleMap";

type Props = {
  today: string;
  todayCount: number;
  trained: (part: string) => boolean;
  prs: Record<string, number>;
  goTraining: () => void;
};

function Home({
  today,
  todayCount,
  trained,
  prs,
  goTraining,
}: Props) {
  return (
    <div className="home-page">

      <h2>Dashboard</h2>

      <div className="training-card">
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

        {Object.entries(prs)
          .slice(0, 3)
          .map(([name, weight]) => (
            <p key={name}>
              {name}：{weight}kg
            </p>
          ))}
      </div>

    </div>
  );
}

export default Home;