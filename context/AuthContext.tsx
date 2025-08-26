import { use, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = createContext<{
  signIn: (value: object) => void;
  signOut: () => void;
  getSession: () => any;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  getSession: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext
      value={{
        signIn: (value) => {
          // Perform sign-in logic here
          let parsedValue = JSON.stringify(value);
          console.log(value, parsedValue);
          setSession(parsedValue);
        },
        signOut: () => {
          setSession(null);
          console.log('sign out !!!');
        },
        getSession: () => {
          // console.log('getSession', session);
          return session;
          // return JSON.parse(session ? session : 'no session');
          // setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
