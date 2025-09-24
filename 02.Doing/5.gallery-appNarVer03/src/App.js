import { useState } from 'react';
import photoData from './data/photos';
import albumsData from './data/albums';
import './App.css';
import Layout from './layout/Layout';
import Albums from './pages/albums';
import Photos from './pages/photos';

export default function App() {
  
  const [activeTab, setActiveTab] = useState('albums');
return (
    <div className="App">
      <h1 className="app__title">App</h1>
      <Layout activeTab={activeTab} onTabChange={setActiveTab} albumsCount={albumsData?.length || 0} photosCount={(photoData?.length || 0)} >
        <Albums />
        <Photos />
      </Layout>
    </div>
  );
}