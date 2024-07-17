import { useCallback, useEffect, useMemo, useState } from "react";

export type UseTimerOptions = {
    timeout?: number;
    type?: "countup" | "countdown";
    isCounting?: boolean;
    onTimeOut?: () => void;
};

export const useTimer = ({ timeout = 0, type = "countup", isCounting = false, onTimeOut }: UseTimerOptions) => {
    const [{ seconds, minutes, timeLeft, timeLeftPercents }, setTimer] = useState({
        seconds: 0,
        minutes: 0,
        timeLeft: 0,
        timeLeftPercents: 0
    });

    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [localIsCounting, setIsCounting] = useState(isCounting);

    const computeTimer = useCallback(() => {
        const timeSpent = localIsCounting ? Math.round((Date.now() - (startTime || 0)) / 1000) : 0;
        if (type === "countup") {
            setTimer({
                seconds: timeSpent % 60,
                minutes: Math.floor(timeSpent / 60),
                timeLeft: 0,
                timeLeftPercents: 0
            });
        } else {
            const currentTimeLeft = Math.max(timeout - timeSpent, 0);
            setTimer({
                seconds: currentTimeLeft % 60,
                minutes: Math.floor(currentTimeLeft / 60),
                timeLeft: currentTimeLeft,
                timeLeftPercents: (currentTimeLeft / timeout) * 100
            });
        }
    }, [startTime, timeout, type, setTimer, localIsCounting]);

    useEffect(() => {
        computeTimer();
    }, [timeout, type]);

    useEffect(() => {
        setIsCounting(isCounting);
        if (!isCounting) {
            setStartTime(null);
            setEndTime(null);
        }
    }, [isCounting]);

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

        const interval = setInterval(computeTimer, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [computeTimer]);

    return useMemo(
        () => ({ timeLeft, minutes, seconds, timeLeftPercents, startTime, endTime, isCounting: localIsCounting }),
        [timeLeft, minutes, seconds, timeLeftPercents, startTime, endTime, localIsCounting]
    );
};
