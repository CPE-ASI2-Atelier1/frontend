import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className={styles["home-container"]}>
            {/* Conteneur vidéo avec superposition */}
            <div className={styles["video-container"]}>
                <video
                    src="https://cdn.dribbble.com/userupload/13050401/file/original-ed9e329f7167698673aa3fe548026a8c.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                {/* Bouton en superposition */}
                <div className={styles.overlay}>
                    <button
                        onClick={handleLoginClick}
                        className={styles["login-button"]}
                    >
                        Log in to play
                    </button>
                </div>
            </div>
        </div>
    );
};
