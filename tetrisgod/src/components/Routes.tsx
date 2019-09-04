
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from "./App";
import LandingPage from "./LandingPage";
import PlayPage from "./PlayPage";
import AboutPage from "./AboutPage";

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/play" component={PlayPage} />
        <Route path="/about" component={AboutPage} />
    </Route>
);