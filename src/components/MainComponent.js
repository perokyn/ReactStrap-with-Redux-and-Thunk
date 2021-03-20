

import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import About from './AboutComponent'
import Contact from './ContactComponents';

import CampsiteInfo from './CampsiteInfoComponent'
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addComment, fetchCampsites } from '../redux/ActionCreators';//importing actions from ActionCreators.js

// state data wrapped in mapStateToProps obect which holds data red from the redux store! (passed to connect as first argument //to read///)
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

//==============================================================================================
//==============================================================================================



//imported action objects wrappen in an object mapDispatchToProps which is argument passed to connect function.
//these functions will be accessible as props.addComment inside this component!!!!
const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites())
};
//==============================================================================================
//==============================================================================================

class Main extends Component {
  

///LifeCycle method. When component mounted load data from server
    componentDidMount() {
        this.props.fetchCampsites();
    }






    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});
    }
    


   

    render() {

        

        const HomePage = () => {
            return (
                <Home
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    partner={this.props.partners.filter(partner => partner.featured)[0]}
                />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                //passing props to handle camsite data loading and comment adding events
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}//isloading action from actionsCreator.js
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    addComment={this.props.addComment}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//exporting Maincomponent in a wrapper called "connect" to connect to Redux store and passing mapDispatchToProps object with actions imported from actionCreators.js


//the connect with 2 arguments( reading state and dispatching actions)(This is the component name that I am connecting to redux (Main this case))

///MapStateToProps function takes the STATE from the store and maps it to props as campsite:state.campsites and so on
//MapStateToProps can be named as null if I do not read any state


//MapDispatchToProps is an object that holds the imported actions  addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
//addComment: is a key ato the addComment action and takes arguments as camsizeID, rating ...
// MapDispatchToProps can again be null if not using and dispaching actions

//add these to connect so that redux is aware of what actions and state readings this component needs