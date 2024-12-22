import React, { useState, useEffect } from "react";
import "./MessageContainer.css";

export const MessageContainer = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [animate, setAnimate] = useState(false);

    const showMessage = (newMessage: string) => {
        setMessage(newMessage);

        // Déclenche l'animation en ajoutant la classe
        setAnimate(true);

        // Supprime l'animation après un court délai
        setTimeout(() => setAnimate(false), 500); // 500ms correspond à la durée de l'animation
    };

    return (
        <div>
            <button onClick={() => showMessage("Action performed!")}>Trigger Message</button>
            {message && (
                <div className={`message-container ${animate ? "highlight" : ""}`}>
                    <div className="message">{message}</div>
                </div>
            )}
        </div>
    );
};