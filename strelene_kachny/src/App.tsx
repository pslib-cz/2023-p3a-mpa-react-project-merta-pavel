import GameBoardProps from './component/GameBoardComponent';
import './App.css';
import GameBoardComponent from './component/GameBoardComponent';

function App() {
  const cardData = {}; // Replace with the actual card data

  return (
    <>
      <GameBoardComponent someCardData={cardData} />
    </>
  )
}

export default App;