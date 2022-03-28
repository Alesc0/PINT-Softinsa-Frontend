import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function TableUsers() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/utilizador/list");
        setInfo(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Data Nascimento</TableCell>
            <TableCell align="center">Telemóvel</TableCell>
            <TableCell align="center">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info.map((row) => (
            <TableRow
              key={row.idutilizador}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.idutilizador}
              </TableCell>
              <TableCell align="center">{row.nome}</TableCell>
              <TableCell align="center">{row.datanascimento}</TableCell>
              <TableCell align="center">{row.telemovel}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
