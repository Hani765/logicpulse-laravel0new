import React, { useState } from "react";

export default function Sample() {
    const [seample, setSample] = useState("");

    return (
        <div>
            <input type="text" onChange={(e) => setSample(e.target.value)} />
        </div>
    );
}
