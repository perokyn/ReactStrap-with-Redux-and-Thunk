

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
import {actions} from 'react-redux-form'//<----REMEMBER required top reset the form
//import { addComment, fetchCampsites } from '../redux/ActionCreators';//importing actions from ActionCreators.js

import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners, postFeedback } from '../redux/ActionCreators';//importing actions from ActionCreators.js (after adding server connection)
import { TransitionGroup, CSSTransition } from 'react-transition-group';//--page animation (check App.css for classes)



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
// const mapDispatchToProps = {
//     addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
//     fetchCampsites: () => (fetchCampsites())
// };


//after js server integration
const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
    postFeedback:( feedback)=>(postFeedback(feedback))
};


//==============================================================================================
//==============================================================================================

class Main extends Component {
  

///LifeCycle method. When component mounted load data from server
    // componentDidMount() {
    //     this.props.fetchCampsites();
    // }
//after server integration
    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
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

                promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                promotionLoading={this.props.promotions.isLoading}
                promotionErrMess={this.props.promotions.errMess}

                partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
                partnersLoading={this.props.partners.isLoading}
                partnersErrMess={this.props.partners.errMess}
            />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                  
            <CampsiteInfo 
            //passing props to handle camsite data loading and comment adding events
            campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
            isLoading={this.props.campsites.isLoading}
            errMess={this.props.campsites.errMess}
            comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
        />

            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/contactus' render={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/> } />
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                    <Redirect to='/home' />
                </Switch>
                </CSSTransition>
                </TransitionGroup>
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