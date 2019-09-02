import React from "react"

class Header extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1> this is a header </h1>
                <p> we could put a navbar here!</p>
            </div>
        )
    }
}

export default Header