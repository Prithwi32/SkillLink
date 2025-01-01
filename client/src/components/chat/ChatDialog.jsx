import React, { useEffect, useRef, useState } from "react";
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

const scrollbarHideStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Sample user data
const usersInfo = [
  {
    _id: 1,
    name: "Alice Smith",
    photo: "/placeholder.svg?height=32&width=32",
    about: "UX Designer",
  },
  {
    _id: 2,
    name: "Bob Johnson",
    photo: "/placeholder.svg?height=32&width=32",
    about: "Frontend Developer",
  },
  {
    _id: 3,
    name: "Carol Williams",
    photo: "/placeholder.svg?height=32&width=32",
    about: "Project Manager",
  },
  {
    _id: 4,
    name: "David Brown",
    photo: "/placeholder.svg?height=32&width=32",
    about: "Backend Engineer",
  },
];

export default function ChatDialog() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(usersInfo);
  const [isUsersLoading, setUsersLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = scrollbarHideStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Integration part

  // take it from localStorage
  const userId = 1;

  // api to display users the person chatted previously
  const getUsersForSideBar = async () => {
    setUsersLoading(true);
    try {
      // store user data in users use state
      // also set selectedUser to user id of the person for which he opened chat
    } catch (error) {
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    getUsersForSideBar();
  }, []);

  // api to get chat between the user and selected user
  const getChatHistory = async () => {
    setIsMessageLoading(true);
    try {
      // store chat data in messages use state
    } catch (error) {
    } finally {
      setIsMessageLoading(false);
    }
  };

  useEffect(() => {
    getChatHistory();
  }, [selectedUser]);

  // api to send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !selectedUser) return;

    // for ui checking purpose
    // const newMessage = {
    //   _id: Date.now(),
    //   senderId: selectedUser,
    //   receiverId: null,
    //   text: inputValue.trim(),
    //   createdAt: new Date().toLocaleTimeString([], {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   }),
    // };
    // setMessages((prev) => [...prev, newMessage]);
    // setInputValue("");

    try {
      // api integration here
      getChatHistory();
    } catch (error) {}

    // don't remove this
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
      <DialogContent className="sm:max-w-xl p-0">
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
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-blue-950" side="right">
                        <p>{user.name}</p>
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
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-blue-950 line-clamp-1">
                      {selectedUserData.name}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {selectedUserData.about}
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
                            message.senderId === userId
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-3 py-2 ${
                              message.senderId === userId
                                ? "bg-blue-950 text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-[10px] opacity-50 mt-1">
                              {message.createdAt}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground">No messages yet</p>
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
