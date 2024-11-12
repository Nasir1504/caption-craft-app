import React, { useEffect, useRef } from "react";

import * as fabric from 'fabric';

//styles
import './canvas-editor.scss';

// components
import Sidebar from "../side-bar-comp/Side-Bar";


const CanvasEditor = ({ image, onBack }) => {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null); // For the fabric.Canvas instance


    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
        });

        fabricCanvasRef.current = canvas; // Store the fabric.Canvas instance

        // Create a new Image object
        const imgElement = new window.Image(); // Ensure this is the correct Image object
        imgElement.crossOrigin = "anonymous"; // Avoid CORS issues with external images
        imgElement.src = image; // URL of the selected image

        // Wait for the image to load before adding it to the canvas
        imgElement.onload = () => {
            const imgInstance = new fabric.Image(imgElement, {
                scaleX: canvas.width / imgElement.width,
                scaleY: canvas.height / imgElement.height,
                left: 0,
                top: 0,
            });
            canvas.add(imgInstance);
        };


        return () => {
            canvas.dispose();
            fabricCanvasRef.current = null; // Clear the reference

        };
    }, [image]);

    const handleDownload = () => {
        const canvas = fabricCanvasRef.current; // Get the fabric.Canvas instance
        if (!canvas) {
            console.error("Canvas instance is not initialized");
            return;
        }

        // Generate a data URL from the canvas (ensure the canvas is properly rendered)
        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1, // Optional for JPEG format
        });

        // Create a temporary anchor element for the download
        const link = document.createElement("a");
        link.download = "edited-image.png"; // Specify the desired download filename
        link.href = dataURL;

        // Trigger the download
        link.click();
    };

    return (
        <div className="canvas-editor-main-container">
            <button className="back-btn" onClick={onBack}>&#8592;</button>

            <canvas
                ref={canvasRef}
                className="canvas-frame"
            ></canvas>

            <Sidebar canvasRef={fabricCanvasRef} />

            <button className="download-btn" onClick={handleDownload}>Download</button>

        </div>
    );
};

export default CanvasEditor;
