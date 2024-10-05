import { Label } from "@/components/ui/label";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/SubmitBtn";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
export function Form({ heroData }: { heroData: any }) {
    const {
        post,
        processing,
        data: formData,
        setData,
        errors,
    } = useForm({
        heading: heroData.heading,
        description: heroData.description,
        link: heroData.link,
    });
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        post("/landing/hero", {
            onSuccess: () => {
                toast.success("Section content has been updated!");
            },
        });
    };
    return (
        <form className="space-y-2 px-2" onSubmit={submit}>
            <LabelInputContainer
                type="text"
                autoFocus
                value={formData.heading}
                onChange={(e) =>
                    setData({ ...formData, heading: e.target.value })
                }
                label="Heading:"
                helperText="Write hero Heading"
                required
                errorMessage={errors.heading}
            />
            <LabelInputContainer
                type="url"
                autoFocus
                value={formData.link}
                onChange={(e) => setData({ ...formData, link: e.target.value })}
                label="SignUp Page Url:"
                helperText="Enter the link of your signup page"
                required
                errorMessage={errors.link}
            />
            <div>
                <Label>Description:</Label>
                <Textarea
                    placeholder="Write something here for hero section description...."
                    value={formData.description}
                    onChange={(e) =>
                        setData({ ...formData, description: e.target.value })
                    }
                    required
                />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                )}
            </div>
            <div className="flex justify-end items-center gap-2">
                <SubmitBtn label="Update Section" processing={processing} />
            </div>
        </form>
    );
}
