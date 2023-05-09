import * as Menu from '@radix-ui/react-context-menu';
import { useState } from 'react';
import ChatTabContextMenu from './HomeChat/ChatTabContextMenu';
import TicketModal from './HomeChat/TicketModal';

interface ContextMenuProps {
  children: React.ReactNode;
  menuComponent?: React.ReactNode;
}

export default function ContextMenu(contextMenuProps: ContextMenuProps) {
  const { children } = contextMenuProps;

  const [showTicket, setShowTicket] = useState<boolean>(false);
  const [dataTicket, setDataTicket] = useState<number>(0);

  return (
    <Menu.Root>
      <Menu.Trigger asChild>{children}</Menu.Trigger>

      <Menu.Portal>
        <Menu.Content>
          <ChatTabContextMenu setDataTicket={(n:number)=>setDataTicket(n)} showTicket={()=>setShowTicket(true)} />
        </Menu.Content>
      </Menu.Portal>

      <TicketModal index={dataTicket} isOpen={showTicket} setIsOpen={setShowTicket} />
    </Menu.Root>
  );
}
