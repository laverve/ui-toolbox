import React, { useCallback, useState } from "react";

import { Timer, useTimer } from "@laverve/timer";

export default {
    title: "Components/Timer",
    parameters: {
        layout: "centered"
    }
};

export const CountUpTimeStory = (): JSX.Element => {
    const [isCounting, setIsCounting] = useState(false);

    const onClick = useCallback(() => {
        setIsCounting(!isCounting);
    }, [isCounting]);

    const { seconds, minutes, timeLeftPercents } = useTimer({
        type: "countup",
        isCounting
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Timer seconds={seconds} minutes={minutes} timeLeftPercents={timeLeftPercents} />
            <button type="button" onClick={onClick}>
                {isCounting ? "Stop" : "Start"}
            </button>
        </div>
    );
};

CountUpTimeStory.storyName = "Count Up Timer";
