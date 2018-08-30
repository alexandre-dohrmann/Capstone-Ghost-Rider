import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import Cars from './Cars';
import CreateCar from './CRUDCars/AddCar';
import EditCar from './CRUDCars/EditCar';
import EditComment from './CRUDComments/EditComment';
import classes from './CarsContainer.css';
import { fetchCsrfTokenAction, addCarAction, deleteCarAction, editCarAction } from '../actions/actions';
import ChatApp from '../ChatContainer/ChatApp';




class CarsContainer extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      comments: [],
      showEdit: false,
      editCarId: null,
      carToEdit: {
        make: '',
        model: '',
        year: '',
        img_url: '',
        description: '',
      },
      showCommentEdit: false,
      editCommentId: null,
      commentToEdit: {
        comment: '',
        car: '',
      },
      modal: false,
      modal1: false,
      modal2: false,
    }
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  toggle1() {
    this.setState({
      modal1: !this.state.modal1
    });
  }
  toggle2() {
    this.setState({
      modal2: !this.state.modal2
    });
  }



  componentDidMount() {

  }

  //======================== Cars API calls ==================================================



  addCar = async (car, e) => {
    e.preventDefault();
    const data = { ...car, csrfmiddlewaretoken: this.props.csrf_token, auth_token: this.props.auth_token }
    this.props.triggerAddCarAction(data);
  }


  deleteCar = async (id, e) => {
    e.preventDefault();
    const data = { id: id, csrfmiddlewaretoken: this.props.csrf_token, auth_token: this.props.auth_token }
    this.props.triggerDeleteCarAction(data);
  }


  showModal = (id, e) => {
    this.toggle1();
    const carToEdit = this.state.cars.find((car) => car.id === id)
    console.log(carToEdit, ' carToEdit')
    console.log(id);
    this.setState({
      showEdit: true,
      editCarId: id,
      carToEdit: carToEdit
    });
  }


  closeAndEdit = async (e) => {
    console.log('close and edit');
    e.preventDefault();
    const data = { editCarId: this.state.editCarId, carToEdit: this.state.carToEdit, csrfmiddlewaretoken: this.props.csrf_token, auth_token: this.props.auth_token }
    this.props.triggerEditCarAction(data);
    this.setState({
      showEdit: false
    });
    this.toggle1();
  }


  handleFormChange = (e) => {
    this.setState({
      carToEdit: { ...this.state.carToEdit, [e.target.name]: e.target.value }
    })
  }


  //======================== Comments API calls ==================================================

  // getComment = async () => {
  //   const comments = await fetch('https://ghostrider-react-django-python.herokuapp.com/api/comments/');
  //   const commentsJson = await comments.json();
  //   console.log(commentsJson, 'comments JSON');
  //   console.log(comments, 'this is comments');
  //   return commentsJson
  // }


  addComment = async (comment, e) => {
    e.preventDefault();
    try {
      const createdComment = await fetch('http://localhost:8000/api/comments/', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': this.props.csrf_token,
          'Authorization': `Token ${this.props.auth_token}`
        }
      });
      const createdCommentJson = await createdComment.json();
      this.setState({ comments: [...this.state.comments, createdCommentJson] });
    } catch (err) {
      console.log(err)
    }
  }


  deleteComment = async (id, e) => {
    e.preventDefault();
    console.log('deleteComment function is being called, this is the id: ', id);
    try {
      const deleteComment = await fetch('http://localhost:8000/api/comments/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': this.props.csrf_token,
          'Authorization': `Token ${this.props.auth_token}`
        }
      });
      console.log(deleteComment, 'this is delete car');

      if (deleteComment.status === 204) {
        this.setState({ comments: this.state.comments.filter((comment, i) => comment.id !== id) });
      } else {
        console.log('you fucked');
      }
    } catch (err) {
      console.log(err);
    }
  }

  showCommentModal = (id, e) => {
    // i comes before e, when called with bind
    this.toggle2();
    const commentToEdit = this.state.comments.find((comment) => comment.id === id)
    console.log(commentToEdit, ' commentToEdit')
    console.log(id);
    this.setState({
      showCommentEdit: true,
      editCommentId: id,
      commentToEdit: commentToEdit
    });
  }


  closeAndEditComment = async (e) => {
    console.log('close and edit');
    e.preventDefault();
    try {
      const editResponse = await fetch('http://localhost:8000/api/comments/' + this.state.editCommentId, {
        method: 'PUT',
        body: JSON.stringify(this.state.commentToEdit),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': this.props.csrf_token,
          'Authorization': `Token ${this.props.auth_token}`
        }
      });

      const editResponseJson = await editResponse.json();
      const editedCommentArray = this.state.comments.map((comment) => {
        if (comment.id === this.state.editCommentId) {
          comment.comment = editResponseJson.comment;
        }
        return comment
      });
      console.log(editResponseJson, 'this edit editResponseJson');
      console.log(editedCommentArray, 'this editedCommentArray');
      this.setState({
        comment: editedCommentArray,
        showCommentEdit: false
      });
      this.toggle2();
    } catch (err) {
      console.log(err);
    }
  }


  handleCommentFormChange = (e) => {
    this.setState({
      commentToEdit: { ...this.state.commentToEdit, [e.target.name]: e.target.value }
    })
  }



  //========================== What's being returned (displayed)================================================


  render() {
    return (
      <div>
        <div className="addCarBTN">
          <Button color="primary" onClick={this.toggle}>ADD A CAR!</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader className="modal-header" toggle={this.toggle}>Add Your Car Below:</ModalHeader>
            <ModalBody>

              <CreateCar addCar={this.addCar} toggle={this.toggle} />

            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
        <Cars
          deleteCar={this.deleteCar}
          showModal={this.showModal}
          comments={this.state.comments}
          addComment={this.addComment}
          deleteComment={this.deleteComment}
          showCommentModal={this.showCommentModal}
          modal1={this.state.modal1}
          toggle1={this.toggle1}
          closeAndEdit={this.closeAndEdit}
          handleFormChange={this.handleFormChange}
          carToEdit={this.state.carToEdit}
          modal2={this.state.modal2}
          toggle2={this.toggle2}
          closeAndEditComment={this.closeAndEditComment}
          handleCommentFormChange={this.handleCommentFormChange}
          commentToEdit={this.state.commentToEdit}
        />
        <ChatApp />


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    csrf_token: state.auth.csrf_token,
    auth_token: state.auth.auth_token,
    cars: state.cars.carsList


  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCsrfToken: () => { fetchCsrfTokenAction(dispatch) },
    triggerAddCarAction: (data) => { addCarAction(dispatch, data) },
    triggerDeleteCarAction: (data) => { deleteCarAction(dispatch, data) },
    triggerEditCarAction: (data) => { editCarAction(dispatch, data) },


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsContainer);
