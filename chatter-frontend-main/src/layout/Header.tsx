import Link from 'next/link';

import logo from '../assets/images/logo_chatter_color_2.png';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUser, setLogoutData } from '../redux/userSlice';
import { LogoType } from '../types/chat';
import { clearToken } from '../utils/sessionToken';

function Header() {
  const image = logo as unknown as LogoType;

  const userData = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const signOff = () => {
    dispatch(setLogoutData());
    clearToken();
  };

  return (
    <Navbar expand="lg" className="mx-4 header header-height w-100" variant="dark">
      <Container className="mw-100 w-100 d-flex justify-content-between m-0">
        <Navbar.Brand className="brand-logo">
          <img src={image.src} className="mh-100 mw-100 d-block" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {userData.authToken ? (
            <Nav className="d-flex gap-3">
              <span onClick={signOff}>
                <Link href="/" className="nav-item">
                  Abandonar Sesión
                </Link>
              </span>
            </Nav>
          ) : (
            <Nav className="d-flex gap-3">
              <Link href="/register" className="nav-item">
                Registrarse
              </Link>
              <Link href="/" className={'nav-item active'}>
                Iniciar Sesión
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
