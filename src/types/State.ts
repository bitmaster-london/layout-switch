import { Photo } from './Photo';

export type State = {
  photos: Photo[];
  loading: boolean;
  error: string | null;
};
