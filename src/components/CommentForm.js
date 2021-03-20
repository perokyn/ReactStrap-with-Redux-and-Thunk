import React, { useState } from 'react'
import {
    Button, Modal, ModalHeader, ModalBody,
    FormGroup, Input, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';






const CommentForm = (props) => {

    const [isModalOpen, toggleModal] = useState(false)
    // const[name,setName]=useState('')
    // const[rating,setRating]=useState(0)
    // const[comment,setCOmment]=useState('')

    const [mainState, setMainState] = useState({

        author: '',
        rating: 0,
        comment: '',
        touched: {
            firstName: false,
            lastName: false,
            phoneNum: false,
            email: false
        }

    })

    const required = val => val && val.length;
    const maxLength = len => val => !val || (val.length <= len);
    const minLength = len => val => val && (val.length >= len);






    const handleSubmit = (values) => {

       
        if( !values.comment){alert("Please wfill out the comment form")}

       // alert("Current state is: " + JSON.stringify(values));
       //addComment is a prop passed by CampsiteINfoComponent 
       props.addComment(props.campsiteId, values.rating, values.author, values.comment)
    }


    return (



        <div>

            <Modal isOpen={isModalOpen} toggle={() => toggleModal(!isModalOpen)}>
                <ModalHeader toggle={() => toggleModal(!isModalOpen)}>Submit Comment</ModalHeader>
                <ModalBody>

                    <LocalForm onSubmit={values => handleSubmit(values)}>
                        <div className="form-group">

                            <Label for="rating">Rating</Label>
                            <Control.select className='form-control ' model='.rating' name="rating" id="rating">
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Control.select>

                        </div>

                        <div className="form-group">

                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}

                            />

                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 6 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />

                        </div>
                        <div className="form-group">


                            <Label for="comment">Comment</Label>
                            <Control.textarea model='.comment' name="comment" id="comment"
                                className='form-control' />

                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be at least 15 characters',

                                }}
                            />


                        </div>


                        <Button onClick={() => toggleModal(!isModalOpen)} type="submit" className="btn  bg-primary"><i className="fa fa-paper-plane "></i> Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>






            <Button onClick={() => toggleModal(!isModalOpen)} type="button" outline><i className="fa fa-pencil "></i> Submit Comment</Button>

        </div>

    )




}


export default CommentForm