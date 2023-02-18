import React, { createContext, useReducer, FC, ReactNode } from 'react';

export type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type State = {
  photos: Photo[];
  loading: boolean;
  error: string | null;
};

type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const initialState: State = {
  photos: [],
  loading: true,
  error: null
};

export const ContentContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

type Action = 
  | { type: 'FETCH_PHOTOS'; payload: Photo[]; }
  | { type: 'SET_ERROR'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_PHOTOS':
      return {
        ...state,
        photos: action.payload,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

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
