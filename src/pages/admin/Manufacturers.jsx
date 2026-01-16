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
  const [pageSize, setPageSize] = useState(10)

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

  /* ---------------------------
      Fetch Manufacturers
  ---------------------------- */
  async function fetchManufacturers() {
    setLoading(true)

    const { data, error } = await supabase
      .from("manufacturers")
      .select("*")
      .order("name", { ascending: true })

    if (!error) {
      setManufacturers(data || [])
    } else {
      console.error("Fetch error:", error.message)
    }

    setLoading(false)
  }

  /* ---------------------------
      Add Manufacturer
  ---------------------------- */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function addManufacturer() {
    if (!form.name.trim()) {
      alert("Manufacturer name is required")
      return
    }

    const { error } = await supabase
      .from("manufacturers")
      .insert([form])

    if (error) {
      alert(error.message)
    } else {
      setShowModal(false)
      setForm({ name: "", city: "", state: "", phone: "" })
      fetchManufacturers()
    }
  }

  /* ---------------------------
      Delete Manufacturer
  ---------------------------- */
  async function deleteManufacturer() {
    if (!deleteTarget) return

    setDeleting(true)

    const { error } = await supabase
      .from("manufacturers")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) {
      alert(error.message)
    } else {
      setDeleteTarget(null)
      fetchManufacturers()
    }

    setDeleting(false)
  }

  /* ---------------------------
      Inline Edit
  ---------------------------- */
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

    if (error) {
      alert(error.message)
    } else {
      setEditingId(null)
      fetchManufacturers()
    }

    setSaving(false)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  /* ---------------------------
      Search & Filters
  ---------------------------- */
  const filteredManufacturers = manufacturers.filter((mfr) => {
    const text = `${mfr.name} ${mfr.city} ${mfr.state} ${mfr.phone}`.toLowerCase()
    const matchesSearch = text.includes(search.toLowerCase())
    const matchesState =
      !stateFilter || mfr.state === stateFilter

    return matchesSearch && matchesState
  })

  const uniqueStates = [
    ...new Set(manufacturers.map((m) => m.state).filter(Boolean)),
  ]

  /* ---------------------------
      Pagination
  ---------------------------- */
  const totalPages = Math.ceil(filteredManufacturers.length / pageSize)

  const paginatedManufacturers = filteredManufacturers.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  /* ---------------------------
      Analytics
  ---------------------------- */
  const totalManufacturers = manufacturers.length

  const countByState = manufacturers.reduce((acc, m) => {
    if (!m.state) return acc
    acc[m.state] = (acc[m.state] || 0) + 1
    return acc
  }, {})

  const countByCity = manufacturers.reduce((acc, m) => {
    if (!m.city) return acc
    acc[m.city] = (acc[m.city] || 0) + 1
    return acc
  }, {})

  const topCities = Object.entries(countByCity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 text-sm text-blue-700 hover:underline"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex items-center justify-between">
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
          className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
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
            className={`px-5 py-2 rounded-lg font-medium capitalize transition ${
              tab === t
                ? "bg-blue-900 text-white"
                : "bg-white border hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* LIST TAB */}
      {tab === "list" && (
        <>
          {/* Search & Filters */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="🔍 Search name, city, state, phone..."
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
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {(search || stateFilter) && (
              <button
                onClick={() => {
                  setSearch("")
                  setStateFilter("")
                }}
                className="text-sm text-blue-700 underline"
              >
                Clear Filters
              </button>
            )}

          </div>

          {/* Table */}
          <div className="mt-6 bg-white rounded-xl shadow overflow-x-auto">
            {loading ? (
              <p className="p-6 text-slate-500">Loading manufacturers...</p>
            ) : paginatedManufacturers.length === 0 ? (
              <p className="p-6 text-slate-500">
                No matching manufacturers found.
              </p>
            ) : (
              <table className="w-full border">
                <thead className="bg-slate-100 text-sm">
                  <tr>
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">City</th>
                    <th className="p-3 border">State</th>
                    <th className="p-3 border">Phone</th>
                    <th className="p-3 border text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {paginatedManufacturers.map((mfr) => (
                    <tr key={mfr.id} className="hover:bg-slate-50">

                      <td className="p-3 border font-medium">
                        {editingId === mfr.id ? (
                          <input
                            name="name"
                            value={editForm.name}
                            onChange={handleEditChange}
                            className="w-full border rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          mfr.name
                        )}
                      </td>

                      <td className="p-3 border">
                        {editingId === mfr.id ? (
                          <input
                            name="city"
                            value={editForm.city}
                            onChange={handleEditChange}
                            className="w-full border rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          mfr.city || "-"
                        )}
                      </td>

                      <td className="p-3 border">
                        {editingId === mfr.id ? (
                          <input
                            name="state"
                            value={editForm.state}
                            onChange={handleEditChange}
                            className="w-full border rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          mfr.state || "-"
                        )}
                      </td>

                      <td className="p-3 border">
                        {editingId === mfr.id ? (
                          <input
                            name="phone"
                            value={editForm.phone}
                            onChange={handleEditChange}
                            className="w-full border rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          mfr.phone || "-"
                        )}
                      </td>

                      <td className="p-3 border text-center">
                        {editingId === mfr.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(mfr.id)}
                              disabled={saving}
                              className="text-green-700 hover:underline text-sm mr-3"
                            >
                              {saving ? "Saving..." : "Save"}
                            </button>

                            <button
                              onClick={cancelEdit}
                              className="text-slate-600 hover:underline text-sm"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(mfr)}
                              className="text-blue-700 hover:underline text-sm mr-3"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => setDeleteTarget(mfr)}
                              className="text-red-600 hover:underline text-sm"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">

              <p className="text-sm text-slate-600">
                Page {page} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded border text-sm ${
                      page === i + 1
                        ? "bg-blue-900 text-white"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setPage(1)
                }}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
              </select>

            </div>
          )}
        </>
      )}

      {/* ANALYTICS TAB */}
      {tab === "analytics" && (
        <div className="mt-8 space-y-6">

          {/* KPI */}
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-slate-500 text-sm">Total Manufacturers</p>
            <p className="text-4xl font-bold text-blue-900">
              {totalManufacturers}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Count by State */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">
                Manufacturers by State
              </h3>

              <div className="space-y-2">
                {Object.entries(countByState).map(([state, count]) => (
                  <div
                    key={state}
                    className="flex justify-between border-b pb-1 text-sm"
                  >
                    <span>{state}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cities */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">
                Top Cities
              </h3>

              <div className="space-y-2">
                {topCities.map(([city, count]) => (
                  <div
                    key={city}
                    className="flex justify-between border-b pb-1 text-sm"
                  >
                    <span>{city}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Manufacturer Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Add Manufacturer
            </h2>

            <div className="space-y-3">
              <input
                name="name"
                placeholder="Manufacturer Name *"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={addManufacturer}
                className="px-4 py-2 rounded-lg bg-blue-900 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold mb-2 text-red-600">
              Delete Manufacturer
            </h2>

            <p className="text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deleteTarget.name}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={deleteManufacturer}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
