import React, { useEffect, useRef, useState } from "react";
// Assets
import logo from "../assets/a.jpg";
import bgVideo from "../assets/background.mp4";
import nanosoft from "../assets/nanosoft.jpg";

const WelcomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState("2024.09.01");
  const rafIdRef = useRef<number | null>(null);

  // 10s date animation from 2024.09.01 to 2025.09.26
  useEffect(() => {
    if (!loading) return;

    const startUtc = Date.UTC(2024, 9, 1); // 2024-09-01 UTC
    const endUtc = Date.UTC(2025, 9, 26); // 2025-09-26 UTC
    const totalMs = endUtc - startUtc;
    const durationMs = 10_000; // 10 seconds
    const startedAt = performance.now();

    const formatUtc = (msUtc: number) => {
      const d = new Date(msUtc);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      return `${y}.${m}.${day}`;
    };

    const tick = () => {
      const now = performance.now();
      const elapsed = now - startedAt;
      const clamped = Math.min(Math.max(elapsed, 0), durationMs);
      const progress = clamped / durationMs; // 0..1

      const msAtProgress = startUtc + progress * totalMs;
      setCurrentDateStr(formatUtc(msAtProgress));

      if (elapsed < durationMs) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        setShowContent(true);
        setLoading(false);
      }
    };

    // initialize display at start date
    setCurrentDateStr("2024.09.01");
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [loading]);

  // Full screen layout with background video
  const FullScreenLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 flex items-center justify-center text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Static overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        {children}
      </div>
    </div>
  );

  // Final content screen after countdown
  if (showContent) {
    return (
      <FullScreenLayout>
        <div className="flex flex-col items-center justify-center text-center h-full">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white/80">
            Govisarana Digital Platform
          </h1>
          <p className="text-white/70 mb-6 text-xl md:text-2xl lg:text-3xl max-w-4xl px-4">
            This is a digital platform providing seamless access to services and
            information for users via web and mobile applications.
          </p>
          <div className="flex items-center justify-center mt-6">
            <img src={nanosoft} alt="Nanosoft Logo" className="w-10 h-10 mr-3" />
            <p className="text-white/90 text-2xl md:text-3xl">
              Powered by Nanosoft Solution (Pvt) Ltd
            </p>
          </div>
        </div>
      </FullScreenLayout>
    );
  }

  // Loading / countdown screen
  if (loading) {
    return (
      <FullScreenLayout>
        <div className="flex flex-col items-center justify-center text-center h-full w-full">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mb-6"
          />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-white/80 px-4">
            Publishing...
          </h1>
          <p className="mt-4 text-5xl md:text-7xl lg:text-8xl font-extrabold text-white/90 tracking-widest">
            {currentDateStr}
          </p>
        </div>
      </FullScreenLayout>
    );
  }

  // Initial landing screen
  return (
    <FullScreenLayout>
      <div className="flex flex-col items-center justify-center text-center h-full">
        <img
          src={logo}
          alt="Logo"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg mb-6"
        />
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white/80 px-4">
          Govisarana Digital Platform
        </h1>
        <p className="text-white/70 mb-6 text-lg md:text-xl lg:text-2xl max-w-5xl px-4">
          Govisarana is a comprehensive digital website and mobile app developed by
          Nanosoft Solution (Pvt) Ltd.
        </p>
        <button
          onClick={() => {
            setLoading(true);
            setShowContent(false);
            setCurrentDateStr("2024.09.01");
          }}
          className="font-bold px-8 py-3 md:px-10 md:py-4 rounded-full bg-red-900/50 text-white/80 border border-red-500 hover:bg-red-800/50 transition text-lg md:text-xl"
        >
          PUBLISH
        </button>
        <div className="flex items-center justify-center mt-6">
          <img
            src={nanosoft}
            alt="Nanosoft Logo"
            className="w-6 h-6 md:w-8 md:h-8 mr-3"
          />
          <p className="text-white/90 text-lg md:text-2xl">
            Powered by Nanosoft Solution (Pvt) Ltd
          </p>
        </div>
      </div>
    </FullScreenLayout>
  );
};

export default WelcomePage;