import React, { useEffect, useState } from "react";
 
function App() {
  const [scps, setScps] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:5000/api/scps")
      .then((res) => res.json())
      .then((data) => setScps(data))
      .catch((err) => console.log(err));
  }, []);
 
  return (
    <div style={{ padding: "20px" }}>
      <h1>SCP Database</h1>
 
      {scps.map((scp) => (
        <div
          key={scp._id}
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