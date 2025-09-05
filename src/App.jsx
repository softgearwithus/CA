import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import NoPage from "./components/NoPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DownloadSection from "./pages/DownloadSection";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/downloads" element={<DownloadSection />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
