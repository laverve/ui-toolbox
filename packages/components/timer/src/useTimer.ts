import { useCallback, useEffect, useMemo, useState } from "react";

type TimerType = "countup" | "countdown";

export type UseTimerOptions = {
    timeout?: number;
    type?: TimerType;
    isCounting?: boolean;
    onTimeOut?: () => void;
};

const calculateTimerState = (type: TimerType, startTime: number | null, timeout: number) => {
    const timeSpent = Math.round((Date.now() - (startTime || Date.now())) / 1000);
    if (type === "countup") {
        return {
            seconds: timeSpent % 60,
            minutes: Math.floor(timeSpent / 60),
            timeLeft: 0,
            timeLeftPercents: 0
        };
    }

    const currentTimeLeft = Math.max(timeout - timeSpent, 0);

    return {
        seconds: currentTimeLeft % 60,
        minutes: Math.floor(currentTimeLeft / 60),
        timeLeft: currentTimeLeft,
        timeLeftPercents: (currentTimeLeft / timeout) * 100
    };
};

export const useTimer = ({ timeout = 0, type = "countup", isCounting = false, onTimeOut }: UseTimerOptions) => {
    const [localTimeout, setLocalTimeout] = useState(timeout);
    const [{ seconds, minutes, timeLeft, timeLeftPercents }, setTimer] = useState(
        calculateTimerState(type, null, localTimeout)
    );

    const [startTime, setStartTime] = useState<number | null>(isCounting ? Date.now() : null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [localIsCounting, setIsCounting] = useState(isCounting);

    useEffect(() => {
        setIsCounting(isCounting);
    }, [isCounting]);

    useEffect(() => {
        setStartTime(null);
        setEndTime(null);
        setLocalTimeout(timeout);
    }, [timeout, type, setStartTime, setEndTime, setLocalTimeout]);

    useEffect(() => {
        setTimer(calculateTimerState(type, startTime, localTimeout));
    }, [localTimeout, setTimer]);

    useEffect(() => {
        if (localIsCounting && !startTime) {
            setStartTime(Date.now());
        }
    }, [localIsCounting, startTime]);

    useEffect(() => {
        if (localIsCounting && timeLeft <= 0 && type === "countdown") {
            setIsCounting(false);
            setEndTime(Date.now());
            onTimeOut?.();
        }
    }, [timeLeft, type, onTimeOut]);

    useEffect(() => {
        if (!localIsCounting) {
            return () => {};
        }

        const computeTimer = () => {
            setTimer(calculateTimerState(type, startTime, timeout));
        };

        const interval = setInterval(computeTimer, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [startTime, timeout, type, setTimer, localIsCounting]);

    const reset = useCallback(() => {
        setStartTime(null);
        setEndTime(null);
        setTimer(calculateTimerState(type, null, localTimeout));
    }, [setStartTime, setEndTime, type, localTimeout]);

    return useMemo(
        () => ({
            timeLeft,
            minutes,
            seconds,
            timeLeftPercents,
            startTime,
            endTime,
            isCounting: localIsCounting,
            reset
        }),
        [timeLeft, minutes, seconds, timeLeftPercents, startTime, endTime, localIsCounting, reset]
    );
};
