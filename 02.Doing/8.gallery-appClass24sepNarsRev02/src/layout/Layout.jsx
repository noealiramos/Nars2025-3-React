import NavBar from "./NavBar";
import StatusBar from "./StatusBar";

export default function Layout({children, currentView, onViewChange}){
return(<div>
  <header>
    <NavBar currentView={currentView} onViewChange={onViewChange}/>
    <StatusBar currentView={currentView}/>
  </header>
    <main>
      {children}
    </main>
</div>);
}