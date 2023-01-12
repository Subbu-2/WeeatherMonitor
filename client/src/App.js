import './App.scss';
import Search from './component/search/index.js';

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  }
  return (
    <div className="main-container">
      <Search  onSearchChange={handleOnSearchChange} />
    </div>
  );
}

export default App;
