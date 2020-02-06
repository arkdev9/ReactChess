import React from "react";
import { ReactSVG } from "react-svg";
import "../App.css";
import { Row, Col } from "reactstrap";

var indices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

/**
 * Get a new board object with pieces set at correct position.
 * Need to implement getting a reversed instance for other player.
 */
function getNewBoard() {
	let board = { 'a': {}, 'b': {}, 'c': {}, 'd': {}, 'e': {}, 'f': {}, 'g': {}, 'h': {} };

	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			board[indices[i]][j] = { piece: '-', color: 0 };
		}
	}
	// Rook at all corners
	board['a']['0'] = { piece: 'rook', player: 'black' };
	board['a']['7'] = { piece: 'rook', player: 'black' };
	board['h']['0'] = { piece: 'rook', player: 'white' };
	board['h']['7'] = { piece: 'rook', player: 'white' };

	// All other pieces
	board['a'][1] = { piece: 'knight', player: 'black' };
	board['a'][6] = { piece: 'knight', player: 'black' };
	board['h'][1] = { piece: 'knight', player: 'white' };
	board['h'][6] = { piece: 'knight', player: 'white' };
	board['a'][2] = { piece: 'bishop', player: 'black' };
	board['a'][5] = { piece: 'bishop', player: 'black' };
	board['h'][2] = { piece: 'bishop', player: 'white' };
	board['h'][5] = { piece: 'bishop', player: 'white' };
	board['a'][4] = { piece: 'king', player: 'black' };
	board['h'][4] = { piece: 'king', player: 'white' };
	board['a'][3] = { piece: 'queen', player: 'black' };
	board['h'][3] = { piece: 'queen', player: 'white' };

	for (let i = 0; i < 8; i++) {
		board[indices[1]][i] = { piece: 'pawn', player: 'black' };
		board[indices[6]][i] = { piece: 'pawn', player: 'white' };
	}

	// Set initial colors
	let c = 0;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			let backColor = (c % 2 === 0) ? 'white' : 'black';
			let textColor = (backColor === 'white') ? 'black' : 'white';
			board[indices[i]][j].color = backColor;
			board[indices[i]][j].textColor = textColor;
			c++;
		}
		c++;
	}

	return board;
}

/**
 * @param board A board object 
 * @param selectedSquare Object of row and column (if undefined, board will be rendered black and white) -> eg. {row, col}
 * @param handleClick Function reference that is bound to Board instance
 */
function getRenderable(board, handleClick) {
	// Array for each row
	let b = [];
	for (let i = 0; i < 8; i++) {
		let row = [];
		for (let j = 0; j < 8; j++) {
			let square = board[indices[i]][j];
			row.push(getSquare(i, j, square.piece, handleClick, square.player));
		}
		b.push(<Row key={i}>{row}</Row>);
	}

	return b;
}

function setColors(board) {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			let x = document.getElementById(((i * 10) + j).toString());
			x.style.backgroundColor = board[indices[i]][j].color;
			x.style.color = board[indices[i]][j].textColor;
		}
	}
}

function resetColors(board) {
	let c = 0;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			board[indices[i]][j].color = (c % 2 === 0) ? 'white' : 'black';
			c++;
		}
		c++;
	}
	return board;
}

function getSquare(row, col, piece, handleClick, player) {
	let src = (player === undefined)
		? 'NO_PIECE'
		: (<ReactSVG
			row={row}
			col={col}
			piece={piece}
			src={'/pieces/' + piece + '_' + player + '.svg'}></ReactSVG>);

	return (
		<Col
			className="squareDiv"
			id={((row * 10) + col).toString()}
			key={col}
			row={row}
			col={col}
			piece={piece}
			onClick={handleClick}>
			{src === "NO_PIECE" ? (<p>-</p>) : src}
		</Col>
	);
}

export {
	getNewBoard,
	getRenderable,
	setColors,
	resetColors,
	indices
};