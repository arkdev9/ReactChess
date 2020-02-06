import { indices, resetColors } from "./boardUtils";

/**
 * @param {Object} board Board object containing source and target
 * @param {Object} source Object containing the details of source piece
 * @param {Object} target Object containing the square object for target
 */

function movePiece(board, source, target) {
	// Whatever is in target, overwrite it
	board[indices[source.row]][source.col] = {
		...source,
		piece: '-',
		player: undefined
	};
	source.row = target.row;
	source.col = target.col;
	board[indices[target.row]][target.col] = source;
	board = resetColors(board);
	return board;
}

export default movePiece;