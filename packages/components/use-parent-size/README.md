# @laverve/use-parent-size

This module offers a small but usefull [React](https://react.dev/) hook that allows users to monitor size of a parent element.

# Installation
Run the following command to install timer in your repository:

```
npm i @laverve/use-parent-size
```

# Usage

```
import { useParentSize } from "@laverve/use-parent-size"

// ....

const { width, height, ref } = useParentSize();
<div style={{width: "100%", height: "100%"}} minutes={ref} />
```

# License

@laverve/use-parent-size is licensed under the MIT license. MIT
