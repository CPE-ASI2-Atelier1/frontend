import React, { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { RootState } from '../store';

const SOCKET_SERVER_URL = 'http://localhost:3000';

interface ISocketContext {
  socket: Socket | null;
}

export const SocketContext = createContext<ISocketContext>({ socket: null });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  let user = useSelector((state:RootState) => state.user.user);

  // if (!user) {
  //   return <div></div>;
  // }
  
  // if (!user) {
  //   user = { id: 0, surName: 'test', login: '', account: 0, lastName: '', email: '', cardList: [] };
  // }

  useEffect(() => {
    if (user) {
      const newSocket = io(SOCKET_SERVER_URL, { query: { userId: user.id, userName:user.login} }); // ⚠️ Remplace par la bonne logique d'utilisateur
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("✅ Connected to the server");
      });

      newSocket.on('UPDATE_CONNECTED_USERS', (data)=> {
        console.log(`Notification: users will be loaded.`);

        // setUsers(data);
        console.log(`Notification: users are loaded.`);
    });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
