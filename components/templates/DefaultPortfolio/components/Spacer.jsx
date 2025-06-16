export default function Spacer({ data, indexValue }) {
  const lineThickness = data.height;
  const displayLine = data.displayLine;

  if (displayLine) {
    return (
      <div
        className="border-t border-gray-300 w-full"
        style={{
          marginTop: `${lineThickness * 10}px`,
          marginBottom: `${lineThickness * 10}px`,
          borderTopWidth: `${lineThickness / 3}px`,
        }}
      />
    );
  } else if (!displayLine) {
    return (
      <div
        className="border-t border-gray-300w-full"
        style={{
          marginTop: `${lineThickness * 10}px`,
          marginBottom: `${lineThickness * 10}px`,
          borderTopWidth: `${0}px`,
        }}
      />
    );
  }
}
