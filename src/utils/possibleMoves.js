import { indices, resetColors } from "./boardUtils";

/**
 * @param {Object} board Board object containing present state
 * @param {Object} selectedSquare Object containing row and column of selected squares
 * @param {String} piece String containing piece name
 */
function getPossibleMoves(board, selectedSquare) {
	board = resetColors(board);
	let row = selectedSquare.row;
	let col = selectedSquare.col;
	switch (selectedSquare.piece) {
		case 'bishop':
			// All diagonal squares from selected square need to be rendered green
			// Up and right
			for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++ , j++) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			// Up and left
			for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++ , j--) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			// Down and right
			for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i-- , j++) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			// Down and left
			for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i-- , j--) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			break;
		case 'pawn':
			// This is where we need to check blacks and whites. But for now, let's just check
			// for all blacks.
			// Mark row + 1 diagonally green
			// TODO: Check which player is making the move
			console.log(selectedSquare.row);
			if (selectedSquare.player === 'white') {
				if (col !== 7 && board[indices[row - 1]][col + 1].piece === '-') {
					board[indices[row - 1]][col + 1].color = 'green';
				}
				if (col !== 0 && board[indices[row - 1]][col - 1].piece === '-') {
					board[indices[row - 1]][col - 1].color = 'green';
				}
			} else {
				if (col !== 7 && board[indices[row + 1]][col + 1].piece === '-') {
					board[indices[row + 1]][col + 1].color = 'green';
				}
				if (col !== 0 && board[indices[row + 1]][col - 1].piece === '-') {
					board[indices[row + 1]][col - 1].color = 'green';
				}
			}
			break;
		case 'queen':
			// Up and right
			for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++ , j++) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			// Up and left
			for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++ , j--) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			// Down and right
			for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i-- , j++) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			// Down and left
			for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i-- , j--) {
				if (board[indices[i]][j].piece === '-') {
					board[indices[i]][j].color = 'green';
				} else {
					break;
				}
			}
			// Up, down, left, right
			for (let i = row - 1; i >= 0; i++) {
				if (board[indices[i]][col].piece === '-') {
					board[indices[i]][col].color = 'green';
				} else {
					break;
				}
			}
			for (let i = row + 1; i < 8; i++) {
				if (board[indices[i]][col].piece === '-') {
					board[indices[i]][col].color = 'green';
				} else {
					break;
				}
			}
			for (let i = col - 1; i >= 0; i++) {
				if (board[indices[col]][i].piece === '-') {
					board[indices[col]][i].color = 'green';
				} else {
					break;
				}
			}
			for (let i = col + 1; i < 8; i++) {
				if (board[indices[col]][i].piece === '-') {
					board[indices[col]][i].color = 'green';
				} else {
					break;
				}
			}
			break;

		default:
			return board;
	}
	console.log("returning possible moves");
	return board;
}

export default getPossibleMoves;