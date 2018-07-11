import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom' 
import PrivateRoute from './Helper/PrivateRoute'

// Auth
import Login from 'Containers/User/Login'
import ForgotPassword from 'Containers/User/ForgotPassword'
import Register from 'Containers/User/Register'

// App
import Dashboard from 'Containers/Dashboard'

// Movie
import MovieList from 'Containers/Media/MovieList'
import Movie from 'Containers/Media/Movie'

// Series
import SeriesList from 'Containers/Media/SeriesList'
import Series from 'Containers/Media/Series'
import Season from 'Containers/Media/Season'
import Episode from 'Containers/Media/Episode'

// Auth
import { Auth, checkAuth } from 'Components/Auth'

export default class Routes extends Component {
    componentWillMount() {
        checkAuth();
    }

    render() { 
        return ( 
            <Switch>
                <Route exact path="/" render={() => (
                    Auth.isAuthenticated ? (
                        <Redirect to="/dashboard" />
                    ) : (
                            <Redirect to="/login" />
                        )
                )} />

                <Route exact path='/login' component={Login} />
                <Route exact path='/forgot' component={ForgotPassword} />
                <Route exact path='/register' component={Register} />

                <PrivateRoute exact path="/dashboard" component={Dashboard} />

                <PrivateRoute exact path="/movies" component={MovieList} />
                <PrivateRoute exact path='/movie/:uuid/:name' component={Movie} />

                <PrivateRoute exact path="/series" component={SeriesList} />
                <PrivateRoute exact path="/series/:uuid/:name" component={Series} />
                <PrivateRoute exact path="/season/:uuid/:name" component={Season} />
                <PrivateRoute exact path="/episode/:uuid/:name" component={Episode} />
            </Switch>
        )
    }
}