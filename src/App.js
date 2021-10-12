import React, { useLayoutEffect, useState, useRef } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

function createElement(x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { x1, y1, x2, y2, roughElement };
}

const App = (props) => {
  const { layout, ...el } = props;
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [elementType, setElementType] = useState("line");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    // const rect = generator.rectangle(10, 10, 100, 100);
    // const line = generator.line(10, 10, 110, 110);
    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
    // roughCanvas.draw(line);
  }, [elements]);

  const handleMouseDown = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    const element = createElement(
      clientX,
      clientY,
      clientX,
      clientY,
      elementType
    );
    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updateElement = createElement(x1, y1, clientX, clientY, elementType);

    const elementsCopy = [...elements];
    elementsCopy[index] = updateElement;
    setElements(elementsCopy);
    console.log(clientX, clientY);
    // alert("onMouseMove");
  };

  const handleMouseUp = () => {
    setDrawing(false);
    // alert("onMouseUp");
  };

  return (
    <div>
      {" "}
      <div style={{ position: "fixed" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="line"
                checked={elementType === "line"}
                onChange={() => setElementType("line")}
              />
            }
            label="Line"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="rectangle"
                checked={elementType === "rectangle"}
                onChange={() => setElementType("rectangle")}
              />
            }
            label="rectangle"
          />
        </FormGroup>
      </div>
      <canvas
        ref={canvasRef}
        {...el}
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default App;
