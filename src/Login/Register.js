/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, NavLink, Form, FormGroup, Label, Input } from 'reactstrap';
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
        <NavItem>
          <Button color="link" onClick={this.toggle}>Register</Button>
        </NavItem>
        <Modal isOpen={this.state.modal} modalTransition={{ timeout: 400 }} backdropTransition={{ timeout: 700 }}
          toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.props.handleRegistration} inline>
              <FormGroup className="reg-logs">
                <Label for="exampleUser" hidden>Username</Label>
                <Input type="text" name="username" id="exampleUser" onChange={this.props.handleChange} placeholder="input a username" />
              </FormGroup>
              {' '}
              <FormGroup className="reg-logs">
                <Label for="exampleEmail" hidden>Email</Label>
                <Input type="email" name="email" id="exampleEmail" onChange={this.props.handleChange} placeholder="input an email" />
              </FormGroup>
              {' '}
              <FormGroup className="reg-logs">
                <Label for="examplePassword" hidden>Password</Label>
                <Input type="password" name="password" id="examplePassword" onChange={this.props.handleChange} placeholder="input a password" />
              </FormGroup>
              {' '}
              <div className="reg-log-button">
                <Button type="Submit" onClick={this.toggle}>Register</Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Register;
