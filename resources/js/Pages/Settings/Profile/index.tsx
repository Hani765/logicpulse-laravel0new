import { PageProps } from "@/types";
import SettingsLayout from "@/Layouts/SettingsLayout";
import ProfileImage from "./Partials/ProfileImage";
import ProfileUpdate from "./Partials/ProfileUpdate";
import PasswordUpdate from "./Partials/PasswordUpdate";
import DeleteUser from "./Partials/DeleteUser";
import LanguageTimeZone from "./Partials/LanguageTimeZone";
import Sessions from "./Partials/Sessions";
import AlertsEndNotifications from "./Partials/AlertsEndNotifications";
export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <SettingsLayout auth={auth} head="Profile">
            <div className="py-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="w-full space-y-2">
                    <ProfileImage profileImagePath={auth.user.profile_image} />
                    <LanguageTimeZone user={auth.user} />
                    <Sessions />
                    <AlertsEndNotifications />
                </div>
                <div className="col-span-2 space-y-2">
                    <ProfileUpdate
                        user={auth.user}
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                    <PasswordUpdate />
                    <DeleteUser />
                </div>
            </div>
        </SettingsLayout>
    );
}
