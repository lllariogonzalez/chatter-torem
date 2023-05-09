import { Modal } from 'react-bootstrap';
import { TicketModalProps, TicketPriority } from '../../types/chat';
import styled from 'styled-components';
import getDateFormat from '../../utils/getDateFormat';
import { MockTicketData } from '../../utils/mockData';

const Ticket = styled.div<{ status: number }>`
  display: flex;
  background-color: ${(props) => (props.status ? '#DB0605' : '#36dd81')};
  border: 1px solid #eee;
  height: 170px;
  padding: 5px;
  font-weight: 500;
  font-size: 18px;
`;

const InfoTicket = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  width: 70%;
  height: 100%;
  align-items: flex-start;
  justify-content: space-evenly;
  margin: 0 20px;
`;

const StatusTicket = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  color: #fff;
  border-left: 2px dashed #fff;
  width: 30%;
  height: 100%;
  align-items: flex-end;
  justify-content: space-evenly;
  margin: 0 20px;
`;

const Division = styled.div`
  color: #fff;

  & span {
    border-left: 2px solid #fff;
    padding-left: 10px;
  }
`;

const Highlight = styled.span<{ status: number }>`
  color: ${(props) => (props.status ? '#DB0605' : '#36dd81')};
  position: relative;
  background-color: #fff;
  padding: 0px 10px;
  border-radius: 5px;

  &:first-child {
    margin-right: 10px;
  }
`;

const Info = styled.span`
  padding: 0px 0px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const CircleTop = styled.span`
  position: absolute;
  width: 40px;
  height: 21px;
  border-radius: 0 0 50px 50px;
  top: 0;
  left: 0;
  transform: translate(-50%, -25%);
  background-color: #fff;
`;

const CircleBottom = styled.span`
  position: absolute;
  width: 40px;
  height: 21px;
  border-radius: 50px 50px 0 0;
  bottom: 0;
  left: 0;
  transform: translate(-50%, 25%);
  background-color: #fff;
`;

export default function TicketModal(ticketModalProps: TicketModalProps) {
  const { isOpen, setIsOpen, index } = ticketModalProps;
  const ticket = MockTicketData[index]
  const description = ticket.description.length < 33  
    ? ticket.description
    : ticket.description.slice(0, 33) + '...';
  const date = getDateFormat(ticket.date);

  return (
    <Modal show={isOpen} onHide={()=>setIsOpen(false)} centered>
      <Ticket status={ticket.status}>
        <InfoTicket>
          <Title>{ticket.title}</Title>
          <Info>{description}</Info>
          <Division>
            <Highlight status={ticket.status}>{ticket.brand.toLocaleUpperCase()}</Highlight>
            <Info>{ticket.tag.toLocaleUpperCase()}</Info>
          </Division>
        </InfoTicket>
        <StatusTicket>
          <CircleTop />
          <Info>{date}</Info>
          <Highlight status={ticket.status}>{TicketPriority[ticket.priority]}</Highlight>
          <Info>#{ticket.id}</Info>
          <CircleBottom />
        </StatusTicket>
      </Ticket>
    </Modal>
  );
}
