import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  Input,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useStateContext } from "../context/StateProvider";
import BadgeComp from "../components/BadgeComp";
const CountryDetail = () => {
  const [input, setinput] = useState(false);
  const params = useParams();
  const id = params.id;
  let currencies = "";
  let newLanguages = {};

  const { country, setCountry, allLanguages, setallLanguages } =
    useStateContext();

  const selectedCountry = country[id];

  for (const [_, value] of Object.entries(selectedCountry.currencies)) {
    currencies += `${value.name}:${value.symbol} `;
  }

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [lang, setlang] = useState("");
  useEffect(() => {
    setallLanguages([...Object.values(selectedCountry.languages)]);
  }, []);

  const handleChange = (e) => {
    setlang(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const lowerLang = allLanguages.map((el) => el.toLowerCase());

    if (!lowerLang.includes(lang.toLocaleLowerCase())) {
      setinput(false);
      setallLanguages((prevData) => [...prevData, lang]);
      setlang("");
    } else {
      setinput(true);
      //Object.assign( inputRef.current.props,{...inputRef.current.props,invalid})
    }
  };

  const handleSave = () => {
    allLanguages.forEach((el) => {
      Object.assign(newLanguages, { [el.slice(0, 3).toLowerCase()]: el });
    });
    toggle();
    selectedCountry.languages = newLanguages;
  };

  return (
    <div className="mt-5">
      <Container className="d-flex align-items-center justify-content-center">
        <Col xs="12" md="6">
          <Card>
            <CardImg
              alt="Card image cap"
              src={selectedCountry.flags.svg}
              top
              width="100%"
            />
            <CardBody>
              <ListGroup horizontal>
                <ListGroupItem>Region</ListGroupItem>
                <ListGroupItem>{selectedCountry.region}</ListGroupItem>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroupItem>Sub Region</ListGroupItem>
                <ListGroupItem>{selectedCountry.subregion}</ListGroupItem>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroupItem>Currencies</ListGroupItem>
                <ListGroupItem>{currencies}</ListGroupItem>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroupItem className="d-flex gap-2">
                  Location
                  <BsFillPinMapFill />
                </ListGroupItem>
                <ListGroupItem
                  action
                  className="d-flex justify-content-center"
                  href={selectedCountry.maps.openStreetMaps}
                  target="_black"
                  tag="a"
                >
                  <FaMapMarkerAlt />
                </ListGroupItem>
              </ListGroup>
              <ListGroup horizontal>
                <ListGroupItem>
                  <ListGroupItemHeading>Languages</ListGroupItemHeading>
                </ListGroupItem>
                <ListGroupItem>
                  <Button className="w-100 btn-danger" onClick={toggle}>
                    Add
                  </Button>
                </ListGroupItem>
              </ListGroup>
              <ListGroup>
                <ListGroupItem>
                  {Object.values(selectedCountry.languages).join()}
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Languages</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Col sm={8}>
                  <Input
                    invalid={input}
                    id="language"
                    name="language"
                    placeholder="enter language"
                    type="text"
                    value={lang}
                    onChange={handleChange}
                  />
                  <FormFeedback invalid>
                    This language name is already present.
                  </FormFeedback>
                </Col>
                <Col sm={4}>
                  <Button>Add</Button>
                </Col>
              </FormGroup>
            </Form>
            <div className="d-flex flex-wrap gap-1">
              {allLanguages.map((lang, index) => (
                <BadgeComp lang={lang} index={index} key={index} />
              ))}{" "}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSave}>
              save
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default CountryDetail;
