import { UserShortDisplay } from "../components/UserShortDisplay";
import { UserLargeDisplay } from "../components/UserLargeDisplay";

// Interface utilisateur
export interface IUser {
    id: number;
    username: string;
    password?: string;
    money: number;
}

// Composant utilisateur
interface UserProps {
    user: IUser;
    display: "short" | "large";
}

export const User = ({ user, display }: UserProps) => {
    if (display === "short") {
        return (
            <UserShortDisplay username={user.username} />
        );
    } else if (display === "large") {
        return (
            <UserLargeDisplay user={user} />
        );
    }
    return null;
};
