export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    skype: string;
    whats_app: string;
    age: string;
    gender: string;
    dob: string;
    country: string;
    province: string;
    city: string;
    details: string;
    language: string;
    time_zone: string;
    role: string;
    profile_image: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    data: any;
    pagination: any;
};

export type NetworkType = {
    id: string;
    unique_id: string;
    tracker_id: string;
    name: string;
    clicks: number;
    conversions: number;
    cvr: number;
    status: string;
    created_at: string;
    updated_at: string;
};
export type DomainsType = {
    id: string;
    unique_id: string;
    value: string;
    clicks: number;
    conversions: number;
    cvr: number;
    chart_data: array;
    status: string;
    created_at: string;
    updated_at: string;
};
export type TrackerType = {
    id: string;
    unique_id: string;
    name: string;
    param: string;
    value: string;
    clicks: number;
    conversions: number;
    cvr: number;
    status: number;
    created_at: string;
    updated_at: string;
};
export type OfferType = {
    id: string;
    unique_id: string;
    name: string;
    offer_name: string;
    age: string;
    rate: string;
    clicks: string;
    conversions: string;
    cvr: string;
    url: string;
    status: string;
};
export type UserType = {
    id: string;
    unique_id: string;
    name: string;
    profile_pic: string;
    username: string;
    email: string;
    phone: string;
    age: string;
    rate: string;
    clicks: string;
    conversions: string;
    cvr: string;
    role: string;
    manager_username: string;
    admin_username: string;
    created_at: string;
    updated_at: string;
    status: string;
};

type CountryType = {
    id: number;
    name: string;
    unique_id: string;
    iso2: string;
};
type SettingsType = {
    id: number;
    key: string;
    value: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
};
