export default function Alert({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] text-white rounded-sm shadow-sm">
      <p className="p-[15px]">{message}</p>
      <button onClick={onClose} className="p-[10px] bg-blue-500">
        확인
      </button>
    </div>
  );
}
