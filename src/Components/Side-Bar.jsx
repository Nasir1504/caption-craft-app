import React from "react";

import * as fabric from 'fabric';

//styles
import './side-bar.scss';

const Sidebar = ({ canvasRef }) => {
    const addText = () => {
        const canvas = canvasRef.current; // This now holds the fabric.Canvas instance
        if (!canvas) {
            console.error("Canvas instance is not initialized");
            return;
        }

        const text = new fabric.IText("Edit me!", {
            left: 50,
            top: 50,
            fontSize: 20,
            fill: "black",
        });

        canvas.add(text); // Add text to the canvas
    };


    const addShape = (shape) => {
        const canvas = canvasRef.current; // Correct reference to the canvas
        if (!canvas) {
            console.error("Canvas instance is not initialized");
            return;
        }

        let shapeObj;
        switch (shape) {
            case "rectangle":
                shapeObj = new fabric.Rect({
                    width: 100,
                    height: 100,
                    fill: "blue",
                    left: 50,
                    top: 50,
                });
                break;
            case "circle":
                shapeObj = new fabric.Circle({
                    radius: 50,
                    fill: "green",
                    left: 50,
                    top: 50,
                });
                break;
            default:
                console.error("Unsupported shape:", shape);
                return;
        }

        canvas.add(shapeObj); // Add the shape to the canvas
    };

    return (
        <div className="side-bar-main-container">
            <button className="add-text-btn" onClick={addText}>Add Text</button>

            <div className="add-shape-btn-main">
                <span className="btn-span">Shapes <span className="arrow">{'>'}</span></span>
                <div className="btn-container">
                    <button className="btn" onClick={() => addShape("rectangle")}>Rectangle</button>
                    <button className="btn" onClick={() => addShape("circle")}>Circle</button>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;
