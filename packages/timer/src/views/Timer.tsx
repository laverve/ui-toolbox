import React from "react";
import styled from "styled-components";

export type TimerCircleStyle = {
    defaultColor?: string;
    colorFrom?: string;
    colorTo?: string;
};

const DEFAULT_SEARCH_TIMER_CIRCLE_STYLE: TimerCircleStyle = {
    defaultColor: "rgba(17, 17, 17, 0.20)",
    colorFrom: "#67B747",
    colorTo: "#C54555"
};

export type TimerProps = {
    className?: string;
    minutes: number;
    seconds: number;
    timeLeftPercents?: number;
    viewStyle?: TimerCircleStyle;
};

const UnstyledTimer: React.FC<TimerProps> = ({
    className = "",
    minutes,
    seconds,
    timeLeftPercents = 0,
    viewStyle = DEFAULT_SEARCH_TIMER_CIRCLE_STYLE
}) => {
    const mergedCircleStyle = { ...DEFAULT_SEARCH_TIMER_CIRCLE_STYLE, ...viewStyle };

    return (
        <div className={className}>
            <svg viewBox="-50 -50 100 100" strokeWidth="10" style={{ gridColumn: 1, gridRow: 1, height: "100%" }}>
                <circle r="45" fill="none" stroke={mergedCircleStyle.defaultColor} />
                {timeLeftPercents && (
                    <circle
                        r="45"
                        pathLength="1"
                        fill="none"
                        strokeLinecap="round"
                        stroke={`color-mix(in hsl shorter hue, ${mergedCircleStyle.colorFrom} ${
                            timeLeftPercents
                        }%, ${mergedCircleStyle.colorTo})`}
                        strokeDasharray={`${timeLeftPercents / 100} 1`}
                    />
                )}
            </svg>
            <div style={{ gridColumn: 1, gridRow: 1, placeSelf: "center", padding: 20 }}>
                <span>
                    {minutes < 10 && "0"}
                    {minutes}
                </span>
                :
                <span>
                    {seconds < 10 && "0"}
                    {seconds}
                </span>
            </div>
        </div>
    );
};

export const Timer = styled(UnstyledTimer)`
    box-sizing: border-box;
    display: grid;
    justify-content: center;
    align-self: center;
    font-size: 18px;
    font-weight: 700;
    font-family:
        ubuntu mono,
        consolas,
        monaco,
        monospace;
`;
