/**
 * @jest-environment jsdom
 */

import { describe, it, expect } from "@jest/globals";
import { renderHook, cleanup } from "@testing-library/react";
import { act } from "react";
import { useTimer } from "./useTimer";

const SYSTEM_TIME = new Date("2020-01-01T01:01:01.000Z");

describe("useTimer", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(SYSTEM_TIME);
    });

    afterEach(() => {
        jest.useRealTimers();
        cleanup();
    });

    describe("Count Up timer", () => {
        it("should return timer in stopped state if not counting", () => {
            const { result } = renderHook(useTimer, {
                initialProps: {
                    type: "countup"
                }
            });

            expect(result.current).toEqual({
                timeLeft: 0,
                minutes: 0,
                seconds: 0,
                timeLeftPercents: 0,
                startTime: null,
                endTime: null,
                isCounting: false
            });
        });

        it("should return timer in running state if counting", () => {
            const { result } = renderHook(useTimer, {
                initialProps: {
                    type: "countup",
                    isCounting: true
                }
            });

            expect(result.current).toEqual({
                timeLeft: 0,
                minutes: 0,
                seconds: 0,
                timeLeftPercents: 0,
                startTime: SYSTEM_TIME.getTime(),
                endTime: null,
                isCounting: true
            });
        });

        it("should count seconds and minutes when running", async () => {
            const { result } = renderHook(useTimer, {
                initialProps: {
                    type: "countup",
                    isCounting: true
                }
            });

            await act(() => jest.advanceTimersByTimeAsync(90000));

            expect(result.current).toEqual({
                timeLeft: 0,
                minutes: 1,
                seconds: 30,
                timeLeftPercents: 0,
                startTime: SYSTEM_TIME.getTime(),
                endTime: null,
                isCounting: true
            });
        });
    });

    describe("Count Down timer", () => {
        it("should return timer in stopped state if not counting", () => {
            const { result } = renderHook(useTimer, {
                initialProps: {
                    type: "countdown",
                    timeout: 90
                }
            });

            expect(result.current).toEqual({
                timeLeft: 90,
                minutes: 1,
                seconds: 30,
                timeLeftPercents: 100,
                startTime: null,
                endTime: null,
                isCounting: false
            });
        });

        it("should return timer in running state if counting", async () => {
            const { result } = renderHook(useTimer, {
                initialProps: {
                    type: "countdown",
                    timeout: 90,
                    isCounting: true
                }
            });

            expect(result.current).toEqual({
                timeLeft: 90,
                minutes: 1,
                seconds: 30,
                timeLeftPercents: 100,
                startTime: SYSTEM_TIME.getTime(),
                endTime: null,
                isCounting: true
            });
        });

        it("should count seconds and minutes when running", async () => {
            const mockOnTimeOut = jest.fn();

            const { result } = renderHook(useTimer, {
                initialProps: {
                    type: "countdown",
                    timeout: 100,
                    isCounting: true,
                    onTimeOut: mockOnTimeOut
                }
            });

            await act(() => jest.advanceTimersByTimeAsync(50000));

            expect(mockOnTimeOut).not.toHaveBeenCalled();

            expect(result.current).toEqual({
                timeLeft: 50,
                minutes: 0,
                seconds: 50,
                timeLeftPercents: 50,
                startTime: SYSTEM_TIME.getTime(),
                endTime: null,
                isCounting: true
            });
        });

        it("should stop counting and call onTimedOut method when time is up", async () => {
            const mockOnTimeOut = jest.fn();

            const { result } = renderHook(useTimer, {
                initialProps: {
                    type: "countdown",
                    timeout: 10,
                    isCounting: true,
                    onTimeOut: mockOnTimeOut
                }
            });

            await act(() => jest.advanceTimersByTimeAsync(10000));

            expect(result.current).toEqual({
                timeLeft: 0,
                minutes: 0,
                seconds: 0,
                timeLeftPercents: 0,
                startTime: expect.any(Number),
                endTime: expect.any(Number),
                isCounting: false
            });

            expect(mockOnTimeOut).toHaveBeenCalledTimes(1);
        });
    });
});
