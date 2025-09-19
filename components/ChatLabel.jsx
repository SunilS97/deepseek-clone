"use client";

import { useState } from "react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

export default function ChatLabel({ chat, onRename, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer group relative">
      {/* Chat title */}
      <span className="truncate">{chat.title}</span>

      {/* More menu */}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="opacity-0 group-hover:opacity-100 transition"
        >
          <MoreVertical size={16} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-1 w-28 bg-white border rounded shadow-lg text-sm z-10">
            <button
              className="flex items-center gap-2 px-3 py-2 hover:bg-muted w-full text-left"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onRename?.(chat);
              }}
            >
              <Edit2 size={14} /> Rename
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 hover:bg-muted w-full text-left text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete?.(chat);
              }}
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
