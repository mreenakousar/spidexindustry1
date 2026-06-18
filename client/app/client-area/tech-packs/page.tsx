
"use client";

import { useEffect, useRef, useState } from "react";
import { techPacks } from "../../../data/clientPortal";

import {
  FaPen,
  FaSquare,
  FaCircle,
  FaTrash,
  FaImage,
  FaMousePointer,
  FaSave,
  FaFont,
} from "react-icons/fa";

export default function TechPacksPage() {
  const fabricCanvas = useRef<any>(null);

  const [selectedPack, setSelectedPack] = useState<any>(null);

  const [fillColor, setFillColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#111827");
  const [opacity, setOpacity] = useState(1);

  // INIT CANVAS
  useEffect(() => {
    let canvasInstance: any;

    const init = async () => {
      const fabricModule = await import("fabric");
      const fabricLib = fabricModule.fabric || fabricModule.default;

      canvasInstance = new fabricLib.Canvas("techCanvas", {
        width: 520,
        height: 520,
        backgroundColor: "#f8fafc",
        selection: true,
      });

      fabricCanvas.current = canvasInstance;
    };

    init();

    return () => {
      if (canvasInstance) canvasInstance.dispose();
    };
  }, []);

  const getFabric = async () => {
    const mod = await import("fabric");
    return mod.fabric || mod.default;
  };

  // TEXT
  const addText = async () => {
    const fabric = await getFabric();

    const text = new fabric.IText("Type here", {
      left: 60,
      top: 60,
      fill: strokeColor,
      fontSize: 18,
    });

    fabricCanvas.current.add(text);
  };

  // RECT
  const addRect = async () => {
    const fabric = await getFabric();

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 140,
      height: 100,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2,
      opacity,
    });

    fabricCanvas.current.add(rect);
  };

  // CIRCLE
  const addCircle = async () => {
    const fabric = await getFabric();

    const circle = new fabric.Circle({
      left: 130,
      top: 130,
      radius: 50,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2,
      opacity,
    });

    fabricCanvas.current.add(circle);
  };

  // IMAGE
  const uploadImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (f: any) => {
      const fabric = await getFabric();

      fabric.Image.fromURL(f.target.result, (img: any) => {
        img.scaleToWidth(180);
        fabricCanvas.current.add(img);
      });
    };

    reader.readAsDataURL(file);
  };

  // DELETE
  const deleteSelected = () => {
    const active = fabricCanvas.current.getActiveObject();
    if (active) fabricCanvas.current.remove(active);
  };

  // DRAW MODE
  const enableDraw = () => {
    fabricCanvas.current.isDrawingMode = true;
    fabricCanvas.current.freeDrawingBrush.width = 2;
    fabricCanvas.current.freeDrawingBrush.color = strokeColor;
  };

  const disableDraw = () => {
    fabricCanvas.current.isDrawingMode = false;
  };

  // CLEAR
  const clearCanvas = () => {
    fabricCanvas.current.clear();
  };

  // SAVE PNG
  const saveAsImage = () => {
    const url = fabricCanvas.current.toDataURL({
      format: "png",
      quality: 1,
    });

    const a = document.createElement("a");
    a.href = url;
    a.download = "tech-pack.png";
    a.click();
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="rounded-3xl bg-white p-5 shadow-sm md:p-8">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Tech Pack Studio
        </h1>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-3">


        {/* FABRIC CANVAS + TOOLS  */}
        <div className="space-y-4 rounded-3xl bg-white p-4 shadow-sm md:p-6 lg:col-span-2">

          <h3 className="font-semibold">Design Studio</h3>

          {/* COLORS */}
          <div className="grid gap-3 sm:grid-cols-3">

            <input
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              className="w-full h-10"
            />

            <input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-full h-10"
            />

            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
            />
          </div>

          {/* TOOLS */}
          <div className="flex flex-wrap gap-2">

            <button onClick={addText} className="border p-2 rounded-xl">
              <FaFont />
            </button>

            <button onClick={addRect} className="border p-2 rounded-xl">
              <FaSquare />
            </button>

            <button onClick={addCircle} className="border p-2 rounded-xl">
              <FaCircle />
            </button>

            <label className="border p-2 rounded-xl cursor-pointer">
              <FaImage />
              <input type="file" hidden onChange={uploadImage} />
            </label>

            <button onClick={enableDraw} className="border p-2 rounded-xl">
              <FaPen />
            </button>

            <button onClick={disableDraw} className="border p-2 rounded-xl">
              <FaMousePointer />
            </button>

            <button onClick={deleteSelected} className="border p-2 rounded-xl">
              <FaTrash />
            </button>

            <button
              onClick={saveAsImage}
              className="border px-3 py-2 rounded-xl flex items-center gap-2"
            >
              <FaSave />
              Save
            </button>

          </div>

          {/* CANVAS */}
          <canvas
            id="techCanvas"
            className="border rounded-2xl w-full"
          />
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {selectedPack && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl w-full max-w-md">
            <h2 className="font-semibold text-lg">
              {selectedPack.title}
            </h2>

            <button
              onClick={() => setSelectedPack(null)}
              className="mt-5 w-full bg-black text-white py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}