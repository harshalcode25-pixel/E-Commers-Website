import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store.js";
import axios from "axios";

// All API requests go directly to the backend, which handles CORS.
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://e-commers-website-1-micv.onrender.com";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
