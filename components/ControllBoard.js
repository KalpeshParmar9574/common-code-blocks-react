import React, { useState } from 'react'
import Board, { moveCard } from "@asseinfo/react-kanban";
import { board } from '../boardData';
import "@asseinfo/react-kanban/dist/styles.css";
export default function ControllBoard() {
    const [boardData, setBoardData] = useState(board);
    const handleMoveCard = (_card, source, destination) => {
      const updatedBoard = moveCard(boardData, source, destination);
      setBoardData(updatedBoard);
    }
  return (
    <Board onCardDragEnd={handleMoveCard}>{boardData}</Board>
  )
}
