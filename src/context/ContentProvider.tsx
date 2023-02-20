import React, { createContext, useReducer, FC, ReactNode } from 'react';
import { Photo, State } from '../types';

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const initialState: State = {
  photos: [],
  loading: true,
  error: null,
};

type Action =
  | { type: 'FETCH_PHOTOS'; payload: Photo[] }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_PHOTOS':
      return {
        ...state,
        photos: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export const ContentContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

type Props = {
  children: ReactNode;
};

export const ContentProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContentContext.Provider value={{ state, dispatch }}>
      {children}
    </ContentContext.Provider>
  );
};
