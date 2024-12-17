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
                    <th>Attack : <br/>{props.attack}</th>
                    <th>Defense : <br/> {props.defence}</th>
                </tr>
                <tr>
                    <th>Energie : <br/> {props.energy}</th>
                    <th>Health : <br/> {props.hp}</th>
                </tr>
            </tbody>
        </table>
    )
}