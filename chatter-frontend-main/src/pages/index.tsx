import MainLeftSide from './mainLeftSide';
import LoginForm from '../layout/LoginForm';

function Home() {
  return (
    <div className="main-wrapper d-flex row flex-grow-1 body-height">
      <MainLeftSide />
      <LoginForm />
    </div>
  );
}
export default Home;
