/**
 * @author Evann Nalewajek
 */

interface IProps {
    username: string;
}

export const UserShortDisplay = (props:IProps) => {
    return (
        <div>
            {props.username ? (
                <span>Bienvenue, {props.username}</span>
            ) : (
                <span>Aucun utilisateur connecté</span>
            )}
        </div>
    );
};
