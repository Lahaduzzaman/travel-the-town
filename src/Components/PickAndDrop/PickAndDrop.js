import React from "react";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { locations } from "../../fakeData/locations";
import "./PickAndDrop.css";
import { transportData } from '../../fakeData/transports';
import FoundTransport from "../FoundTransport/FoundTransport";


const PickAndDrop = () => {
  const { key } = useParams()
  const transport = transportData.find(transport => transport.key === key)
  const [locationData] = useState(locations);
  const [search, setSearch] = useState(false);
  const [destination, setDestination] = useState({
    pick: "",
    drop: "",
  });
  let transportAndDestination = { ...transport, destination }

  const handleChange = (e) => {
    let isFieldValid = true
    if (e.target.name === 'pick') {
      isFieldValid = e.target.value
    }
    if (e.target.name === 'drop') {
      isFieldValid = e.target.value
    }
    if (isFieldValid) {

      destination[e.target.name] = e.target.value;
      setDestination(destination)

    }
  };

  return (
    <Container>
      {!search ? (
        <Card
          className="my-3 p-3 w-100"
          style={{ backgroundColor: "#d4d4d4", borderRadius: '10px' }}
        >
          <form onSubmit={() => setSearch(true)}>
            <label htmlFor="pick">Pick From</label>
            <br />
            <input
              name="pick"
              onChange={handleChange}
              className="select-destination"
              list="pick"
              placeholder="Select Pick Up Location"
              required
            />
            <datalist name="pick" id="pick">
              {locationData.map((location) => (
                <option value={location}>{location}</option>
              ))}
            </datalist>
            <br />
            <label htmlFor="drop">Drop To</label>
            <br />
            <input
              name="drop"
              onChange={handleChange}
              list="drop"
              placeholder="Select Drop Location"
              required
            />
            <datalist name="drop" id="drop">
              {locationData.map((location) => (
                <option value={location}>{location}</option>
              ))}
            </datalist>
            <br />
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" required />
            <input
              className="btn btn-primary w-100 my-3"
              type="Submit"
              value="Search"
              style={{ borderRadius: '10px' }}
            />

          </form>
        </Card>
      ) :
        <FoundTransport transportAndDestination={transportAndDestination}></FoundTransport>
      }

    </Container>
  );
};

export default PickAndDrop;
