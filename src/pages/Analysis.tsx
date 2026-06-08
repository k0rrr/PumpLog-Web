type Props = {
  parts: string[];
  countPart: (part: string) => number;
  maxPartCount: () => number;
  getWeakParts: () => string[];
};

function Analysis({
  parts,
  countPart,
  maxPartCount,
  getWeakParts,
}: Props) {
  return (
    <div className="analysis-page">
      <h1>7Days Analysis</h1>

      {getWeakParts().length > 0 && (
        <div className="training-card">
          <h2>💡 Next Workout</h2>
          <p>おすすめ：{getWeakParts()[0]}</p>
          <p>最近刺激が少ない部位です</p>
        </div>
      )}

      {parts.map((part) => {
        const count = countPart(part);
        const percent = (count / maxPartCount()) * 100;

        return (
          <div className="training-card" key={part}>
            <div className="analysis-row">
              <h3>{part}</h3>
              <p>{count}回</p>
            </div>

            <div className="bar-bg">
              <div
                className="bar-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Analysis;