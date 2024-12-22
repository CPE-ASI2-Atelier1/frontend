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
                <span>My Profile : {props.username}</span>
            ) : (
                <span>No users logged in</span>
            )}
        </div>
    );
};
