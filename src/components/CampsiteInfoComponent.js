
import { Component } from 'react';

import { Card, CardImg, CardText, CardBody, Button,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';






    function RenderCampsite({campsite}) {

        if (campsite) {
            return (

                <div className='col-md-5 m-1'>


                    <Card>
                        <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>


                </div>
            )
        } return <div />
    }


   function RenderComments({comments}) {


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
<CommentForm/>
                </div>

            )
        }
    }


function CommentForm(){


    return(

        <Button type="button" className="btn btn-outline-white btn-rounded waves-effect"><i className="fa fa-pencil "></i> Submit Comment</Button>
    )
}


  
function CampsiteInfo(props){
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
                    <RenderComments comments={props.comments} />
                    
                </div>
            </div>
        )

    }





export default CampsiteInfo