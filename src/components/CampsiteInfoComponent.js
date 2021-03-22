
import { Component } from 'react';

import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import CommentForm from './CommentForm'

import { Loading } from './LoadingComponent';//this is to render loading cirlce when isLoading is true and dispatched fromactionCreaters.js
import { baseUrl } from '../shared/baseUrl';

    function RenderCampsite({campsite}) {

        if (campsite) {
            return (

                <div className='col-md-5 m-1'>


                    <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>


                </div>
            )
        } return <div />
    }


    function RenderComments({comments, postComment, campsiteId}) {
//simply passing these args to <CommentForm>

        if (comments) {

            return (
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map((comment) => (
                        <div key={comment.author}>
                            <p>{comment.text}</p>
                            <p>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                        </div>

                    ))}
              <CommentForm campsiteId={campsiteId} postComment={postComment} /> {/* passing the campsiteID addComment action to comentform which is an arrow function*/ }
                </div>

            )
        }
    }


       


    

  
function CampsiteInfo(props){
    //no else statement is required statements are boolean if they evaluate true they will be executed..
    if (props.isLoading) { //if is loading is true show loading anim. Use container, row and col styling in order to preserve bootsrpa grid page layout
        return (
            <div className="container">  
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    if (props.campsite) {

    
        return (
            
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />    
                </div>
            </div>
        )

    }

}



export default CampsiteInfo