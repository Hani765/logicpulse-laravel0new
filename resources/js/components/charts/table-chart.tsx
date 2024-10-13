import { Progress } from "../ui/progress";

export default function ProgressComponent({ progress }: { progress: any }) {
    return (
        <div className="space-y-1">
            <Progress value={progress} />
            <p className="text-xs">{`Today's progress compared to yesterday: ${progress.toFixed(2)}%`}</p>
        </div>
    );
}
