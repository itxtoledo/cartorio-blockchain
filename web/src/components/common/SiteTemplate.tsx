import React from "react";
import { Outlet } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  NavLink,
} from "reactstrap";

// import { Container } from './styles';

const SiteTemplate: React.FC = () => {
  return (
    <div className="d-flex flex-column h-100">
      <header>
        <Navbar color="dark" dark>
          <NavbarBrand href="/">Cartório Blockchain</NavbarBrand>
          <NavbarToggler onClick={() => {}} />
          <Collapse isOpen={false} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </header>
      <main className="h-100 d-flex bg-body-tertiary">
        <Outlet />
      </main>
      <footer className="footer mt-auto py-3 bg-body-secondary ">
        <div className="container">
          <span className="text-body-secondary">
            Place sticky footer content here.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SiteTemplate;
