import React from "react";

export default function Status({ status }: { status: string }) {
    return (
        <div>
            {status === "active" || status == "approved" ? (
                <div className="bg-green-500 text-white rounded shadow py-0.5">
                    Active
                </div>
            ) : status === "inactive" || status == "rejected" ? (
                <div className="bg-red-500 text-white rounded shadow py-0.5">
                    Inactive
                </div>
            ) : status === "pending" ? (
                <div className="bg-blue-500 text-white rounded shadow py-0.5">
                    Pending
                </div>
            ) : (
                <div className="bg-yellow-500 text-white rounded shadow py-0.5">
                    {status}
                </div>
            )}
        </div>
    );
}
