import { BubbleChart } from "./BubbleChart";
import { useScrollProgress } from "./useScrollProgress";

const stateLabel = (progress: number) => {
  if (progress < 0.34) return "Spredt";
  if (progress < 0.68) return "Samlet";
  return "Pakket";
};

export default function App() {
  const progress = useScrollProgress();

  return (
    <main>
      <div className="story">
        <header className="intro">
          <p className="eyebrow">Scrollytelling</p>
          <h1>Bobler finner form</h1>
          <p className="lede">
            Scroll nedover for å la 120 lilla bobler flyte fra et tilfeldig felt til en samlet klynge og videre inn i
            et pakket boblediagram med bildeklipp i de største sirklene.
          </p>
        </header>

        <div className="stickyStage">
          <BubbleChart progress={progress} />
          <div className="statusPanel" aria-live="polite">
            <span>{stateLabel(progress)}</span>
            <div className="progressTrack">
              <div style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
          </div>
        </div>

        <section className="step stepOne">
          <span>01</span>
          <h2>Start</h2>
          <p>Boblene ligger løst over flaten, med ulike størrelser og nyanser.</p>
        </section>

        <section className="step stepTwo">
          <span>02</span>
          <h2>Midt</h2>
          <p>De trekker mot sentrum og danner en tettere, mykere sky.</p>
        </section>

        <section className="step stepThree">
          <span>03</span>
          <h2>Slutt</h2>
          <p>Diagrammet lander i en pakket form der de største boblene får bilder klippet inn i sirklene.</p>
        </section>
      </div>

      <footer className="legend" aria-label="Forklaring">
        <div>
          <i className="dot dotLight" />
          Små datapunkter
        </div>
        <div>
          <i className="dot dotDark" />
          Store datapunkter
        </div>
        <div>
          <i className="dot dotImage" />
          Bildebobler
        </div>
      </footer>
    </main>
  );
}
