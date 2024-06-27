import io from 'socket.io-client';
const SOCKET_URL = 'http://localhost:5000';

let socket;

export const intializeSocket = () => {
 socket = io(SOCKET_URL);
 return socket;  
};

export const getProducts = (Callback) =>{
    if(!socket)intializeSocket();
    socket.emit('getProducts');
    socket.on('products', (data) =>{
        Callback(data);
    });
};

export const diconnectSocket = () => {
    if(socket){
        socket.disconnect();
    };
}
