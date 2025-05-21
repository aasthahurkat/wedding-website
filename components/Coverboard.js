// components/CoverBoard.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tileData from "../data/tileData";

const CELL = 48;
const BOARD = CELL * 12;

// timings
const CREAM_DURATION = 0.5;
const BURG_POP_DURATION = 0.2;
const BURG_FADE_DURATION = 0.4;
const BURG_TOTAL = BURG_POP_DURATION + BURG_FADE_DURATION;

export default function CoverBoard({ onAnimationComplete }) {
  const [play, setPlay] = useState(false);
  const [scale, setScale] = useState(1);

  // Recompute scale whenever the window resizes
  useEffect(() => {
    function updateScale() {
      const vw = window.innerWidth * 0.9;   // leave 5% margin each side
      const vh = window.innerHeight * 0.9;  // leave 5% margin top/bottom
      const s = Math.min(vw / BOARD, vh / BOARD, 1);
      setScale(s);
    }

    window.addEventListener("resize", updateScale);
    updateScale(); // initial
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      {/* full-screen blurred backdrop */}
      <div
        className="fixed inset-0 bg-center bg-cover blur-lg -z-30"
        style={{ backgroundImage: "url('/images/hero-photo.jpg')" }}
      />

      {/* centered + scaled grid */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: BOARD,
            height: BOARD,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {tileData.map((t, i) => {
            const isBurg = t.highlight;
            return (
              <motion.div
                key={i}
                className={`scrabble-tile ${isBurg ? "name-tile" : ""} absolute`}
                style={{
                  top: (t.row - 1) * CELL,
                  left: (t.col - 1) * CELL,
                  width: CELL,
                  height: CELL,
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={
                  play
                    ? isBurg
                      ? { scale: [1, 1.2, 1], opacity: [1, 1, 0] }
                      : { opacity: 0 }
                    : {}
                }
                transition={
                  play
                    ? isBurg
                      ? {
                          delay: CREAM_DURATION,
                          duration: BURG_TOTAL,
                          times: [0, BURG_POP_DURATION / BURG_TOTAL, 1],
                          ease: "easeOut",
                        }
                      : { duration: CREAM_DURATION, ease: "easeOut" }
                    : {}
                }
                onAnimationComplete={
                  play && i === tileData.length - 1 ? onAnimationComplete : undefined
                }
              >
                {t.letter}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ▶ enter button (above everything) */}
      {!play && (
        <button
          aria-label="Enter site"
          className="enter-btn fixed bottom-8 sm:bottom-20 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl z-20"
          onClick={() => setPlay(true)}
        >
          ▶
        </button>
      )}
    </>
  );
}