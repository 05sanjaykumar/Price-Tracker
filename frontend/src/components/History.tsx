// src/components/History.tsx
type Props = {
  userId: string;
};

const History = ({ userId }: Props) => {
  // Use useEffect to fetch prompt history here
  return (
    <div className="mx-auto max-w-3xl mt-4 text-white">
      <h2 className="text-xl font-bold mb-4">Your History</h2>
      {/* Map your fetched prompts here */}
    </div>
  );
};

export default History;
