import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map();

function ScrollManager() {
    const location = useLocation();
    const navigationType = useNavigationType();

    useLayoutEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const restorePosition = () => {
            if (navigationType === "POP") {
                window.scrollTo({ top: scrollPositions.get(location.key) || 0, left: 0, behavior: "auto" });
                return;
            }

            if (location.hash) {
                document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: "start" });
                return;
            }

            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        };

        const firstFrame = window.requestAnimationFrame(() => {
            window.requestAnimationFrame(restorePosition);
        });

        return () => {
            window.cancelAnimationFrame(firstFrame);
            scrollPositions.set(location.key, window.scrollY);
        };
    }, [location.hash, location.key, navigationType]);

    return null;
}

export default ScrollManager;
