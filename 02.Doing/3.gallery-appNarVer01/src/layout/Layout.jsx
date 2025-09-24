import NavBar from "./NavBar";
import StatusBar from "./StatusBar";

export default function Layout({children}){
return(<div>
  <header>
    <NavBar/>
    <StatusBar/>
  </header>
    <main>
      {children}
    </main>
</div>);
}