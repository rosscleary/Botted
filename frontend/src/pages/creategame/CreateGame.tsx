import React, { useState } from "react";
import axios from "axios";

import {
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@mui/material";
import Pagetitle from "../../components/pagetitle/Pagetitle";
import GameButton from "../../components/gamebutton/GameButton";
import "./CreateGame.css";

const CreateGame = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
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
          <StepLabel className="stepLabel">Game Icon</StepLabel>
        </Step>
      </Stepper>
      <form className="createGameForm">
        {currentStep === 0 ? (
          <Grid
            className="pageOne"
            container
            columns={1}
            rowSpacing={2}
            justifyContent="flex-end"
          >
            <Grid item xs={1}>
              <TextField
                id="gameName"
                label="Name"
                variant="standard"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={23}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        ) : currentStep === 1 ? (
          <Grid className="pageTwo" container columns={3} spacing={2}>
            <Grid item xs={1}>
              <TextField
                label="Start State"
                multiline
                rows={26}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                multiline
                label="Controller Source Code"
                rows={26}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        ) : currentStep === 2 ? (
          <Grid className="pageThree" container columns={2} spacing={1}>
            <Grid item xs={1}>
              <TextField label="Icon URL" fullWidth />
              <h3>Game Button Preview</h3>
              <GameButton
                name="adas"
                image="https://cdn-icons-png.flaticon.com/256/3367/3367626.png"
                link=""
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                label="Sample Bot"
                multiline
                rows={26}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}

        <div className="stepButtons">
          <Button onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          {currentStep === 2 ? (
            <Button variant="contained">Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateGame;
