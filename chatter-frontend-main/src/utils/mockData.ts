import { TicketPriority, TicketStatus, TicketData } from '../types/chat';

/**
 * TODO
 *
 * Use this ticket mock data to display both tickets (one closed and one opened) in the conext menu of each chat
 */
export const MockTicketData: TicketData[] = [
  {
    title: 'Exito de pantalla',
    description: 'Todo salió perfecto',
    brand: 'Fravega',
    tag: 'Soporte',
    id: '002654698',
    date: new Date('2022-09-30T19:15:16'),
    priority: TicketPriority.HIGH,
    status: TicketStatus.OPEN
  },
  {
    title: 'Error de pantalla',
    description: 'Me surge un error en la pantalla del monitor que compré hace unos días',
    brand: 'Garbarino',
    tag: 'Técnico',
    id: '002654699',
    date: new Date('2022-11-08T18:15:16'),
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.CLOSED
  }
];