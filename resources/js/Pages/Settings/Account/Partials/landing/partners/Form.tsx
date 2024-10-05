import { useState } from "react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Example partners data (could be fetched from an API)

export default function Form({ partnersData }: { partnersData: any }) {
    const [partners, setPartners] = useState(partnersData);
    const [formData, setFormData] = useState({
        name: "",
        website: "",
        description: "",
        logo: null, // To handle file upload
    });
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

    const handleAddPartner = () => {
        if (formData.name && formData.logo && formData.description) {
            const newPartner = {
                href: formData.website || "#", // Set website to "#" if no URL is provided
                img: URL.createObjectURL(formData.logo), // Temporary URL for the uploaded logo
                alt: formData.name,
                title: formData.name,
                description: formData.description,
            };
            setPartners([...partners, newPartner]);

            // Reset form data after adding
            setFormData({
                name: "",
                website: "",
                description: "",
                logo: null,
            });

            // Hide form after adding
            setShowForm(false);
        } else {
            alert("Please fill in all required fields and upload a logo.");
        }
    };

    return (
        <>
            {JSON.stringify(partnersData)}

            {/* Button to show/hide the form */}
            <div className="flex justify-center items-center mt-4">
                <Button
                    variant="outline"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancel" : "Add more"}
                </Button>
            </div>

            {/* Conditionally render the form when showForm is true */}
            {showForm && (
                <ul className="flex flex-col space-y-4 mt-4">
                    <li>
                        <div>
                            <Label>Select Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        logo: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </li>
                    <li>
                        <LabelInputContainer
                            label="Name"
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            helperText="Logicpulse"
                        />
                    </li>
                    <li>
                        <LabelInputContainer
                            label="Website Url (optional)"
                            type="url"
                            value={formData.website}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    website: e.target.value,
                                })
                            }
                            helperText="https://www.logicpulse.site"
                        />
                    </li>
                    <li>
                        <div>
                            <Label>Description:</Label>
                            <Textarea
                                placeholder="Something about partner..."
                                value={formData.description}
                                name="description"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </li>
                    <li className="flex justify-center items-center">
                        <Button variant="outline" onClick={handleAddPartner}>
                            Add Partner
                        </Button>
                    </li>
                </ul>
            )}
        </>
    );
}
