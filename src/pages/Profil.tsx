import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../components/Login/containers/User";

export const Profil = () => {
    const { submitted_user } = useSelector((state: RootState) => state.user);

    if (!submitted_user.username) {
        return <p>Aucun utilisateur connecté.</p>;
    }

    return (
        <div>
            <h1>Profil</h1>
            <User user={submitted_user} display="large" />
        </div>
    );
};
