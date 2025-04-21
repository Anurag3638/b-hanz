export default function AdminNavbar() {
  return (
    <div className="bg-white shadow p-4 flex flex-row justify-between items-center">
      <h1 className="text-lg font-semibold">Welcome, Admin</h1>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Home
      </button>
    </div>
  );
}
