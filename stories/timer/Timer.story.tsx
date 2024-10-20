import React from "react";

import { Timer } from "@laverve/timer";

import "./Timer.story.css";

export default {
    title: "Components/Timer",
    parameters: {
        layout: "padded"
    }
};

export const TimerStory = (): JSX.Element => {
    return (
        <div className="" style={{ width: "100%" }}>
            <section>
                <h2>Installation</h2>
                <p>
                    Run the following command to install timer in your repository: <br />
                    <code className="code-block">npm i @laverve/timer</code>
                </p>
            </section>
            <section>
                <h2>Usage</h2>
                <section>
                    <h3>Count up timer</h3>
                    <div className="cols">
                        <Timer seconds={10} minutes={0} />
                        <p>
                            <code className="code-block">
                                import &#123; Timer, useTimer &#125; from &quot;@laverve/timer&quot; <br />
                                .... <br />
                                const &#123; seconds, minutes, timeLeftPercents &#125; = useTimer( &#123;type:
                                &quot;countup&quot;, isCounting: true&#125;);
                                <br /> &lt;Timer seconds=&#123;seconds&#125; minutes=&#123;minutes&#125; /&gt;
                            </code>
                        </p>
                    </div>
                </section>
                <section>
                    <h3>Count down timer</h3>
                    <div className="cols">
                        <Timer seconds={10} minutes={0} timeLeftPercents={90} />
                        <p>
                            <code className="code-block">
                                import &#123; Timer, useTimer &#125; from &quot;@laverve/timer&quot; <br />
                                .... <br />
                                const &#123; seconds, minutes, timeLeftPercents &#125; = useTimer( &#123;type:
                                &quot;countdown&quot;, isCounting: true&#125;);
                                <br /> &lt;Timer seconds=&#123;seconds&#125; minutes=&#123;minutes&#125;
                                timeLeftPercents=&#123;timeLeftPercents&#125; /&gt;
                            </code>
                        </p>
                    </div>
                </section>
            </section>
        </div>
    );
};

TimerStory.storyName = "Installation and Usage";
