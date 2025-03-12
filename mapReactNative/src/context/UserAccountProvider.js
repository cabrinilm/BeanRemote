import { useState } from 'react';
import UserAccount from './UserAccount';

export default function UserAccountProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  return (
    <UserAccount.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        loading,
        setLoading,
        isErrorPopupOpen,
        setIsErrorPopupOpen,
      }}
    >
      {children}
    </UserAccount.Provider>
  );
}
