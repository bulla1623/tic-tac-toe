import React, { useRef, useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png'
import cross_icon from '../Assets/cross.png'


let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);
    let [showMsg, setShowMsg] = useState(false);


    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggle = (e, num) => {
        if (lock) {
            return 0;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src ='${cross_icon} '>`;
            data[num] = 'x';
        }
        else {
            e.target.innerHTML = `<img src ='${circle_icon} '>`;
            data[num] = 'o';
        }
        setCount(++count);
        checkWin();
    }

    const checkWin = () => {
        let win = checkForWin();
        if (win !== "") {
            won(win);
            setShowMsg(true);
        }
        else if (data.filter(e => e === "").length === 0) {
            draw();
            setShowMsg(true);
        }
        else {
            setShowMsg(false);
        }
    }

    const checkForWin = () => {
        let win_cases = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < win_cases.length; i++) {
            if (data[win_cases[i][0]] !== "" && data[win_cases[i][0]] === data[win_cases[i][1]] && data[win_cases[i][1]] === data[win_cases[i][2]]) {
                return data[win_cases[i][0]];
            }
        }
        return "";
    }

    const draw = () => {
        setLock(true);
        titleRef.current.innerHTML = `It's a Draw Game`;
    }

    const won = (winner) => {
        setLock(true);
        if (winner === 'x') {
            titleRef.current.innerHTML = `Congratulations <img src=${cross_icon}> won the game`;
        }
        else {
            titleRef.current.innerHTML = `Congratulations <img src=${circle_icon}> won the game`;
        }
    }

    const reset = () => {
        setLock(false);
        setCount(0);
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = "Tic Tac Toe Game in <span>React JS</span>";

        box_array.forEach((box) => {
            if (box.current) {
                box.current.innerHTML = "";
            }
        });
        setShowMsg(false);
    }

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game in <span>React JS</span></h1>
            {showMsg && <div className="msg-box">
                <p>Want to play again?</p>
                <button className='new-game' onClick={reset}>Start New Game</button>
            </div>}
            <div className='board'>
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>

            </div>
            <button className='reset' onClick={reset}>
                Reset
            </button>
        </div>
    )
}

export default TicTacToe
