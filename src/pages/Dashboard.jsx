import React from "react";
import dataMahasiswa from "../data/dataMahasiswa";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie } from "recharts";

const Dashboard = () => {

  const totalMahasiswa = dataMahasiswa.length;

  const totalNilai = dataMahasiswa.reduce((acc, mhs) => acc + mhs.nilai, 0);

  const rataRataNilai = totalNilai / totalMahasiswa;

  const nilaiTertinggi = Math.max(...dataMahasiswa.map(mhs => mhs.nilai));

  const dataJurusan = [
    {
      jurusan: "Informatika",
      jumlah: dataMahasiswa.filter(mhs => mhs.jurusan === "Informatika").length
    },
    {
      jurusan: "Sistem Informasi",
      jumlah: dataMahasiswa.filter(mhs => mhs.jurusan === "Sistem Informasi").length
    }
  ];
const dataSemester = [
  { semester: 1, nilai: dataMahasiswa.filter(m => m.semester === 1).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 1).length || 0 },
  { semester: 2, nilai: dataMahasiswa.filter(m => m.semester === 2).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 2).length || 0 },
  { semester: 3, nilai: dataMahasiswa.filter(m => m.semester === 3).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 3).length || 0 },
  { semester: 4, nilai: dataMahasiswa.filter(m => m.semester === 4).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 4).length || 0 },
  { semester: 5, nilai: dataMahasiswa.filter(m => m.semester === 5).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 5).length || 0 },
  { semester: 6, nilai: dataMahasiswa.filter(m => m.semester === 6).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 6).length || 0 },
  { semester: 7, nilai: dataMahasiswa.filter(m => m.semester === 7).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 7).length || 0 },
  { semester: 8, nilai: dataMahasiswa.filter(m => m.semester === 8).reduce((a, b) => a + b.nilai, 0) / dataMahasiswa.filter(m => m.semester === 8).length || 0 },
];

const dataGender = [
  {
    name: "Laki-laki",
    value: dataMahasiswa.filter(m => m.gender === "L").length
  },
  {
    name: "Perempuan",
    value: dataMahasiswa.filter(m => m.gender === "P").length
  }
];

  return (
    <div>
      <h1>Dashboard Data Mahasiswa</h1>

      <h3>Total Mahasiswa: {totalMahasiswa}</h3>
      <h3>Rata-rata Nilai: {rataRataNilai.toFixed(2)}</h3>
      <h3>Nilai Tertinggi: {nilaiTertinggi}</h3>

      <h2>Jumlah Mahasiswa per Jurusan</h2>

      <BarChart width={400} height={300} data={dataJurusan}>
        <XAxis dataKey="jurusan" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="jumlah" />
      </BarChart>
      
      <h2>Tren Nilai per Semester</h2>

<LineChart width={400} height={300} data={dataSemester}>
  <XAxis dataKey="semester" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="nilai" />
</LineChart>

<h2>Distribusi Gender</h2>

<PieChart width={400} height={300}>
  <Pie
    data={dataGender}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={100}
    label
  />
  <Tooltip />
</PieChart>

<h2>Data Mahasiswa</h2>

<table border="1" cellPadding="10">
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

      <ul>
        {dataMahasiswa.map((mhs, index) => (
          <li key={index}>
            {mhs.nama} - {mhs.jurusan} - Nilai: {mhs.nilai}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;