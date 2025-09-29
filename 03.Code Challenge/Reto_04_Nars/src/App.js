import { useState } from 'react';
import './App.css';
import Layout from './layout/Layout';
import Albums from './pages/Albums';
import EditAlbum from './pages/EditAlbum';
import EditPhoto from './pages/EditPhoto';
import Photos from './pages/Photos';

function App() {
  const [currentView, setCurrentView] = useState('photos');

  const renderCurrentView = ()=>{
    switch(currentView){
      case 'albums':
        return <Albums />;
      case 'photos':
        return <Photos/>;
      case 'newPhoto':
        return <EditPhoto/>;
      case 'newAlbum':
        return <EditAlbum/>;
      default:
        return <Photos/>;
    }
  }

  return (
    <div className="App">
      <h1>Gallery App</h1>
      <Layout currentView={currentView} onViewChange={setCurrentView}>
        {renderCurrentView()}
      </Layout>
    </div>
  );
}

export default App;
