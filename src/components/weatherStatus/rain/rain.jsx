import { random } from "../../../reusables/functions";
import "./rain.css";

function Rain() {
  return (
    <div className="rain">
      {(() => {
        const width = document.getElementById("top").offsetWidth;
        const height =
          document.getElementsByClassName("container")[0].offsetHeight / 4;

        const rains = [];
        for (let i = 0; i < width; i += 7) {
          rains.push(
            <span
              style={{
                "--rain-sp": `${random(10, 30)}`,
                "--rain-left": `${random(0, width - 20)}px`,
                "--rain-top": `${random(-10, 30)}px`,
                "--h": `${height}px`,
              }}
              key={i}
            ></span>
          );
        }
        return rains;
      })()}
    </div>
  );
}

export default Rain;
