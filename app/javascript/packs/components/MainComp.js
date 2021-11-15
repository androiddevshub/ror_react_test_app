import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import axios from "axios";

const MainComp = () => {
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState(null);
  const [value, setValue] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [graphData, setGraphData] = useState([]);
  const [optionsXAxis, setOptionsXAxis] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  const getMonth = (e) => {
    setMonth(e.target.value);
  };
  const getValue = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/api/graphs")
      .then(function (response) {
        // handle success
        setGraphData(response.data.data);
        setOptionsXAxis(response.data.options);
        setSeriesData(response.data.series);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [show]);

  const submitData = () => {
    axios
      .post("/api/graphs", {
        month: month,
        value: value,
      })
      .then(function (response) {
        // handle success
        setShow(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        setShow(false);
      });
  };

  const options = {
    dataLabels: {
      enabled: false,
    },
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: optionsXAxis,
    },
  };
  const series = [
    {
      name: "Desktops",
      data: seriesData,
    },
  ];

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.No.</TableCell>
                    <TableCell>Month</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {graphData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.month}
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options}
                series={series}
                type="line"
                width="500"
              />
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Graph Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextMonth"
              >
                <Form.Label column sm="2">
                  Month
                </Form.Label>
                <Col sm="10">
                  <Form.Control onChange={getMonth} />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextValue"
              >
                <Form.Label column sm="2">
                  Value
                </Form.Label>
                <Col sm="10">
                  <Form.Control onChange={getValue} />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitData}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default MainComp;
