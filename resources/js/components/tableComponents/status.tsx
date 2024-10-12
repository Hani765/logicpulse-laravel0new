import React from "react";

export default function Status({ status }: { status: string }) {
    return (
        <div>
            {status === "active" ? (
                <div className="text-green-500">Active</div>
            ) : (
                <div className="text-red-500">Inactive</div>
            )}
        </div>
    );
}
