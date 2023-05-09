import { MyProfileProps } from '../types/chat';

function MyProfile(myProfileProps: MyProfileProps) {
  const { name, lastName, email, photo } = myProfileProps;

  return (
    <div className="myProfile d-flex flex-row gap-3 align-items-center text-no-selection">
      <div className="myProfilePhoto">
        <img src={`http://localhost:8080/${photo}`} alt="ProfilePhoto" className="image" />
      </div>
      <div className="myProfileData">
        <div className="myProfileId fw-bold">
          {name} {lastName}
        </div>
        <div className="myProfileEmail fs-smaller">{email}</div>
      </div>
    </div>
  );
}

export default MyProfile;
