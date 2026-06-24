type Props = {
  trained: (part: string) => boolean;
};

function MuscleMap({ trained }: Props) {
  return (
    <div className="bodymap-container">

      <div className="bodymap">
        <p>FRONT</p>

        <div className="body-image">
          <img src="/bodymap/front.png" />

          {trained("胸") && (
            <img src="/bodymap/front-chest.png" />
          )}

          {trained("肩") && (
            <img src="/bodymap/front-shoulder.png" />
          )}

          {trained("腕") && (
            <img src="/bodymap/front-arm.png" />
          )}

          {trained("脚") && (
            <img src="/bodymap/front-leg.png" />
          )}

        </div>
      </div>


      <div className="bodymap">
        <p>BACK</p>

        <div className="body-image">
          <img src="/bodymap/back.png" />

          {trained("背中") && (
            <img src="/bodymap/back-back.png" />
          )}

          {trained("肩") && (
            <img src="/bodymap/back-shoulder.png" />
          )}

          {trained("腕") && (
            <img src="/bodymap/back-arm.png" />
          )}

          {trained("脚") && (
            <img src="/bodymap/back-leg.png" />
          )}

        </div>
      </div>

    </div>
  );
}

export default MuscleMap;