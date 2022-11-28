import React from "react";
import DataList from "../components/DataList";
import FormComp from "../components/FormComp";
import { useStateContext } from "../context/StateProvider";
const Home = () => {
  const { country } = useStateContext();

  return (
    <div className="my-5">
      <FormComp />
      {country.length > 0 && <DataList />}
    </div>
  );
};

export default Home;
