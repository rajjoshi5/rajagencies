import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"

export default function Retailers() {
  const navigate = useNavigate()

  const [retailers, setRetailers] = useState([])
  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    GST: "",
  })

  useEffect(() => {
    fetchRetailers()
  }, [])

  async function fetchRetailers() {
    setLoading(true)

    const { data, error } = await supabase
      .from("retailers")
      .select("*")
      .order("name", { ascending: true })

    if (!error) setRetailers(data || [])
    else console.error("Fetch error:", error.message)

    setLoading(false)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function addRetailer() {
    if (!form.name.trim()) return alert("Retailer name required")

    const { error } = await supabase.from("retailers").insert([form])

    if (error) alert(error.message)
    else {
      setShowModal(false)
      setForm({ name: "", city: "", state: "", GST: "" })
      fetchRetailers()
    }
  }

  async function deleteRetailer() {
    if (!deleteTarget) return

    const { error } = await supabase
      .from("retailers")
      .delete()
      .eq("id", deleteTarget.id)

    if (error) alert(error.message)
    else {
      setDeleteTarget(null)
      fetchRetailers()
    }
  }

  return (
    <div>
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
            Retailers
          </h1>
          <p className="text-slate-600 mt-1">
            Manage your retailer network
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 w-full md:w-auto"
        >
          ➕ Add Retailer
        </button>
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
                <th className="hidden md:table-cell p-2 md:p-3 border">
                  State
                </th>
                <th className="hidden md:table-cell p-2 md:p-3 border">
                  GST
                </th>
                <th className="hidden md:table-cell p-2 md:p-3 border text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-xs md:text-sm">
              {retailers.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-2 md:p-3 border font-medium">
                    {r.name}
                  </td>
                  <td className="p-2 md:p-3 border">
                    {r.city || "-"}
                  </td>
                  <td className="hidden md:table-cell p-2 md:p-3 border">
                    {r.state || "-"}
                  </td>
                  <td className="hidden md:table-cell p-2 md:p-3 border">
                    {r.GST || "-"}
                  </td>
                  <td className="hidden md:table-cell p-2 md:p-3 border text-center">
                    <button
                      onClick={() => setDeleteTarget(r)}
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

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="font-bold mb-4">
              Add Retailer
            </h2>

            {["name", "city", "state", "GST"].map((f) => (
              <input
                key={f}
                name={f}
                placeholder={f.toUpperCase()}
                value={form[f]}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
            ))}

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                onClick={addRetailer}
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
              <button onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                onClick={deleteRetailer}
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
