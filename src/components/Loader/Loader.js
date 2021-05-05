import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function Loader({ size, color }) {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress
                size={size === "small" ? 24 : 40}
                color={color ? color : "secondary"}
            />
        </div>
    );
}
