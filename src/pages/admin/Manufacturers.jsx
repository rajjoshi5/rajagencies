import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

export default function Manufacturers() {
  const navigate = useNavigate()

  const [tab, setTab] = useState("list")
  const [manufacturers, setManufacturers] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saving, setSaving] = useState(false)

  const [search, setSearch] = useState("")
  const [stateFilter, setStateFilter] = useState("")

  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    phone: "",
  })

  useEffect(() => {
    fetchManufacturers()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search, stateFilter])

  /* ---------------- Fetch ---------------- */
  async function fetchManufacturers() {
    setLoading(true)
    const { data, error } = await supabase
      .from("manufacturers")
      .select("*")
      .order("name", { ascending: true })

    if (!error) setManufacturers(data || [])
    else console.error("Fetch error:", error.message)

    setLoading(false)
  }

  /* ---------------- Add ---------------- */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function addManufacturer() {
    if (!form.name.trim()) return alert("Manufacturer name is required")

    const { error } = await supabase.from("manufacturers").insert([form])
    if (error) alert(error.message)
    else {
      setShowModal(false)
      setForm({ name: "", city: "", state: "", phone: "" })
      fetchManufacturers()
    }
  }

  /* ---------------- Delete ---------------- */
  async function deleteManufacturer() {
    if (!deleteTarget) return
    setDeleting(true)

    const { error } = await supabase
      .from("manufacturers")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) alert(error.message)
    else {
      setDeleteTarget(null)
      fetchManufacturers()
    }

    setDeleting(false)
  }

  /* ---------------- Edit ---------------- */
  function startEdit(mfr) {
    setEditingId(mfr.id)
    setEditForm({
      name: mfr.name || "",
      city: mfr.city || "",
      state: mfr.state || "",
      phone: mfr.phone || "",
    })
  }

  function handleEditChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  async function saveEdit(id) {
    setSaving(true)
    const { error } = await supabase
      .from("manufacturers")
      .update(editForm)
      .eq("id", id)

    if (error) alert(error.message)
    else {
      setEditingId(null)
      fetchManufacturers()
    }

    setSaving(false)
  }

  /* ---------------- Search & Filter ---------------- */
  const filteredManufacturers = manufacturers.filter((mfr) => {
    const text = `${mfr.name} ${mfr.city} ${mfr.state} ${mfr.phone}`.toLowerCase()
    return (
      text.includes(search.toLowerCase()) &&
      (!stateFilter || mfr.state === stateFilter)
    )
  })

  const uniqueStates = [
    ...new Set(manufacturers.map((m) => m.state).filter(Boolean)),
  ]

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(filteredManufacturers.length / pageSize)

  const paginatedManufacturers = filteredManufacturers.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  /* ---------------- Analytics ---------------- */
  const totalManufacturers = manufacturers.length

  const countByState = manufacturers.reduce((acc, m) => {
    if (!m.state) return acc
    acc[m.state] = (acc[m.state] || 0) + 1
    return acc
  }, {})

  const topCities = Object.entries(
    manufacturers.reduce((acc, m) => {
      if (!m.city) return acc
      acc[m.city] = (acc[m.city] || 0) + 1
      return acc
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="max-w-full overflow-x-hidden">

      {/* Back */}
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 text-sm text-blue-700 hover:underline"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            Manufacturers
          </h1>
          <p className="text-slate-600 mt-1">
            Manage your manufacturer network
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 w-full md:w-auto"
        >
          ➕ Add Manufacturer
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mt-6">
        {["list", "analytics"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg font-medium capitalize ${
              tab === t
                ? "bg-blue-900 text-white"
                : "bg-white border hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* LIST */}
      {tab === "list" && (
        <>
          {/* Search */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <input
              placeholder="🔍 Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-80"
            />

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-60"
            >
              <option value="">All States</option>
              {uniqueStates.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto">
  {loading ? (
    <p className="p-6 text-slate-500">Loading...</p>
  ) : (
    <table className="w-full border">
      <thead className="bg-slate-100 text-xs md:text-sm">
        <tr>
          <th className="p-2 md:p-3 border">Name</th>
          <th className="p-2 md:p-3 border">City</th>

          {/* Hide on mobile */}
          <th className="hidden md:table-cell p-2 md:p-3 border">
            State
          </th>
          <th className="hidden md:table-cell p-2 md:p-3 border">
            Phone
          </th>
          <th className="hidden md:table-cell p-2 md:p-3 border text-center">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="text-xs md:text-sm">
        {paginatedManufacturers.map((mfr) => (
          <tr key={mfr.id} className="hover:bg-slate-50">

            <td className="p-2 md:p-3 border font-medium">
              {mfr.name}
            </td>

            <td className="p-2 md:p-3 border">
              {mfr.city || "-"}
            </td>

            {/* Desktop only */}
            <td className="hidden md:table-cell p-2 md:p-3 border">
              {mfr.state || "-"}
            </td>

            <td className="hidden md:table-cell p-2 md:p-3 border">
              {mfr.phone || "-"}
            </td>

            <td className="hidden md:table-cell p-2 md:p-3 border text-center whitespace-nowrap">
              <button
                onClick={() => startEdit(mfr)}
                className="text-blue-700 mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteTarget(mfr)}
                className="text-red-600"
              >
                Delete
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4 text-sm">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span>
                Page {page} / {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* ANALYTICS */}
      {tab === "analytics" && (
        <div className="mt-8 space-y-6">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500">Total Manufacturers</p>
            <p className="text-4xl font-bold text-blue-900">
              {totalManufacturers}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">By State</h3>
              {Object.entries(countByState).map(([state, count]) => (
                <div key={state} className="flex justify-between text-sm">
                  <span>{state}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Top Cities</h3>
              {topCities.map(([city, count]) => (
                <div key={city} className="flex justify-between text-sm">
                  <span>{city}</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="font-bold mb-4">Add Manufacturer</h2>

            {["name", "city", "state", "phone"].map((f) => (
              <input
                key={f}
                name={f}
                placeholder={f}
                value={form[f]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
            ))}

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={addManufacturer}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md">
            <p>
              Delete <b>{deleteTarget.name}</b>?
            </p>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button
                onClick={deleteManufacturer}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
