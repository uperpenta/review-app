import {io} from '../app';
import Message from 'src/models/message';

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
  
    socket.on("client_message", async (data) => {
      const { message } = data;
  
      const newMessage = new Message({
        socketId: socket.id,
        message,
        timestamp: new Date(),
      });
      await newMessage.save();
  
      console.log(`Message received: ${message}`);
      io.to(socket.id).emit("message_received", { status: "Message received" });
  
      io.emit("new_message", {
        messageId: newMessage._id,
        message,
        timestamp: newMessage.timestamp,
        status: newMessage.status,
      });
    });
  
    socket.on("admin_response", async (data) => {
      const { messageId, response } = data;
  
      const message = await Message.findById(messageId);
      if (message) {
        message.response = response;
        message.status = "Replied";
        await message.save();
  
        io.to(message.socketId).emit("admin_response", { response });
      }
    });
  
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });