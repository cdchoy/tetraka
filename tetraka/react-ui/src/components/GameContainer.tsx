import React from "react"
import {SocketContext} from "./SocketContext";
import PixelGrid, {cell} from "./PixelGrid";
import {UserSettings} from "./UserSettings";

type GameContainerProps = {
    columns: number,
    rows: number
}

type GameContainerState = {
    grid: number[][],
    matrix: cell[][]
}

/**
 * Stores and renders game metadata including cell matrix and number grid
 */
class GameContainer extends React.Component<GameContainerProps,GameContainerState> {
    static contextType = SocketContext;
    readonly columns: number;

    constructor(props: GameContainerProps) {
        super(props);
        this.state = {
            grid: GameContainer.initializeGrid(props.rows, props.columns),
            matrix: this.initializeMatrix(props.rows, props.columns)
        };
        this.columns = props.columns;
        this.updateMatrixFromGrid = this.updateMatrixFromGrid.bind(this);
        this.numberToColor = this.numberToColor.bind(this);
    }

    render() {
        let socket = this.context;

        return (
            <div onKeyDown={socket.emitKeyDown} onKeyUp={socket.emitKeyUp} tabIndex={0}>
                <PixelGrid matrix={this.state.matrix}/>
            </div>
        )
    }

    static initializeGrid(height:number, width:number): number[][] {
        let grid: number[][] = [];
        for (let col=0; col < width; col++) {
            let newCol: number[] = [];
            for (let row=0; row < height; row++) {
                newCol.push(0);
            }
            grid.push(newCol);
        }
        return grid;
    }

    initializeMatrix(height:number, width:number): cell[][] {
        let matrix: cell[][] = [];
        for (let col=0; col < width; col++) {
            let newCol: cell[] = [];
            for (let row=0; row < height; row++) {
                let c: cell = {
                    width: 100/this.columns,
                    color: 'white',
                    pos: {row:row, col:col}
                };
                newCol.push(c);
            }
            matrix.push(newCol);
        }
        return matrix;
    }

    updateMatrixFromGrid(grid: number[][]) {
        for (let y in grid) {
            for (let x in grid[y]) {
                let color: string = this.numberToColor(grid[x][y]);
                if (color !== this.state.matrix[x][y].color) {
                    this.setState(prevState => {
                        let updatedMatrix = prevState.matrix;
                        updatedMatrix[x][y].color = color;
                        return {matrix: updatedMatrix}
                    });
                }
            }
        }
    }

    numberToColor(tetriminoID: number): string {
        let settings: UserSettings = new UserSettings(); // todo grab from global user acct
        return settings.BlockColors[tetriminoID];
    }
}

export default GameContainer;