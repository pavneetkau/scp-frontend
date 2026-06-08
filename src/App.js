import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import "./App.css";

function App() {
  const [scps, setScps] = useState([]);
  const [form, setForm] = useState({
    item: "",
    class: "",
    description: "",
    containment: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchScps();
  }, []);

  async function fetchScps() {
    const { data, error } = await supabase
      .from("scps")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setScps(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      await supabase.from("scps").update(form).eq("id", editId);
      setEditId(null);
    } else {
      await supabase.from("scps").insert([form]);
    }

    setForm({ item: "", class: "", description: "", containment: "" });
    fetchScps();
  }

  function handleEdit(scp) {
    setEditId(scp.id);
    setForm({
      item: scp.item,
      class: scp.class,
      description: scp.description,
      containment: scp.containment,
    });
  }

  async function handleDelete(id) {
    await supabase.from("scps").delete().eq("id", id);
    fetchScps();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>SCP Database</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input name="item" placeholder="Item" value={form.item} onChange={handleChange} required />
        <br /><br />

        <input name="class" placeholder="Class" value={form.class} onChange={handleChange} required />
        <br /><br />

        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <br /><br />

        <textarea name="containment" placeholder="Containment" value={form.containment} onChange={handleChange} required />
        <br /><br />

        <button type="submit">{editId ? "Update SCP" : "Add SCP"}</button>
      </form>

      {scps.map((scp) => (
        <div
          key={scp.id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{scp.item}</h3>
          <p><b>Class:</b> {scp.class}</p>
          <p><b>Description:</b> {scp.description}</p>
          <p><b>Containment:</b> {scp.containment}</p>

          <button onClick={() => handleEdit(scp)}>Edit</button>
          <button onClick={() => handleDelete(scp.id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
