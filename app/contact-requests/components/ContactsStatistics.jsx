import StatisticsCard from "./StatisticsCard";

export default function ContactsStatistics({ messages }) {
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(
    (message) => message.is_read === false
  ).length;
  const needsReplyMessages = messages.filter(
    (message) => message.status === "pending"
  ).length;
  const repliedMessages = messages.filter(
    (message) => message.status === "replied"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatisticsCard
        title="Total Messages"
        value={totalMessages}
        color="blue"
        type="total"
      />
      <StatisticsCard
        title="Unread"
        value={unreadMessages}
        color="yellow"
        type="unread"
      />
      <StatisticsCard
        title="Needs Reply"
        value={needsReplyMessages}
        color="amber"
        type="needs_reply"
      />
      <StatisticsCard
        title="Replied"
        value={repliedMessages}
        color="green"
        type="replied"
      />
    </div>
  );
}
