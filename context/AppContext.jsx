// "use client";

// import { createContext, useContext, useState, useEffect, useRef } from "react";

// const AppContext = createContext();

// export function AppProvider({ children }) {
//   const [messages, setMessages] = useState([]);  // active chat messages
//   const [chats, setChats] = useState([]);        // list of chats
//   const [isLoading, setIsLoading] = useState(false);
//   const [mode, setMode] = useState("deep");
//   const scrollRef = useRef(null);

//   // Auto-scroll
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages, isLoading]);

//   // Simulated send
//   const sendMessage = async (text) => {
//     const userMsg = { id: crypto.randomUUID(), role: "user", content: text };
//     setMessages((prev) => [...prev, userMsg]);

//     // ✅ If first message → create a chat entry
//     if (messages.length === 0) {
//       const newChat = {
//         id: crypto.randomUUID(),
//         title: "New Chat",
//         createdAt: Date.now(),
//       };
//       setChats((prev) => [newChat, ...prev]);
//     }

//     setIsLoading(true);
//     setTimeout(() => {
//       const reply = {
//         id: crypto.randomUUID(),
//         role: "assistant",
//         content:
//           mode === "deep"
//             ? "🧠 (Phase 6 demo) Deep Think response."
//             : "🔎 (Phase 6 demo) Search response.",
//         mode,
//       };
//       setMessages((prev) => [...prev, reply]);
//       setIsLoading(false);
//     }, 800);
//   };

//   // ✅ Rename a chat
//   const renameChat = (chatId, newTitle) => {
//     setChats((prev) =>
//       prev.map((chat) =>
//         chat.id === chatId ? { ...chat, title: newTitle } : chat
//       )
//     );
//   };

//   // ✅ Delete a chat
//   const deleteChat = (chatId) => {
//     setChats((prev) => prev.filter((chat) => chat.id !== chatId));
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         messages,
//         setMessages,
//         chats,
//         setChats,
//         isLoading,
//         setIsLoading,
//         mode,
//         setMode,
//         sendMessage,
//         renameChat,
//         deleteChat,
//         scrollRef,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }

// export const useApp = () => useContext(AppContext);



"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [messages, setMessages] = useState([]);   // messages of active chat
  const [chats, setChats] = useState([]);         // list of saved chats
  const [activeChatId, setActiveChatId] = useState(null); // which chat is open
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("deep");
  const scrollRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // ✅ Create a draft chat (not saved in sidebar yet)
  const createNewChat = () => {
    const draftChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
    };
    setActiveChatId(draftChat.id);
    setMessages([]); // clear main chat panel
  };

  // ✅ Send message (save chat only if first message)
  const sendMessage = async (text) => {
    if (!activeChatId) {
      // if no chat yet, create a draft
      createNewChat();
    }

    const userMsg = { id: crypto.randomUUID(), role: "user", content: text };

    // If chat not in sidebar yet → save it now with first message
    const chatExists = chats.some((c) => c.id === activeChatId);
    if (!chatExists) {
      const newChat = {
        id: activeChatId,
        title: "New Chat",
        messages: [userMsg],
        createdAt: Date.now(),
      };
      setChats((prev) => [newChat, ...prev]);
    } else {
      // Add message to existing chat
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, userMsg] }
            : chat
        )
      );
    }

    setMessages((prev) => [...prev, userMsg]);

    // Simulate assistant reply
    setIsLoading(true);
    setTimeout(() => {
      const reply = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          mode === "deep"
            ? "🧠 (Phase 6 demo) Deep Think response."
            : "🔎 (Phase 6 demo) Search response.",
        mode,
      };

      setMessages((prev) => [...prev, reply]);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, reply] }
            : chat
        )
      );

      setIsLoading(false);
    }, 800);
  };

  // ✅ Switch active chat
  const setActiveChat = (chatId) => {
    setActiveChatId(chatId);
    const chat = chats.find((c) => c.id === chatId);
    setMessages(chat ? chat.messages : []);
  };

  // ✅ Rename chat
  const renameChat = (chatId, newTitle) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
  };

  // ✅ Delete chat
  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (chatId === activeChatId) {
      setActiveChatId(null);
      setMessages([]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        chats,
        activeChatId,
        isLoading,
        mode,
        scrollRef,
        // functions
        createNewChat,
        sendMessage,
        setActiveChat,
        renameChat,
        deleteChat,
        setMessages,
        setChats,
        setIsLoading,
        setMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

