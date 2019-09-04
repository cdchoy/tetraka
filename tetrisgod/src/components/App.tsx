
import React from 'react';
import '../css/App.css';
import MyNavbar from "./MyNavbar"
import PlayContainer from "./PlayContainer";
import Footer from "./Footer";
import LandingPage from "./LandingPage"

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
        render() {
            return (
                <div>
                    <header>
                        This is my website!
                    </header>

                    <main>
                        {this.props.children}
                    </main>

                    <footer>
                        Your copyright message
                    </footer>
                </div>
            );
        }
    }
    //     let content;
    //     switch (this.state.location) {
    //         case "landing":
    //             content = (
    //                 <div>
    //                     <MyNavbar />
    //                     <LandingPage />
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
}

export default App;