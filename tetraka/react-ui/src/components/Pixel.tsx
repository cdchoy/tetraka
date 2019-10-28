import React from "react"

const GRID_INITIAL_COLOR: string = '#313131';

type PixelProps = {
    width:number;
    color:string;
}

class Pixel extends React.Component<PixelProps, {}> {

    shouldComponentUpdate(nextProps: Readonly<PixelProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        const isSame: boolean = (this.props.width === nextProps.width) || (this.props.color === nextProps.color);
        return !isSame;
    }

    render() {
        const {width, color} = this.props;

        const styles = {
            width: width + '%',
            paddingBottom: width + '%',
            backgroundColor: color || GRID_INITIAL_COLOR
        };

        return (<div style={styles}/>)
    }
}

export default Pixel;