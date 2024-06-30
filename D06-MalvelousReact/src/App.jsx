import Home from "./routes/Home";
import Detail from "./routes/Detail";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./styles/App.module.css";

export default function App() {
  return (
    <div>
      <section className={styles.videoContainer}>
        <video autoPlay muted loop className={styles.videoBackground}>
          <source src={"../assets/marvel_bg.mp4"} type="video/mp4" />
        </video>
      </section>
      <Router>
        <Switch>
          <Route path="/character/:id">
            <Detail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
