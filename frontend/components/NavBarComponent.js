import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { VscSearch } from 'react-icons/vsc';

export default function NavBarComponent() {
    return(
        <Navbar bg="white" expand="md">
        <Container>
            <Navbar.Brand href="#home"><img src="proof-logo.png" className='proof-logo'/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
            <Nav>
                <NavDropdown title="Home" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Somos PROOF</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Unidade de Negócios" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">MSS</NavDropdown.Item>
                    <NavDropdown.Item href="/">PSAP</NavDropdown.Item>
                    <NavDropdown.Item href="/">Consulting Service</NavDropdown.Item>
                    <NavDropdown.Item href="/">Professional Service</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Central de Conteúdo" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Blog</NavDropdown.Item>
                    <NavDropdown.Item href="/">Material Rico</NavDropdown.Item>
                    <NavDropdown.Item href="/">Relatórios</NavDropdown.Item>
                    <NavDropdown.Item href="/">Eventos</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/">Contato</Nav.Link>
                <Navbar.Text>
                    <VscSearch></VscSearch>
                </Navbar.Text>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

