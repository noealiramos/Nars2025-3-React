import './App.css';
import Layout from './layout/Layout';
import AlbumCard from './molecules/AlbumCard';
import PhotoCard from './molecules/PhotoCard';

function App() {
  const albums = [{
    title:"My Album",
    description:"Description",
    images:[{url:"",name:"My Image"}],
  }]

const image = {url:"", title:"Photo1", description:"Photo1 Description", location:"Ags, Mex"}


  return (
    <div className="App">
      <h1>App</h1>
      <Layout>
        <AlbumCard album={albums[0]}></AlbumCard>
        <PhotoCard image={image}></PhotoCard>
      </Layout>
    </div>
  );
}

export default App;
