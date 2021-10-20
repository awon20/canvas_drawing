import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from "../theme/Styles";
import {
  Line,
  // Resize,
  Triangle,
  Rectangle,
  Circle,
  Brush,
  Pencil,
  Plus,
  Minus,
  Eraser,
  Reset,
  Download,
} from "../theme/Svg";
import ColourPicker from "./ColourPicker";
import { download } from "./Download";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Swatch({
  toolType,
  setToolType,
  width,
  setWidth,
  setElements,
  setColorWidth,
  setPath,
  colorWidth,
  setShapeWidth,
}) {
  const [displayStroke, setDisplayStroke] = useState(false);
  const classes = useStyles();
  const [view, setView] = React.useState('list');
  const [alignment, setAlignment] = React.useState('bottom');


  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleClickStroke = () => {
    setDisplayStroke(!displayStroke);
    setColorWidth(colorWidth);
  };

  const increaseWidth = () => {
    if (toolType === "brush" || toolType === "eraser") {
      if (width < 30) setWidth((prev) => prev + 5);
    }
    if (toolType === "pencil") {
      if (width < 15) setWidth((prev) => prev + 3);
    }
    if (toolType === ("triangle" || "rectangle" || "circle")) {
      if (width < 15) setShapeWidth((prev) => prev + 3);
    }
  };
  const decreaseWidth = () => {
    if (toolType === "brush" || toolType === "eraser") {
      if (width > 1) setWidth((prev) => prev - 5);
    }
    if (toolType === "pencil") {
      if (width > 1) setWidth((prev) => prev - 3);
    }
    if (toolType === ("triangle" || "rectangle" || "circle")) {
      if (width > 1) setShapeWidth((prev) => prev - 3);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
      <div className={classes.root}>
        <ToggleButtonGroup
          orientation="vertical"
          value={alignment}
          exclusive
          onChange={e => { handleAlignment(e); handleChange(e) }}
        >   
      {/* <div className="row"> */}
        {/* <div
          className="col-md-1 icon-bar"
          style={{
            position: "absolute",
            backgroundColor: "#f0f0f0",
            height: `${window.innerHeight * 0.09 * 8}px`,
            width: `${window.innerWidth * 0.073 * 1.8}px`,
            left: "2px",
            top: `${
              (window.innerHeight - window.innerHeight * 0.09 * 8) / 2
            }px`,
            borderRadius: "10px",
          }}
        > */}
          {/* <button
            id="selection"
            data-toggle="tooltip"
            data-placement="top"
            title="Selection"
            style={styles.righticons}
            onClick={() => {
              setToolType("selection");
              setShapeWidth(1);
            }}
          >
          <Resize toolType={toolType} colorWidth={colorWidth} />
          </button> */}
          <Paper square elevation={3}>
          {/* <ToggleButton value="list" aria-label="line"
            id="line"
            data-toggle="tooltip"
            data-placement="top"
            title="Line"
            style={styles.righticons}
            onClick={() => {
              setToolType("line");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Line toolType={toolType} colorWidth={colorWidth} />
          </ToggleButton>

          <ToggleButton value="list" aria-label="rectangle"
            id="rectangle"
            data-toggle="tooltip"
            data-placement="top"
            title="Rectangle"
            style={styles.righticons}
            onClick={() => {
              setToolType("rectangle");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Rectangle toolType={toolType} colorWidth={colorWidth} />
          </ToggleButton>

          <ToggleButton value="list" aria-label="circle"
            id="circle"
            data-toggle="tooltip"
            data-placement="top"
            title="Circle"
            style={styles.righticons}
            onClick={() => {
              setToolType("circle");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Circle toolType={toolType} colorWidth={colorWidth} />
          </ToggleButton>

          <ToggleButton  value="list" aria-label="triangle"
            id="triangle"
            data-toggle="tooltip"
            data-placement="top"
            title="Triangle"
            style={styles.righticons}
            onClick={() => {
              setToolType("triangle");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Triangle toolType={toolType} colorWidth={colorWidth} />
          </ToggleButton> */}

          <ToggleButton  value="list" aria-label="pencil"
            id="pencil"
            data-toggle="tooltip"
            data-placement="top"
            title="Pencil"
            style={styles.righticons}
            onClick={() => {
              setToolType("pencil");
              setWidth(1);
              setShapeWidth(1);
            }}
          >
            <Pencil toolType={toolType} colorWidth={colorWidth} />
          </ToggleButton>

          <ToggleButton value="list" aria-label="brush"
            id="brush"
            data-toggle="tooltip"
            data-placement="top"
            title="Brush"
            style={styles.righticons}
            onClick={() => {
              setToolType("brush");
              setWidth(10);
              setShapeWidth(1);
            }}
          >
            <Brush toolType={toolType} colorWidth={colorWidth} />
          </ToggleButton>

          <ToggleButton value="list" aria-label="Eraser"
            id="eraser"
            data-toggle="tooltip"
            data-placement="top"
            title="Eraser"
            style={styles.righticons}
            onClick={() => {
              setToolType("eraser");
              setWidth(10);
              setShapeWidth(1);
            }}
          >
            <Eraser toolType={toolType} colorWidth={colorWidth} />
          </ToggleButton>
          <ToggleButton
              style={styles.topicons}
              data-toggle="tooltip"
              data-placement="top"
              title="Clear"
              onClick={() => {
                setElements([]);
                setPath([]);
                return;
              }}
            >
              <Reset />
            </ToggleButton>
            {/* <ToggleButton
              style={styles.topicons}
              data-toggle="tooltip"
              data-placement="top"
              title="Download"
            >
              <ToggleButton onClick={download}>
                <Download />
              </ToggleButton>
            </ToggleButton> */}
              <ToggleButton
                style={styles.picker}
                onClick={handleClickStroke}
              ></ToggleButton>
            <ToggleButton
              style={styles.topicons}
              onClick={increaseWidth}
              data-toggle="tooltip"
              data-placement="top"
              title="Increase Width"
            >
              <Plus />
            </ToggleButton>
            <ToggleButton
              style={styles.topicons}
              onClick={decreaseWidth}
              data-toggle="tooltip"
              data-placement="top"
              title="Decrease Width"
            >
              <Minus />
            </ToggleButton>
          <div
            className="row"
            style={{ position: "absolute", right: "0px", top: "0px" }}
          >
            {displayStroke && (
              <div className="col-md-3">
                <ColourPicker setColorWidth={setColorWidth} />
              </div>
            )}
          </div>
          </Paper>
          </ToggleButtonGroup>
        </div>
        {/* hier fängt die HorizontalButtonbalken */}
        </Grid>
        </Grid>
  );
}
