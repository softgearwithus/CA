import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import NoPage from "./components/NoPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DownloadSection from "./pages/DownloadSection";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import AdminApp from "./admin/Adminpage";
import Consultations from "./admin/Consultations";
import DownloadAdmin from "./admin/Download";
import ComplianceAdmin from "./admin/Calender";
import AdminBlog from "./admin/AdminBlog";

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
          <Route path="/blogs/:id" element={<BlogDetails/>} />
          {/* admin */}
          <Route path="/admin" element={<AdminApp/>} />
          <Route path="/admin/consultations" element={<Consultations/>}/>
          <Route path="/admin/dawnload-post" element={<DownloadAdmin/>}/>
          <Route path="/admin/calender-post" element={<ComplianceAdmin/>}/>
          <Route path="/admin/blogs" element={<AdminBlog/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
