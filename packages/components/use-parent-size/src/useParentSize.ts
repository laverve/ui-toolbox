import { useCallback, useEffect, useRef, useState } from "react";

export const useParentSize = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const measure = useCallback(() => {
        if (!ref.current) {
            return;
        }

        const { width: w, height: h } = ref.current.getBoundingClientRect();
        if (w !== width) {
            setWidth(w);
        }
        if (h !== height) {
            setHeight(h);
        }
    }, [ref.current?.getBoundingClientRect(), width, height]);

    useEffect(() => {
        measure();
    }, [ref.current, height, width]);

    useEffect(() => {
        const onResize = () => {
            measure();
        };

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [ref.current, measure, width, height]);

    return { ref, width, height };
};
