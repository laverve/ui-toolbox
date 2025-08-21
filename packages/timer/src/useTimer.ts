import { useCallback, useEffect, useMemo, useState } from "react";

type TimerType = "countup" | "countdown";

export type UseTimerOptions = {
    timeout?: number;
    type?: TimerType;
    isCounting?: boolean;
    onTimeOut?: () => void;
};

type CalculateTimerStateOptions = {
    type: TimerType;
    startTime: number | null;
    pauseTime: number;
    timeout: number;
};

const calculateTimerState = ({ type, startTime, pauseTime, timeout }: CalculateTimerStateOptions) => {
    const timeSpent = Math.round((Date.now() - (startTime || Date.now()) - pauseTime) / 1000);

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
    const [startTime, setStartTime] = useState<number | null>(isCounting ? Date.now() : null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [pauseTime, setPauseTime] = useState<number>(0);
    const [lastPausedAt, setLastPausedAt] = useState<number | null>(0);
    const [localIsCounting, setIsCounting] = useState(isCounting);

    const [{ seconds, minutes, timeLeft, timeLeftPercents }, setTimer] = useState(
        calculateTimerState({ type, startTime, timeout: localTimeout, pauseTime })
    );

    useEffect(() => {
        setIsCounting(isCounting);
        if (startTime) {
            if (!isCounting) {
                setLastPausedAt(+new Date());
            } else {
                if (lastPausedAt !== null) {
                    setPauseTime(+new Date() - lastPausedAt + pauseTime);
                }

                setLastPausedAt(null);
            }
        }
    }, [isCounting, lastPausedAt, pauseTime, startTime]);

    useEffect(() => {
        setTimer(calculateTimerState({ type, startTime, timeout: localTimeout, pauseTime }));
    }, [localTimeout, setTimer, pauseTime, startTime, type]);

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
    }, [timeLeft, type, onTimeOut, localIsCounting]);

    useEffect(() => {
        if (!localIsCounting) {
            return () => {};
        }

        const computeTimer = () => {
            setTimer(calculateTimerState({ type, startTime, timeout, pauseTime }));
        };

        const interval = setInterval(computeTimer, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [startTime, timeout, type, pauseTime, setTimer, localIsCounting]);

    const reset = useCallback(() => {
        setStartTime(null);
        setEndTime(null);
        setPauseTime(0);
        setLastPausedAt(null);
        setTimer(calculateTimerState({ type, startTime: null, timeout: localTimeout, pauseTime }));
    }, [setStartTime, setEndTime, type, localTimeout, pauseTime]);

    useEffect(() => {
        reset();
        setLocalTimeout(timeout);
    }, [timeout, type, reset]);

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
