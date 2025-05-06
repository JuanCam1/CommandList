import { createRoot } from "react-dom/client";
import App from "./main";
import "./index.css";

const idRoot = document.getElementById("root") as HTMLElement;

const root = createRoot(idRoot);

root.render(<App />);
