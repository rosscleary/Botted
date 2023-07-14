import React, { useState } from "react";
import useToken from "../../useToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import Pagetitle from "../../components/pagetitle/Pagetitle";
import "./CreateGame.css";

const CreateGame = () => {
  const { getToken } = useToken();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startState: "",
    controllerCode: "",
    iconURL: "",
    sampleBot: "",
  });
  const navigation = useNavigate();

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: event.target.value });
  };
  const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, description: event.target.value });
  };
  const changeStartState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, startState: event.target.value });
  };
  const changeControllerCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, controllerCode: event.target.value });
  };
  const changeIconURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, iconURL: event.target.value });
  };
  const changeSampleBot = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, sampleBot: event.target.value });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleSubmit = async () => {
    await axios
      .post("http://localhost:3001/api/game/createGame", {
        name: formData.name,
        controller: formData.controllerCode,
        startState: formData.startState,
        description: formData.description,
        icon: formData.iconURL,
      })
      .then(function (response) {
        navigation("/")
      })
      .catch(function () {
        return "Failed to create game";
      });
  };

  return (
    <div>
      {!getToken() ? (
        <h3>
          <a href="\login">Login</a> to create a game
        </h3>
      ) : (
        <div>
          <Pagetitle title={"Create a Game"} desc={""} />
          <Stepper activeStep={currentStep}>
            <Step>
              <StepLabel className="stepLabel">General Infromation</StepLabel>
            </Step>
            <Step>
              <StepLabel className="stepLabel">Game Source Code</StepLabel>
            </Step>
            <Step>
              <StepLabel className="stepLabel">Sample Bot</StepLabel>
            </Step>
          </Stepper>
          <form className="createGameForm">
            {currentStep === 0 ? (
              <Grid
                className="pageOne"
                container
                columns={2}
                spacing={2}
                rowSpacing={1}
                justifyContent="flex-end"
              >
                <Grid item xs={1}>
                  <TextField
                    id="gameName"
                    label="Game Name"
                    fullWidth
                    defaultValue={formData.name}
                    onChange={changeName}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    label="Icon URL"
                    fullWidth
                    defaultValue={formData.iconURL}
                    onChange={changeIconURL}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="description"
                    label="Description"
                    multiline
                    rows={22}
                    size="small"
                    fullWidth
                    defaultValue={formData.description}
                    onChange={changeDescription}
                  />
                </Grid>
              </Grid>
            ) : currentStep === 1 ? (
              <Grid className="pageTwo" container columns={3} spacing={2}>
                <Grid item xs={1}>
                  <TextField
                    label="Start State"
                    multiline
                    rows={25}
                    size="small"
                    fullWidth
                    defaultValue={formData.startState}
                    onChange={changeStartState}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    multiline
                    label="Controller Source Code"
                    rows={25}
                    size="small"
                    fullWidth
                    defaultValue={formData.controllerCode}
                    onChange={changeControllerCode}
                  />
                </Grid>
              </Grid>
            ) : currentStep === 2 ? (
              <TextField
                label="Sample Bot"
                multiline
                rows={25}
                size="small"
                fullWidth
                defaultValue={formData.sampleBot}
                onChange={changeSampleBot}
              />
            ) : (
              <></>
            )}

            <div className="stepButtons">
              <Button onClick={handleBack} disabled={currentStep === 0}>
                Back
              </Button>
              {currentStep === 2 ? (
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateGame;
