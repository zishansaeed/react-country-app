import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { useStateContext } from "../context/StateProvider";
import { Link } from "react-router-dom";
const TableRow = ({ index }) => {
  const { country } = useStateContext();
  useEffect(() => {
    fetchData();
  }, [country]);

  const el = country[index];
  const languages = el.languages;

  const fetchData = () => {};

  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{el.name.common}</td>
        <td>{el.name.official}</td>
        <td>{Object.values(languages).join(",")}</td>
        <td>
          <Link to={`/country/${index}`}>
            <Button outline color="success">
              View
            </Button>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
