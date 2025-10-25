import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
import Newsletter from "./Newsletter/Newsletter";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      {children}
      <Newsletter />
      <Footer />
    </div>
  );
}
