import { Server } from "socket.io";
import { getData } from "./data.js";

let products = []
let socketServer

export const initSocket = async (httpServer) => {
    socketServer = new Server(httpServer);

    socketServer.on('connection', async (socketClient) => {
        console.log(`Nueva conexión: ${socketClient.id}`);

        products = await getData()
        socketClient.emit('update-list', { products });
    })
}

export const emit = (event, data) => {
    socketServer.emit(event,data);
} 

