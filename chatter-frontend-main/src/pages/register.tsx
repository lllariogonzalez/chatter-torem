import RegisterForm from '../layout/RegisterForm';
import MainLeftSide from './mainLeftSide';

function Home() {
  return (
    <div className="main-wrapper d-flex row flex-grow-1 body-height">
      <MainLeftSide />
      <RegisterForm />
    </div>
  );
}
export default Home;
