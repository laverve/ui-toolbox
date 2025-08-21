import { useCallback, useEffect, useRef, useState } from "react";

export const useParentSize = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const boundingClientRect = ref.current?.getBoundingClientRect();

    const measure = useCallback(() => {
        if (!boundingClientRect) {
            return;
        }

        const { width: w, height: h } = boundingClientRect;

        if (w !== width) {
            setWidth(w);
        }
        if (h !== height) {
            setHeight(h);
        }
    }, [boundingClientRect, width, height]);

    useEffect(() => {
        measure();
    }, [height, width, measure]);

    useEffect(() => {
        const onResize = () => {
            measure();
        };

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [measure, width, height]);

    return { ref, width, height };
};
