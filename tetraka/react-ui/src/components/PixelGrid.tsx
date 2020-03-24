import React from "react"
import Pixel from "./Pixel";

export type cell = {
    width: number,
    color: string,
    pos: {row: number, col:number}
}

type PixelGridProps = {
    matrix: Array<Array<cell>>
}

/**
 * Generates the grid of individual pixels given a matrix array
 * @param props
 * @constructor
 */
const PixelGrid: React.FC<PixelGridProps> = (props) => {
    const styles = {
        width: '100px',
    };

    return (
        <div style={styles}>
            {props.matrix.map(col => (
                col.map(cell => (
                    <Pixel cellData={cell}/>
                ))
            ))}
        </div>
    )
};

export default PixelGrid;