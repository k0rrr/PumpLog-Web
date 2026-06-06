type MuscleMapProps = {
  trained: (partName: string) => boolean;
};

function MuscleMap({ trained }: MuscleMapProps) {
  return (
    <div className="muscle-map-svg">
      <div className="map-head">頭</div>

      <div className="map-row">
        <div className={trained("肩") ? "body-part active" : "body-part"}>
          肩
        </div>
        <div className={trained("胸") ? "body-part active" : "body-part"}>
          胸
        </div>
        <div className={trained("肩") ? "body-part active" : "body-part"}>
          肩
        </div>
      </div>

      <div className="map-row">
        <div className={trained("腕") ? "body-part active" : "body-part"}>
          腕
        </div>
        <div className={trained("腹筋") ? "body-part active" : "body-part"}>
          腹筋
        </div>
        <div className={trained("腕") ? "body-part active" : "body-part"}>
          腕
        </div>
      </div>

      <div className={trained("脚") ? "body-part active legs" : "body-part legs"}>
        脚
      </div>
    </div>
  );
}

export default MuscleMap;