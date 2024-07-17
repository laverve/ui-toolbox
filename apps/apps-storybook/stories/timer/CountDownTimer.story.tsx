import React, { useCallback, useEffect, useState } from "react";

import { Timer, useTimer, UseTimerOptions } from "@laverve/timer";

export default {
    title: "Components/Timer",
    parameters: {
        layout: "centered"
    },
    argTypes: {
        timeout: {
            name: "Times up after",
            type: "number",
            description: "Allows to specify amount of time the timer shall count down."
        }
    },
    args: {
        timeout: 10
    }
};

export const CountDownTimeStory = ({ timeout }: UseTimerOptions): JSX.Element => {
    const [isCounting, setIsCounting] = useState(false);
    const [isTimedOut, setIsTimedOut] = useState(false);

    const [localTimeout, setLocalTimeout] = useState(timeout);

    useEffect(() => setLocalTimeout(timeout), [timeout]);

    useEffect(() => {
        setIsCounting(false);
        setIsTimedOut(false);
    }, [timeout]);

    const onClick = useCallback(() => {
        setLocalTimeout(timeout);
        setIsCounting(!isCounting);

        if (!isCounting) {
            setIsTimedOut(false);
        }
    }, [isCounting]);

    const onTimeOut = useCallback(() => {
        setIsTimedOut(true);
        setIsCounting(false);
    }, [isCounting]);

    const { seconds, minutes, timeLeftPercents } = useTimer({
        type: "countdown",
        timeout: localTimeout,
        isCounting,
        onTimeOut
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {isTimedOut && <div>Time is Up!</div>}
            <Timer seconds={seconds} minutes={minutes} timeLeftPercents={timeLeftPercents} />
            <button type="button" onClick={onClick}>
                {isCounting ? "Stop" : "Start"}
            </button>
        </div>
    );
};

CountDownTimeStory.storyName = "Count Down Timer";
