"use client";

import { useState, useEffect } from "react";
import ContactsSearch from "./ContactsSearch";
import ContactsFilter from "./ContactsFilter";
import ContactsList from "./ContactsList";
import MessageDisplay from "./MessageDisplay";
import { LoaderCircle } from "lucide-react";

export default function ContactsSection({ messages, isLoading }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredMessages = messages
    .filter((message) => {
      const matchesSearch =
        message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.sender_email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "unread" &&
          !message.is_read &&
          !message.is_archived) ||
        (filterStatus === "read" && message.is_read && !message.is_archived) ||
        (filterStatus === "pending" &&
          message.status === "pending" &&
          !message.is_archived) ||
        (filterStatus === "replied" &&
          message.status === "replied" &&
          !message.is_archived) ||
        (filterStatus === "archived" && message.is_archived);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  useEffect(() => {
    setSelectedMessage(null);
  }, [filterStatus]);

  useEffect(() => {
    if (selectedMessage) {
      const updated = messages.find((m) => m.id === selectedMessage.id);
      if (updated) {
        setSelectedMessage(updated);
      } else {
        setSelectedMessage(null);
      }
    }
  }, [messages]);

  const getFilterStatusText = () => {
    switch (filterStatus) {
      case "archived":
        return `Archived Messages (${filteredMessages.length})`;
      case "unread":
        return `Unread Messages (${filteredMessages.length})`;
      case "read":
        return `Read Messages (${filteredMessages.length})`;
      case "pending":
        return `Needs Reply (${filteredMessages.length})`;
      case "replied":
        return `Replied (${filteredMessages.length})`;
      default:
        return `Messages (${filteredMessages.length})`;
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <ContactsSearch
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <ContactsFilter
          setFilterStatus={setFilterStatus}
          filterStatus={filterStatus}
        />
      </div>
      <h3 className="font-semibold text-gray-900">{getFilterStatusText()}</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ContactsList
          displayedMessages={filteredMessages}
          selectedMessage={selectedMessage}
          setSelectedMessage={setSelectedMessage}
          isLoading={isLoading}
        />
        <MessageDisplay selectedMessage={selectedMessage} />
      </div>
    </>
  );
}
