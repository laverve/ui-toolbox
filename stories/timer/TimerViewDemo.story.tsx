import React from "react";

import { Timer, TimerProps } from "@laverve/timer";

export default {
    title: "Components/Timer/Views",
    parameters: {
        layout: "centered"
    },
    argTypes: {
        className: {
            name: "Class Name",
            control: "text",
            description: "Allows to specify custom class name for a wrapper."
        },
        viewStyle: {
            name: "Circle Style",
            type: "object",
            description: "Allows to specify circle style."
        },
        seconds: {
            name: "Seconds",
            description: "Allows to specify amount of seconds.",
            type: "number"
        },
        minutes: {
            name: "Minutes",
            description: "Allows to specify amount of minutes.",
            type: "number"
        },
        timeLeftPercents: {
            name: "Time left (%)",
            description: "Allows to specify amount of minutes.",
            type: "number",
            min: 0,
            max: 100
        }
    },
    args: {
        timeLeftPercents: 80,
        viewStyle: {
            defaultColor: "rgba(17, 17, 17, 0.20)",
            colorFrom: "#67B747",
            colorTo: "#C54555"
        },
        minutes: 0,
        seconds: 20
    }
};

export const TimerViewDemoStory = ({
    className,
    viewStyle,
    seconds,
    minutes,
    timeLeftPercents
}: TimerProps): JSX.Element => {
    return (
        <Timer
            className={className}
            viewStyle={viewStyle}
            seconds={seconds}
            minutes={minutes}
            timeLeftPercents={timeLeftPercents}
        />
    );
};

TimerViewDemoStory.storyName = "Default";
