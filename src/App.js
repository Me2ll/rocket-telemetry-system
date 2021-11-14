import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import DetailsDialog from "./components/DetailsDialog";
import { Dialog } from "primereact/dialog";
import UnavailablePage from "./components/UnavailablePage";

function App() {
  const [rocketItem, setRocketItem] = useState([]);
  const [weatherResponse, setWeatherResponse] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [rocketDetails, setRocketDetails] = useState();

  const getRocketSystem = async () => {
    const headers = new Headers({
      "x-api-key": "API_KEY_1",
      "content-type": "application/json; charset = UTF-8",
    });

    await fetch("http://localhost:5000/rockets", {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.code == "503") {
            setUnavailable(true);
          }
          setRocketItem(data);
        }
      })
      .catch((error) => {
        console.log(error);
        setUnavailable(true);
      });
  };

  const getWeather = async () => {
    const headers = new Headers({
      "x-api-key": "API_KEY_1",
      "content-type": "application/json; charset = UTF-8",
    });
    await fetch("http://localhost:5000/weather", {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.code == "503") {
            setUnavailable(true);
          }
          setWeatherResponse(data);
        }
      })
      .catch((error) => {
        console.log(error);
        setUnavailable(true);
      });
  };

  // const refresh = () => {
  //   getRocketSystem();
  //   getWeather();
  // }
  const openDetailDialog = (app) => {
    setRocketDetails(app);
    setDialog(true);
  };

  useEffect(() => {
    getRocketSystem();
    getWeather();
  }, []);

  return (
    <div style={{background:"white"}}>
      <div className="flex ">
        <Card
          style={{
            width: "70%",
            marginBottom: "2em",
            backgroundColor: "#6665",
          }}
        >
          <i className="pi pi-sun"></i> <b> Temperature :</b>
          {weatherResponse.temperature}
        </Card>
        <Card
          style={{
            width: "98%",
            marginBottom: "2em",
            backgroundColor: "#6665",
          }}
        >
          <i className="pi pi-map-marker"></i> <b> Humidity :</b>{" "}
          {weatherResponse.humidity}
        </Card>
        <Card
          style={{
            width: "98%",
            marginBottom: "2em",
            backgroundColor: "#6665",
          }}
        >
          <i className="pi pi-exclamation-triangle"></i> <b> Pressure :</b>{" "}
          {weatherResponse.pressure}
        </Card>

        <Card
          style={{
            width: "98%",
            marginBottom: "2em",
            backgroundColor: "#6665",
          }}
        >
          <i className="pi pi-clock"></i>
          <b> Time :</b> {weatherResponse.time}
        </Card>

        <div style={{ height: "1rem" }}> </div>
      </div>
      <div className="flex flex-wrap card-container blue-container">
        {rocketItem.map((app, index) => {
          return (
            <Card
              title={app.model}
              subTitle={app.payload.description}
              style={{
                width: "38rem",
                height: "15rem",
                marginBottom: "2em",
                backgroundColor: "#F8F9FA",
                color: "#000000",
                marginRight: "1rem",
              }}
            >
              {app.status}
              <Button
                className="p-button-raised p-button-rounded "
                icon="pi pi-external-link"
                style={{ backgroundColor: "#21BA5E", float: "right" }}
                onClick={() => openDetailDialog(app)}
              />
            </Card>
          );
        })}
      </div>

      <Dialog
        position="top"
        style={{ width: "90%", height: "100%" }}
        visible={dialog}
        onHide={setDialog}
        draggable={false}
      >
        <DetailsDialog
          rocketDetails={rocketDetails}
          weatherResponse={weatherResponse}
        />
      </Dialog>

      <Dialog
        position="top"
        style={{ width: "50%", height: "100%" }}
        visible={unavailable}
        onHide={setUnavailable}
        draggable={false}
      >
      <UnavailablePage/>
       
      </Dialog>
    </div>
  );
}
export default App;
