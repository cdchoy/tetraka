import React from 'react';
import '../css/App.css';
import logo from "../logo.svg";
import MyNavbar from "./MyNavbar";

type AppState = {
    location: string
}

class App extends React.Component<{},AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            location: "landing"
        };
    }

    render() {
        return (
            <div className="App">
                <MyNavbar/>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Under Development. Pardon our mess.
                    </p>
                </header>
            </div>
        );
    }
}

export default App;

//     let content;
//     switch (this.state.location) {
//         case "landing":
//             content = (
//                 <div>
//                     <MyNavbar />
//                     <HomePage />
//                     <Footer />
//                 </div>
//             );
//             break;
//         case "play":
//             content = (
//                 <div>
//                     <MyNavbar />
//                     <PlayContainer />
//                     <Footer />
//                 </div>
//             );
//             break;
//         default:
//             content = (<h1>Error: Unknown page location access</h1>);
//     }
//
//     return content;
// }