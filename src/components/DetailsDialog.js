import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

const DetailsDialog = (props) => {
  
  let rocketArr = [props.rocketDetails];
  let weatherArr = [props.weatherResponse];

  const toast = useRef();

  const headers = new Headers({
    "x-api-key": "API_KEY_1",
    "content-type": "application/json; charset = UTF-8",
  });

  const deployedProcess = async () => {
    await fetch(
      " http://localhost:5000/rocket/" +
        props.rocketDetails.id +
        "/status/deployed",
      {
        method: "PUT",
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast.current.show({ severity: "success", summary: "Rocket deployed" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const launchedProcess = async () => {
    if (props.rocketDetails.timestamps.deployed) {
      await fetch(
        " http://localhost:5000/rocket/" +
          props.rocketDetails.id +
          "/status/launched",
        {
          method: "PUT",
          headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          toast.current.show({
            severity: "success",
            summary: "Rocket launched",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.current.show({
        severity: "warn",
        summary: "First of all deployed",
      });
    }
  };

  return (
    <div>
      <div className="flex-initial flex align-items-center  m-2">
        <Card
          title="Details"
          style={{
            width: "110rem",
            height: "20rem",
            marginBottom: "2em",
            color: "#00000",
            marginRight: "1rem",
          }}
        >
          <DataTable value={rocketArr}>
            <Column field="id" header="Id" />
            <Column field="mass" header="Mass" />
            <Column field="model" header="Model" />
            <Column field="payload.description" header="Description" />
            <Column field="acceleration" header="Acceleration" />
            <Column field="altitude" header="Altitude" />
            <Column field="payload.weight" header="Weight" />
            <Column field="speed" header="Speed" />
            <Column field="status" header="Status" />
            <Column field="temperature" header="Temperature" />
            <Column field="thrust" header="Thrust" />
            <Column field="timestamps.cancelled" header="Cancelled" />
            <Column field="timestamps.deployed" header="Deployed" />
            <Column field="timestamps.failed" header="Failed" />
            <Column field="timestamps.launched" header="Launched" />
          </DataTable>
        </Card>
      </div>
      <Card
        title="Weather"
        style={{
          width: "103rem",
          height: "13rem",
          marginBottom: "2em",
          marginRight: "1rem",
        }}
      >
        <DataTable value={weatherArr}>
          <Column field="humidity" header="Humidity" />
          <Column field="precipitation.hail" header="Hail" />
          <Column field="precipitation.probability" header="Probability" />
          <Column field="precipitation.rain" header="Rain" />
          <Column field="precipitation.sleet" header="Sleet" />
          <Column field="precipitation.snow" header="Snow" />
          <Column field="pressure" header="Pressure" />
          <Column field="temperature" header="Temperature" />
          <Column field="time" header="Time" />
          <Column field="wind.angle" header="Angle" />
          <Column field="wind.direction" header="Direction" />
          <Column field="wind.speed" header="Speed" />
        </DataTable>
      </Card>

      <div className="flex align-items-center justify-content-center">
        <Button
          label="Deployed"
          className="p-button-raised p-button-rounded"
          style={{
            marginRight: "20px",
            width: "100px",
            height: "50px",
            background: "#F3DF03",
            borderColor: "#F3DF03",
          }}
          onClick={deployedProcess}
        />
        <Button
          label="Launched"
          className="p-button-raised p-button-rounded"
          style={{
            width: "100px",
            height: "50px",
            background: "#21BA5E",
            borderColor: "#21BA5E",
          }}
          onClick={launchedProcess}
          tooltip="First of all deployed"
        />
      </div>
      <Toast ref={toast} />
    </div>
  );
};

DetailsDialog.propTypes = {
  rocketDetails: PropTypes.object,
  weatherResponse: PropTypes.object,
};

export default DetailsDialog;
