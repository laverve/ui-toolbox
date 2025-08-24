import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useParentSize = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const measure = useCallback(() => {
        const boundingClientRect = ref.current?.getBoundingClientRect();
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
    }, [ref, width, height]);

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

    return useMemo(() => ({ ref, width, height }), [ref, width, height]);
};
