import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome CDN
const fontAwesomeCSS = document.createElement('link');
fontAwesomeCSS.rel = 'stylesheet';
fontAwesomeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(fontAwesomeCSS);

// Add Google Fonts for multiple languages
const googleFonts = document.createElement('link');
googleFonts.rel = 'stylesheet';
googleFonts.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
document.head.appendChild(googleFonts);

// Set document title
document.title = "HR Document Management System";

createRoot(document.getElementById("root")!).render(<App />);
