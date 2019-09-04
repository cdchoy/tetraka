
import React, {CSSProperties} from "react"

const Footer: React.FC = () => {
    const rightStyle: CSSProperties = {
        float: 'right',
        padding: 20
    };
    return(
        <footer className="App-footer">
            <p style={rightStyle}> Made with love and coffee</p>
        </footer>
    )
};

export default Footer