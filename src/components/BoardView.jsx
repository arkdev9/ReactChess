import React from "react";
import { getNewBoard, getRenderable, setColors, indices } from "../utils/boardUtils";
import getPossibleMoves from "../utils/possibleMoves";
import movePiece from "../utils/movePiece";
import "../App.css";
import { Container } from "reactstrap";

class BoardView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			board: getNewBoard()
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		let row = parseInt(event.target.getAttribute("row"));
		let col = parseInt(event.target.getAttribute("col"));
		let sourceSquare = this.state.board[indices[row]][col];
		sourceSquare.row = row;
		sourceSquare.col = col;

		// If square is already selected, set targetSquare as the next square
		if (this.state.selectedSquare !== undefined) {
			// This could mean the user selected a target square to move the
			// selected piece, or it could mean he chose a different piece
			if (sourceSquare.player === this.state.selectedSquare.player) {
				// Player wants to reselect source piece so reset selected square
				this.setState({
					...this.state,
					board: getPossibleMoves(this.state.board,
						sourceSquare),
					selectedSquare: sourceSquare
				});
			} else {
				this.setState({
					board: movePiece(this.state.board, this.state.selectedSquare, sourceSquare),
					selectedSquare: undefined
				});
			}
		} else {
			// Set selectedSquare so it can be rendered.
			this.setState({
				...this.state,
				board: getPossibleMoves(this.state.board,
					sourceSquare),
				selectedSquare: sourceSquare
			});
		}

	}

	render() {
		return (
			<Container>
				{getRenderable(this.state.board, this.handleClick)}
			</Container>
		);
	}

	componentDidMount() {
		setColors(this.state.board);
	}
	componentDidUpdate() {
		setColors(this.state.board);
	}

}

export default BoardView