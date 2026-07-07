import { MdAdd } from "react-icons/md";

function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-10000 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-(--primary-color) to-(--secondary-color) text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-150 hover:-translate-y-0.75 hover:scale-[1.03] hover:shadow-[0_16px_30px_var(--btn-shadow-hover)]"
      title="Add New"
    >
      <MdAdd size={28} />
    </button>
  );
}

export default AddButton;
