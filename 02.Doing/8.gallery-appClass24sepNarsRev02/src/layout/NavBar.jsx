
export default function NavBar({currentView,onViewChange}){
  return (<div>
    <h2>Navigation Bar</h2>
    <button
      onClick={()=>onViewChange('photos')}
      disabled={currentView==='photos'}
      >Photos</button>
    <button
      onClick={()=>onViewChange('albums')}
      disabled={currentView==='albums'}>Albums</button>
      <button
      onClick={()=>onViewChange('newPhoto')}
      disabled={currentView==='newPhoto'}
      >Add Photo</button>
      <button
      onClick={()=>onViewChange('newAlbum')}
      disabled={currentView==='newAlbum'}
      >New Album</button>
    </div>);
}