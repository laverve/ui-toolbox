# LaVerve Timer

This package provides a component to display timer using [React](https://react.dev/) framework.

# Installation
Run the following command to install timer in your repository:

```
npm i @laverve/timer
```

# Usage

## Count up timer

```
import { Timer, useTimer } from "@laverve/timer"

// ....

const { seconds, minutes, timeLeftPercents } = useTimer( {type: "countup", isCounting: true});
<Timer seconds={seconds} minutes={minutes} />
```

## Count down timer

```
import { Timer, useTimer } from "@laverve/timer"

// ....

const { seconds, minutes, timeLeftPercents } = useTimer( {type: "countdown", isCounting: true});
<Timer seconds={seconds} minutes={minutes} timeLeftPercents={timeLeftPercents} />

```

# Timer component

## Properties

### classNames
Default value: `<empty string>`.

You can use this property to slightly modify the look and feel of a timer component. The provided class names will be applied to the root container of a component.

### viewStyle

#### viewStyle.defaultColor
Default value: `rgba(17, 17, 17, 0.20)`.

This property defines color of a timer's circle when timer counts up.

#### viewStyle.colorFrom
Default value: `#67B747`.

This property defines a starting color of a timer's circle when timer counts down.

#### viewStyle.colorTo
Default value: `#C54555`.

This property defines an ending color of a timer's circle when timer counts down.

### seconds
Required.

Type: `number`

Use this property to display seconds.

### minutes
Required.

Type: `number`

Use this property to display minutes.

### timeLeftPercents
Default value: `0`.

Type: `number`

Use this property to display how much time does user still have to complete the game. Keep it equl to `0` if timer works in times up mode.


# useTimer hook

## Options

### timeout
Default value: `0`.

Type: `number`

Use this property to define how much time shall be measured.

### viewStyle
Default value: `countup`.

Values: `countup` or `countdown`.

Use this property to define timer's behavior.

### isCounting
Default value: `false`.

Type: `boolean`

Use this property to control when to start timer.

### onTimeOut
Default value: `undefined`.

Type: `Function`

Use this property to react when time is up.


## Returns

The hook return an object that you can use to determine timer's state and pass to Timer component.

```
{
    timeLeft: <number>, // eq to 0 when time is up or timer is in countup mode
    timeLeftPercents: <number>, // in a range from 0 to 100, eq to 0 when time is up or timer is in countup mode
    minutes: <number>, // amount of minutes left or spent, depends on a type of a timer
    seconds: <number>, // amount of seconds left or spent, depends on a type of a timer
    startTime: <number | null>, // indicates a time when timer was started
    endTime: <number | null>, // indicates a time when timer was stopped
    isCounting: <boolean> // shows if the timer is running right now
    reset: () => void // resets timer to initial state
}
```

# License

@laverve/timer is licensed under the MIT license. MIT
