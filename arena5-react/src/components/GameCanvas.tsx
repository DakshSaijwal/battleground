"use client";

import { useEffect, useRef, useState } from "react";

const SCRIPTS = [
  "/scripts/mathlib-min.js",
  "/scripts/k3d-min.js",
  "/scripts/gamelib.js",
  "/scripts/arena_main.js",
  "/scripts/arena_prerender.js",
  "/scripts/arena_3d.js",
  "/scripts/arena_player.js",
  "/scripts/arena_weapons.js",
  "/scripts/arena_enemies.js",
  "/scripts/arena_effects.js",
];

// Extend the Window interface to recognize the game's globals
declare global {
  interface Window {
    onloadHandler?: () => void;
    GameHandler?: any;
    Arena?: any;
  }
}

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let scriptIndex = 0;

    const loadNextScript = () => {
      if (scriptIndex >= SCRIPTS.length) {
        setLoaded(true);
        // Initialize game
        if (window.onloadHandler) {
          window.onloadHandler();
        } else if (window.GameHandler && window.Arena && window.Arena.Main) {
          window.GameHandler.init(400, 0); // 0 padding for full screen
          window.GameHandler.start(new window.Arena.Main());
        }
        return;
      }

      const script = document.createElement("script");
      script.src = SCRIPTS[scriptIndex];
      script.async = false;
      script.onload = () => {
        scriptIndex++;
        loadNextScript();
      };
      document.body.appendChild(script);
    };

    // Prevent multiple loads in React Strict Mode
    if (!window.GameHandler) {
        loadNextScript();
    } else {
        setLoaded(true);
        if (window.GameHandler.paused) {
            window.GameHandler.paused = false;
        }
    }

    return () => {
      // Cleanup game if possible
      if (window.GameHandler) {
        window.GameHandler.paused = true;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {!loaded && (
        <div className="absolute text-white text-2xl animate-pulse z-10">
          Loading Game Assets...
        </div>
      )}
      <canvas
        id="canvas"
        ref={canvasRef}
        className="block bg-transparent cursor-crosshair w-full h-full"
      />
    </div>
  );
}
