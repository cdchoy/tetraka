import React from "react"

function Footer() {
    const footerStyle = {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '2.5rem'            /* Footer height */
    };
    const rightStyle = {
        float: 'right',
        padding: 20
    };
    return(
        <footer style={footerStyle}>
            <p style={rightStyle}> Made with love and coffee</p>
        </footer>
    )
}

export default Footer