import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ChatsMessagesProps } from '../../types/chat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px 10px;
  background-color: #335762;
  position: relative;
  height: 87%;
  overflow-y: scroll;
  background-image: url(./assets/images/chat-bg-pattern.jpg);
  background-blend-mode: multiply;
  background-attachment: fixed;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.div<{ isReceived: boolean }>`
  padding: 5px 8px;
  align-self: ${(props) => (props.isReceived ? 'flex-start' : 'flex-end')};
  margin: 8px 0px;
  display: flex;
  gap: 5px;
  background-color: ${(props) => (props.isReceived ? 'white' : '#36dd81')};
  color: #101111;
  border-radius: 10px;
  z-index: 3;
`;

const TextWrapper = styled.p``;

const TimeDate = styled.p``;

function ChatMessages(chatMessagesProps: ChatsMessagesProps) {
  const { chatsData, chatId, setUserChatData } = chatMessagesProps;

  const positionRef = useRef<any>();
  const chatMessages = chatsData.chats.filter((chat: any) => chat.chatId === chatId);

  useEffect(() => {
    setUserChatData(chatMessages[0]);
    // NOTE: Ref for position chat at end by default
    positionRef.current.scrollIntoView();
  }, [chatMessages, setUserChatData]);

  return (
    <Container>
      <Wrapper>
        {chatMessages[0]
          ? chatMessages[0].messages.map((msg: any, index: any) => (
              <Message key={index} isReceived={msg.received}>
                <TextWrapper>{msg.message}</TextWrapper>
                <TimeDate className="chat-message-time">
                  {msg.timeDate.slice(11, 16) + ' p.m.'}
                </TimeDate>
              </Message>
            ))
          : null}
        <div ref={positionRef} />
      </Wrapper>
    </Container>
  );
}

export default ChatMessages;
