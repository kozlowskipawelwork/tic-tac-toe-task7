
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'


 
const Field = (text) => {
  return(
    <button 
    className="field"
    onClick={text.onClickEvent}
    
    >
    {text.value}
    </button>
      
  );

};



const Board =() =>{
  

  const initialFields = Array(9).fill(null);
  const [fields, setFields] = useState(initialFields);
  const [xIsNext, setXIsNext] = useState(true);


  const clickEventHandler =(i)=>{
    const newFields = [...fields];

    const winnerDeclared = Boolean(calculateWhoWins(newFields));
    const fieldFilled = Boolean(newFields[i]);
    if (winnerDeclared || fieldFilled) {
      return;
    }

    newFields[i] = xIsNext ? "X" : 'O';
    setFields(newFields);
    setXIsNext(!xIsNext);

  }

  const renderField = (i) => {
    return (
      <Field 
      
      value={fields[i]}
      onClickEvent={() => clickEventHandler(i)}
      
      />
    )
  }
  const winner = calculateWhoWins(fields);
  const player_status = winner ?
    `winner: ${winner} wins`:
   `Next player:  ${xIsNext ? 'X' : 'O'}`;
 
  return (
    <div style={{
      backgroundColor: "grey",
      margin:35,
      padding:50
    }
    }
    >
      <div className='player_status'>{player_status}</div>
      <div className="fields-row">
      {renderField(0)}{renderField(1)}{renderField(2)}
      </div>
      <div className="fields-row">
      {renderField(3)}{renderField(4)}{renderField(5)}
      </div>
      <div className="fields-row">
      {renderField(6)}{renderField(7)}{renderField(8)}
      </div>
    </div>
  )
}

const Game = () =>{
  return (
    <div className="game">
      Game
      <Board/>
    </div>
  );
};


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

function calculateWhoWins(fields){
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let line of lines){
    const [a,b,c] = line;
    if (fields[a] && fields[a]=== fields[b] && fields[a]== fields[c])
    return fields[a];
  }
return null;
}