import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Travel from "./pages/Travel";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import PrivacyPolicy from "./pages/Privacy";
import TermsAndConditions from "./pages/Terms";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import AdminGallery from "./pages/AdminGallery";
import AdminBlog from "./pages/AdminBlog";
import AdminTravel from "./pages/AdminTravel";
import AppContent from "./components/AppContent";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
