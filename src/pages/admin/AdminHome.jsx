export default function AdminHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-slate-600">
        Welcome Raj 👋  
        Use the sidebar to manage manufacturers and analytics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-slate-500">Manufacturers</p>
          <p className="text-3xl font-bold mt-2">1</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-slate-500">Retailers</p>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-slate-500">Collections</p>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

      </div>
    </div>
  )
}
