import React from "react"
import Pixel from "./Pixel";

export type cell = {
    width: number,
    color: string
}

type PixelGridProps = {
    matrix: Array<Array<cell>>
}

const PixelGrid: React.FC<PixelGridProps> = (props) => {
    const styles = {
        width: 100,
    };

    return (
        <div style={styles}>
            {props.matrix.map(col => (
                col.map(cell => (
                    <Pixel
                        width={cell.width}
                        color={cell.color}
                    />
                ))
            ))}
        </div>
    )
};

export default PixelGrid;