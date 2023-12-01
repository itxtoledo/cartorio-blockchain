import { useToggle } from "@coinsamba/react-tiny-hooks";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

// import { Container } from './styles';

const SiteTemplate: React.FC = () => {
  const [isOpen, toggle] = useToggle();

  return (
    <>
      <Navbar color="dark" dark expand="md" container="fluid">
        <NavbarBrand href="/">Cartório Blockchain</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/notary/verify-document">
                Verificar Autenticidade
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/notary/notarize-document">
                Registrar Documento
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <div className="d-flex flex-column h-100">
        <main className="h-100 d-flex bg-body-tertiary">
          <Outlet />
        </main>
        <footer className="footer mt-auto py-3 bg-body-secondary ">
          <div className="container">
            <span className="text-body-secondary">
              UM EXEMPLO DE APLICAÇÃO DO USO DA BLOCKCHAIN PARA AUTENTICIDADE DE DOCUMENTOS
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SiteTemplate;
