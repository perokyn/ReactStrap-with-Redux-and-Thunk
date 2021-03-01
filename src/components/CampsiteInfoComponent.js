
import { Component } from 'react';

import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap'






    function RenderCampsite({campsite}) {

        if (campsite) {
            return (

                <div className='col-md-5 m-1'>


                    <Card>
                        <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardTitle>{campsite.name}</CardTitle>
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

                </div>

            )
        }
    }





  
function CampsiteInfo(props){
        return (
            <>
                {props.campsite ?
             <div className="container">
                    <div className='row'>
                      <RenderCampsite campsite={props.campsite} />
                      <RenderComments comments={props.campsite.comments}/>
                    </div> 
                    </div>:
                    <div ></div>
                }

            </>
        )

    }





export default CampsiteInfo