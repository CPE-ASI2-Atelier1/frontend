/**
 * @author Evann Nalewajek
 */

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "../components/Login/containers/User";
import styles from "./profil.module.css";

export const Profil = () => {
    const { submitted_user } = useSelector((state: RootState) => state.user);

//     return (
//         <div className={styles["profil-container"]}>
//             {submitted_user ? (
//                 <div className={styles["profil-content"]}>
//                     <h1 className={styles["profil-title"]}>Profil</h1>
//                     <User user={submitted_user} display="large" />
//                 </div>
//             ) : (
//                 <p className={styles["no-user-message"]}>Aucun utilisateur connecté.</p>
//             )}
//         </div>
//     );
// };
    
    return (
        <div className={styles["profil-container"]}>
            {submitted_user ? (
                <>
                    {/* Vidéo de fond */}
                    <div className={styles["video-container"]}>
                        <video
                            src="https://cdn.dribbble.com/userupload/13050401/file/original-ed9e329f7167698673aa3fe548026a8c.mp4"
                            autoPlay
                            muted
                            playsInline
                            onTimeUpdate={(e) => {
                                const video = e.target as HTMLVideoElement;
                                if (video.currentTime >= 2.5) {
                                    video.pause();
                                }}}
                        />
                    </div>

                    {/* Overlay et carte de profil */}
                    <div className={styles.overlay}>
                        <div className={styles["profil-card"]}>
                            <h1 className={styles["profil-title"]}>Profile</h1>
                            <div className={styles["profil-user"]}>
                                <User user={submitted_user} display="large" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p className={styles["no-user-message"]}>No user connected</p>
            )}
        </div>
    );
};