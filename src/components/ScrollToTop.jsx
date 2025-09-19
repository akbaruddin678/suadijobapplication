// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollTopAll() {
  const candidates = [
    document.scrollingElement,
    document.documentElement,
    document.body,
    document.getElementById("root"),
    document.querySelector(".App"),
    document.querySelector("[data-scroll-container]"),
    document.querySelector(".page-scroll"), // optional class you can add to your main wrappers
  ];

  candidates.forEach((el) => {
    if (!el) return;
    if (typeof el.scrollTo === "function") el.scrollTo(0, 0);
    else el.scrollTop = 0;
  });
}

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  // Take control of scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
      return () => (window.history.scrollRestoration = "auto");
    }
  }, []);

  useEffect(() => {
    if (hash) return; // let anchor links behave normally
    // run now, next frame, and microtask to beat layout/Outlet transitions
    scrollTopAll();
    requestAnimationFrame(scrollTopAll);
    setTimeout(scrollTopAll, 0);
  }, [pathname, key, hash]);

  return null;
}
