import "./App.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
const About = lazy(() => import("./components/about"));

function App() {
  const [title, setTitle] = useState("Thushara");
  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <div className="App">
      App component
      <Router>
        <Suspense fallback={<div>...Loading</div>}>
          <Route path="/about">
            <About></About>
          </Route>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
