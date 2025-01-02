import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserSkeletonLoader from "./UserSkeletonLoader";
import MessageSkeletonLoader from "./MessageSkeletonLoader";
import io from "socket.io-client";
import { useAuth } from "@/context/AuthContext";

const scrollbarHideStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function ChatDialog() {
  const { userId: urlUserId } = useParams();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setUsersLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState(null);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const { backendUrl } = useAuth();

  const currentUserId = localStorage.getItem("userId") || "1";

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket.io connection error:", error);
    });

    newSocket.on("reconnect_failed", () => {
      console.error("Failed to reconnect to Socket.io server");
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = scrollbarHideStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getUsersForSideBar = async () => {
    const token = localStorage.getItem("token");
    setUsersLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/chat/users/chats/${currentUserId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();

      // If urlUserId is provided and not in the list, fetch that user's details and add to the list
      if (urlUserId && !data.some((user) => user._id === urlUserId)) {
        const userResponse = await fetch(
          `${backendUrl}/api/user/get/${urlUserId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        // console.log("user data" + userResponse);
        if (!userResponse.ok) {
          if (userResponse.status === 403) {
            console.error(
              "Access forbidden. Please check your authentication.",
            );
            return;
          }
          throw new Error(`HTTP error! status: ${userResponse.status}`);
        }
        const userData = await userResponse.json();
        data = [userData, ...data];
      }

      setUsers(data);
      setSelectedUser(urlUserId || (data[0] && data[0]._id));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    getUsersForSideBar();
  }, [urlUserId]);

  const getOrCreateConversation = async (otherUserId) => {
    try {
      const response = await fetch(
        `${backendUrl}/api/chat/conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUserId, otherUserId }),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setConversation(data);
      return data._id;
    } catch (error) {
      console.error("Error creating/getting conversation:", error);
    }
  };

  const getChatHistory = async (conversationId) => {
    setIsMessageLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/chat/messages/${conversationId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setIsMessageLoading(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      getOrCreateConversation(selectedUser).then((conversationId) => {
        if (conversationId) {
          getChatHistory(conversationId);
          if (socket) {
            socket.emit("join", conversationId);
          }
        }
      });
    }
  }, [selectedUser, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log(message, currentUserId);
      });
    }
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedUser || !conversation) return;

    const newMessage = {
      senderId: currentUserId,
      receiverId: selectedUser,
      text: inputValue.trim(),
    };

    try {
      const response = await fetch(`${backendUrl}/api/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const sentMessage = await response.json();
        socket.emit("sendMessage", {
          ...sentMessage,
          conversationId: conversation._id,
        });
        setInputValue("");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleTextareaChange = (e) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const selectedUserData = users.find((user) => user._id === selectedUser);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-blue-950 fixed bottom-4 right-4 shadow-lg z-10"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-xl p-0"
        aria-describedby="chat-dialog-description"
      >
        <div id="chat-dialog-description" className="sr-only">
          Chat interface for messaging other users
        </div>
        <div className="flex h-[600px] flex-col">
          <div className="flex flex-1 overflow-hidden">
            {/* Left sidebar */}
            {isUsersLoading ? (
              <UserSkeletonLoader />
            ) : (
              <div className="w-16 border-r bg-muted/30 p-2 flex flex-col gap-3 overflow-y-auto hide-scrollbar">
                <TooltipProvider>
                  {users.map((user) => (
                    <Tooltip key={user._id}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`h-12 w-12 rounded-full p-0 ${
                            selectedUser === user._id
                              ? "ring-2 ring-blue-900"
                              : ""
                          }`}
                          onClick={() => setSelectedUser(user._id)}
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={user.photo} alt={user.name} />
                            <AvatarFallback>
                              {user.name ? user.name.charAt(0) : "?"}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-blue-950" side="right">
                       <p>{user.name || "Unknown User"}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            )}

            {/* Chat area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* User profile section */}
              {selectedUserData && (
                <div className="p-4 border-b bg-muted/10 flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedUserData.photo}
                      alt={selectedUserData.name}
                    />
                    <AvatarFallback>
                      {selectedUserData.name
                        ? selectedUserData.name.charAt(0)
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-950 line-clamp-1">
                      {selectedUserData.name || "Unknown User"}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {selectedUserData.about || "No information available"}
                    </p>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
                {selectedUser ? (
                  isMessageLoading ? (
                    <MessageSkeletonLoader />
                  ) : messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.senderId._id === currentUserId
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-3 py-2 ${
                              message.senderId._id === currentUserId
                                ? "bg-blue-950 text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-[10px] opacity-50 mt-1">
                              {new Date(message.createdAt).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground">
                        No messages yet. Start a conversation!
                      </p>
                    </div>
                  )
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">
                      Select a user to start chatting
                    </p>
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={handleTextareaChange}
                    placeholder="Type here..."
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    disabled={!selectedUser}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="self-end bg-blue-950"
                    disabled={!selectedUser || !inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}