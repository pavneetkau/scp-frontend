import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [scps, setScps] = useState([]);

  useEffect(() => {
    getScps();
  }, []);

  async function getScps() {
    const { data, error } = await supabase
      .from("scps")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.log("Supabase error:", error);
    } else {
      setScps(data);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>SCP Database</h1>

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
