"use client";

type Props = { action: (formData: FormData) => void; id: string; date: string };

export default function DeleteButton({ action, id, date }: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm("Delete this booking? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="date" value={date} />
      <button
        type="submit"
        className="rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
      >
        Delete
      </button>
    </form>
  );
}
