import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const LoadStart = () => {Loading.hourglass('Cargando...');}
export const LoadRemove = () => {Loading.remove()};