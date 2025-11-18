import React, { useState, useEffect } from 'react';
import s from './tic-tac-toe.module.css'
import { checkCols, checkDias, checkRows } from './utils';

const TicTacToe = ({size = 4}) => {
    const validSize = Math.min(8, Math.max(3, size));
    const [grid, setGrid] = useState(Array.from({length: validSize}, ()=>Array(validSize).fill(" ")));
    const [curr, setCurr] = useState("X");
    const alertWin = () => {
        alert(`${curr === "O" ? "X" : "O"} player won`)
    }
    const handleUpdate = (i, j) => {
        if (grid[i][j] !== " "){
            return;
        }
        setGrid(prev => {
            const newGrid = prev.map(row => [...row]);
            newGrid[i][j] = curr;
            return newGrid;
        })
        setCurr(prev => prev === "X" ? "O" : "X");
    }
    const handleReset = () => {
        setGrid(Array.from({length: validSize}, ()=>Array(validSize).fill(" ")));
        setCurr("X");
    }

    useEffect(()=>{
        if(checkRows(grid, validSize) || checkCols(grid, validSize) || checkDias(grid, validSize)){
            alertWin();
        }
    }, [grid])

    return (<>
        <div className={s.conatiner}>
            <h2>Tic Tac Toe</h2>
            {Array.from({length: validSize}).map((_, outerIdx) => {
                return <div className={s.rows} key={`__${outerIdx}`}>
                    {Array.from({length: validSize}).map((__, innerIdx) => {
                        const id = `${outerIdx}_${innerIdx}`;
                        return <div className={`${s.columns} ${grid[outerIdx][innerIdx] === "X" ? s.xblock : grid[outerIdx][innerIdx] === "O" ? s.oblock : ""}`} key={`${innerIdx}__`} id={id} onClick={()=>handleUpdate(outerIdx, innerIdx)}>
                            {grid[outerIdx][innerIdx]}
                        </div>
                    })}
                </div>
            })}
            <button className={s.reset} onClick={()=>handleReset()}>Reset</button>
        </div>
    </>)
}

export default TicTacToe;