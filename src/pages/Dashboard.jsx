import React from "react";
import dataMahasiswa from "../data/dataMahasiswa";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {

  const totalMahasiswa = dataMahasiswa.length;
  const totalNilai = dataMahasiswa.reduce((acc, mhs) => acc + mhs.nilai, 0);
  const rataRataNilai = totalNilai / totalMahasiswa;
  const nilaiTertinggi = Math.max(...dataMahasiswa.map(mhs => mhs.nilai));

  const dataJurusan = [
    { jurusan: "Informatika", jumlah: dataMahasiswa.filter(m => m.jurusan === "Informatika").length },
    { jurusan: "Sistem Informasi", jumlah: dataMahasiswa.filter(m => m.jurusan === "Sistem Informasi").length }
  ];

  const dataSemester = [1,2,3,4,5,6,7,8].map(s => ({
    semester: s,
    nilai:
      dataMahasiswa.filter(m => m.semester === s).reduce((a, b) => a + b.nilai, 0) /
      (dataMahasiswa.filter(m => m.semester === s).length || 1)
  }));

  const dataGender = [
    { name: "Laki-laki", value: dataMahasiswa.filter(m => m.gender === "L").length },
    { name: "Perempuan", value: dataMahasiswa.filter(m => m.gender === "P").length }
  ];

  const COLORS = ["#3b82f6", "#60a5fa"];

  return (
    <div style={{ padding: "20px", background: "#e6f0ff", minHeight: "100vh", fontFamily: "Arial" }}>
      
      <h1 style={{ marginBottom: "20px", color: "#1e3a8a" }}>📊 Dashboard Data Mahasiswa</h1>

      {/* KPI GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>
        
        <div style={{ background: "#2563eb", color: "white", padding: "20px", borderRadius: "12px" }}>
          <h4>👨‍🎓 Total Mahasiswa</h4>
          <h2>{totalMahasiswa}</h2>
        </div>

        <div style={{ background: "#3b82f6", color: "white", padding: "20px", borderRadius: "12px" }}>
          <h4>📈 Rata-rata Nilai</h4>
          <h2>{rataRataNilai.toFixed(2)}</h2>
        </div>

        <div style={{ background: "#60a5fa", color: "white", padding: "20px", borderRadius: "12px" }}>
          <h4>🏆 Nilai Tertinggi</h4>
          <h2>{nilaiTertinggi}</h2>
        </div>

      </div>

      {/* GRID CHART */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        
        {/* LEFT */}
        <div>

          {/* BAR */}
          <div style={{ background: "white", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
            <h3>📊 Jumlah Mahasiswa per Jurusan</h3>
            <BarChart width={500} height={300} data={dataJurusan}>
              <XAxis dataKey="jurusan" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: "10px" }} />
              <Bar dataKey="jumlah" fill="#3b82f6" />
            </BarChart>
          </div>

          {/* LINE */}
          <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <h3>📈 Tren Nilai per Semester</h3>
            <LineChart width={500} height={300} data={dataSemester}>
              <XAxis dataKey="semester" />
              <YAxis />
              <Tooltip contentStyle={{ borderRadius: "10px" }} />
              <Line type="monotone" dataKey="nilai" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </div>

        </div>

        {/* RIGHT */}
        <div>

          {/* PIE */}
          <div style={{ background: "white", padding: "20px", borderRadius: "12px" }}>
            <h3>🥧 Distribusi Gender</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={dataGender}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {dataGender.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "10px" }} />
            </PieChart>
          </div>

        </div>

      </div>

      {/* TABLE */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", marginTop: "20px" }}>
        <h3>📋 Data Mahasiswa</h3>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Jurusan</th>
              <th>Semester</th>
              <th>Nilai</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {dataMahasiswa.map((mhs, index) => (
              <tr key={index}>
                <td>{mhs.nama}</td>
                <td>{mhs.jurusan}</td>
                <td>{mhs.semester}</td>
                <td>{mhs.nilai}</td>
                <td>{mhs.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;