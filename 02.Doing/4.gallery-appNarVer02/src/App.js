import './App.css';
import Layout from './layout/Layout';
import Albums from './pages/albums';
import Photos from './pages/photos';

export default function App() {
  return (
    <div className="App">
      <h1 className="app__title">App</h1>
      <Layout>
        <Albums />
        <Photos />
      </Layout>
    </div>
  );
}
