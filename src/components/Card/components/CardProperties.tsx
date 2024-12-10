interface IProps {
    energy: number;
    attack: number;
    defence: number;
    hp: number;
}

export const CardProperties =(props:IProps) => {
    return (
        <table className="card-properties">
            <tbody>
                <tr>
                    <th>ATK : {props.attack}</th>
                    <th>DEF : {props.defence}</th>
                </tr>
                <tr>
                    <th>ENG : {props.energy}</th>
                    <th>HP : {props.hp}</th>
                </tr>
            </tbody>
        </table>
    )
}