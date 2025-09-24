import './Layout.css';
import NavBar from "./NavBar";
import StatusBar from "./StatusBar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout__header">
        <NavBar />
        <StatusBar />
      </header>
      <main className="layout__container">
        {children}
      </main>
    </div>
  );
}
