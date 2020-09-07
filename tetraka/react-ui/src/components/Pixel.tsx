import React from "react"
import {cell} from "./PixelGrid";

const GRID_INITIAL_COLOR: string = '#313131';

type PixelProps = {
    cellData:cell;
}

/**
 * Renders the pixel as a div block
 */
class Pixel extends React.Component<PixelProps, {}> {

    constructor(props: any) {
        super(props);
        this.columnToWidth = this.columnToWidth.bind(this);
    }

    shouldComponentUpdate(nextProps: Readonly<PixelProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        const cell = this.props.cellData;
        const nextCell = nextProps.cellData;
        const isSame: boolean = (cell.width === nextCell.width) && (cell.color === nextCell.color);
        return !isSame;
    }

    render() {
        const cell = this.props.cellData;

        const styles = {
            width: '10%',
            paddingBottom: '10%',
            marginLeft: this.columnToWidth(cell.pos.col),
            marginTop: this.columnToWidth(cell.pos.row),
            borderStyle: 'groove',
            borderWidth: 1,
            backgroundColor: cell.color || GRID_INITIAL_COLOR
        };

        console.log(cell.width);

        return (<div style={styles} className={"foobar"}/>)
    }

    columnToWidth(n: number) {
        const s = n * 10 + 1;
        return s.toString() + '%'
    }
}

export default Pixel;