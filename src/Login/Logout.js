/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, NavLink, Form, FormGroup, Label, Input } from 'reactstrap';
class Logout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavItem>
          <form onSubmit={this.props.handleLogout}>
            <Button className="nav-links" type="submit">Logout</Button>
          </form>       
        </NavItem>
      </div>
    );
  }
}
export default Logout;
