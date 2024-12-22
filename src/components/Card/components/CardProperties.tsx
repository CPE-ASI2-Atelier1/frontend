interface IProps {
    energy: number | null;
    attack: number | null;
    defence: number | null;
    hp: number | null;
    family : string;
    affinity : string;
}

export const CardProperties =(props:IProps) => {
    return (
        <table className="card-properties">
            <tbody>
                <tr>
                    <th>Attack<br/>{props.attack}</th>
                    <th>Defense<br/> {props.defence}</th>
                </tr>
                <tr>
                    <th>Energy<br/> {props.energy}</th>
                    <th>Health<br/> {props.hp}</th>
                </tr>
                <tr>
                    <th>Family<br/> {props.family}</th>
                    <th>Affinity<br/> {props.affinity}</th>
                </tr>
            </tbody>
        </table>
    )
}