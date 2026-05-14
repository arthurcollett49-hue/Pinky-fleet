import React, { useState } from "react";

const VEHICLES = [
  "BGO389","BHF588","BHD882","BHD693","BGM306","BGT109",
  "IAF182","BHC080","CBM462","CBJ773","CBH141","CBN221",
  "BHL449","BHL451","BHL450"
];

export default function App() {
  const [vehicle, setVehicle] = useState(VEHICLES[0]);
  const [logs, setLogs] = useState([]);
  const [text, setText] = useState("");

  const addLog = (type) => {
    if (!text) return;

    const log = {
      id: Date.now(),
      vehicle,
      type,
      message: text,
      createdAt: new Date().toLocaleString()
    };

    setLogs([log, ...logs]);
    setText("");
  };

  return (
    <div style={{padding:20,fontFamily:"Arial"}}>
      <h1>Pinky Fleet Management</h1>

      <div style={{marginBottom:20}}>
        <label>Select Vehicle:</label><br/>
        <select
          value={vehicle}
          onChange={(e)=>setVehicle(e.target.value)}
          style={{padding:10,width:"100%",marginTop:5}}
        >
          {VEHICLES.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>

      <div style={{marginBottom:20}}>
        <input
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Enter inspection / breakdown / maintenance note"
          style={{padding:10,width:"100%"}}
        />
      </div>

      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <button onClick={()=>addLog("Inspection")}>Inspection</button>
        <button onClick={()=>addLog("Breakdown")}>Breakdown</button>
        <button onClick={()=>addLog("Maintenance")}>Maintenance</button>
      </div>

      <hr style={{margin:"20px 0"}}/>

      <h2>Fleet Logs</h2>

      {logs.length === 0 && <p>No logs recorded yet.</p>}

      {logs.map(log => (
        <div
          key={log.id}
          style={{
            border:"1px solid #ccc",
            borderRadius:8,
            padding:10,
            marginBottom:10
          }}
        >
          <b>{log.vehicle}</b><br/>
          <b>Type:</b> {log.type}<br/>
          <b>Note:</b> {log.message}<br/>
          <small>{log.createdAt}</small>
        </div>
      ))}
    </div>
  );
}
