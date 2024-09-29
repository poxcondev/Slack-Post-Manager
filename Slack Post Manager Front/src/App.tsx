import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "./routes";

function App() {
    return (
        <Router>
            {renderRoutes()}
        </Router>
    );
}

export default App;