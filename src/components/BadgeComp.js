import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Badge } from "reactstrap";
import { useStateContext } from "../context/StateProvider";
const BadgeComp = ({ lang, index }) => {
  const { allLanguages, setallLanguages } = useStateContext();

  const handleDelete = () => {
    const updated = allLanguages.filter((el, i) => {
      return i !== index;
    });

    setallLanguages(updated);
  };

  return (
    <>
      <Badge className="lh-0 badge" color="secondary" pill>
        {lang}{" "}
        <IoCloseCircleOutline onClick={handleDelete} className="close-icon" />
      </Badge>
    </>
  );
};

export default BadgeComp;
