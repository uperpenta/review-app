import {io} from '../app';
import Message from 'src/models/message';

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.join(socket.id);

  socket.on("client_message", async (data) => {
      try {
          const { message } = data;
          if (!message) {
              socket.emit("error", { error: "Message cannot be empty" });
              return;
          }

          const newMessage = new Message({
              socketId: socket.id,
              message,
              timestamp: new Date(),
              status: "Pending",
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
      } catch (error) {
          console.error("Error handling client message:", error);
          socket.emit("error", { error: "Internal Server Error" });
      }
  });

  socket.on("admin_response", async (data) => {
      try {
          const { messageId, response } = data;
          if (!messageId || !response) {
              socket.emit("error", { error: "Invalid data" });
              return;
          }

          const message = await Message.findById(messageId);
          if (!message) {
              socket.emit("error", { error: "Message not found" });
              return;
          }

          message.response = response;
          message.status = "Replied";
          await message.save();

          io.to(message.socketId).emit("admin_response", { response });

          socket.emit("response_sent", { messageId, response });

      } catch (error) {
          console.error("Error handling admin response:", error);
          socket.emit("error", { error: "Internal Server Error" });
      }
  });

  socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
  });
});
