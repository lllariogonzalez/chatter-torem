import { BsPaperclip } from 'react-icons/bs';
import styled from 'styled-components';
import { Chat } from '../../types/chat';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding: 4px 8px;
  user-select: none;
  box-shadow: 0px 15px 6px -4px rgba(0, 0, 0, 0.86);
  border-bottom: 1px solid #d1d7db;
  min-height: 78px;
`;

const ProfilePhoto = styled.div`
  & .image {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
`;

const ContactName = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: #083045;
  background: #e8e8e8;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
`;

const IconWrapper = styled.div`
  font-size: 15px;
  opacity: 50%;
  transform: rotate(30deg);
  color: #101111;
`;

function ChatHeader(userChatData: Chat) {
  const { image, name } = userChatData;

  return (
    <Container>
      <ProfilePhoto>
        {name && image ? (
          <img src={`http://localhost:8080/${image}`} className="image" alt="UserImage" />
        ) : null}
      </ProfilePhoto>
      <ContactName>{name}</ContactName>
      <IconContainer>
        <IconWrapper>
          <BsPaperclip />
        </IconWrapper>
      </IconContainer>
    </Container>
  );
}

export default ChatHeader;
