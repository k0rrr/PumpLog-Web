import { useState } from "react";

type MuscleMapProps = {
  trained: (partName: string) => boolean;
};

const parts = ["胸", "背中", "肩", "腕", "脚"];

function MuscleMap({ trained }: MuscleMapProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  function muscleClass(part: string, className: string) {
    return trained(part)
      ? `muscle ${className} active`
      : `muscle ${className}`;
  }

  return (
    <div className="muscle-model-wrapper">
      <div className="muscle-model">
        <div className="shoulder-row">
          <button
            className={muscleClass("肩", "shoulder")}
            onClick={() => setSelectedPart("肩")}
          />
          <button
            className={muscleClass("肩", "shoulder")}
            onClick={() => setSelectedPart("肩")}
          />
        </div>

        <div className="upper-body">
          <button
            className={muscleClass("腕", "arm left-arm")}
            onClick={() => setSelectedPart("腕")}
          />

          <div className="torso">
            <button
              className={muscleClass("胸", "chest")}
              onClick={() => setSelectedPart("胸")}
            >
              胸
            </button>

            <button
              className={muscleClass("背中", "back")}
              onClick={() => setSelectedPart("背中")}
            >
              背中
            </button>
          </div>

          <button
            className={muscleClass("腕", "arm right-arm")}
            onClick={() => setSelectedPart("腕")}
          />
        </div>

        <div className="legs-row">
          <button
            className={muscleClass("脚", "leg")}
            onClick={() => setSelectedPart("脚")}
          />
          <button
            className={muscleClass("脚", "leg")}
            onClick={() => setSelectedPart("脚")}
          />
        </div>
      </div>

      {selectedPart && (
        <div className="muscle-detail-card">
          <h3>{selectedPart}</h3>
          <p>
            {trained(selectedPart)
              ? "直近7日以内にトレーニング済み"
              : "直近7日以内の記録なし"}
          </p>
        </div>
      )}
    </div>
  );
}

export default MuscleMap;