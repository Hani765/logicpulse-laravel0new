import { z } from "zod";

export const step1Schema = z.object({
    main_url: z.string().url("Please enter a valid URL."),
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
});
export const step3Schema = z.object({
    urls: z
        .array(
            z.object({
                url: z.string().url({ message: "Invalid URL format" }),
                deviceType: z
                    .union([
                        z.enum([
                            "all",
                            "windows",
                            "mobiles",
                            "linux",
                            "android",
                            "iOs",
                        ]),
                        z.literal(""),
                    ])
                    .refine((value) => value !== "", {
                        message: "Device type is required",
                    }),
            }),
        )
        .nonempty({ message: "At least one URL is required" }),
});
