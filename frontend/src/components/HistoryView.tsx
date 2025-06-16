// src/components/HistoryView.tsx
const HistoryView = ({
  prompt,
  response,
  onQuit,
}: {
  prompt: string;
  response: string;
  onQuit: () => void;
}) => {
  return (
    <div className='mx-auto max-w-3xl mt-4'>
      <h2 className="text-xl text-violet-400 mb-2">Prompt:</h2>
      <p className="text-gray-200 whitespace-pre-wrap mb-4">{prompt}</p>

      <h2 className="text-xl text-green-400 mb-2">AI Response:</h2>
      <p className="text-gray-200 whitespace-pre-wrap">{response}</p>

      <button
        onClick={onQuit}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        🔙 Quit to Input
      </button>
    </div>
  );
};

export default HistoryView;
