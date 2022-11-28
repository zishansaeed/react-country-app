import React, { useEffect } from "react";
import { Table, Container } from "reactstrap";
import { useStateContext } from "../context/StateProvider";
import TableRow from "./TableRow";
const DataList = () => {
  const { country } = useStateContext();
  useEffect(() => {}, [country]);

  return (
    <div className="mt-5">
      <Container>
        <Table hover responsive striped bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Common Name</th>
              <th>Official Name</th>
              <th>Languages</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {country.map((_, index) => (
              <TableRow index={index} key={index} />
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default DataList;
