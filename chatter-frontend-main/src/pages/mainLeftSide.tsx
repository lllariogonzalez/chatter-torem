import logo from '../assets/images/logo_chatter_white.png';
import { LogoType } from '../types/chat';

function MainLeftSide() {
  const image = logo as unknown as LogoType;

  return (
    <div className="bg-chatter-blue left-side w-50">
      <div className="content d-flex justify-content-center align-items-center h-100">
        <div className="bg-effect" />
        <img src={image.src} className="mw-100" data-aos="zoom-in" alt="Logo" />
      </div>
    </div>
  );
}

export default MainLeftSide;
