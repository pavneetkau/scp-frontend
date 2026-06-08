import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [scps, setScps] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchScps();
  }, []);

  async function fetchScps() {
    const { data, error } = await supabase
      .from("scps")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("Supabase error:", error.message);
      setErrorMsg(error.message);
    } else {
      console.log("Supabase data:", data);
      setScps(data);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>SCP Database</h1>

      {errorMsg && <p style={{ color: "red" }}>Error: {errorMsg}</p>}

      {scps.length === 0 && <p>No SCP records found.</p>}

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
        </div>
      ))}
    </div>
  );
}

export default App;
