/**
 * @author Evann Nalewajek
 */

import { UserShortDisplay } from "../components/UserShortDisplay";
import { UserLargeDisplay } from "../components/UserLargeDisplay";
import IUser from "../../../types/IUser";

interface UserProps {
    user: IUser;
    display: "short" | "large";
}

export const User = ({ user, display }: UserProps) => {
    if (display === "short") {
        return (
            <UserShortDisplay username={user.login} />
        );
    } else if (display === "large") {
        return (
            <UserLargeDisplay user={user} />
        );
    }
    return null;
};
