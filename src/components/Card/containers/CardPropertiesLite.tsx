interface CardPropertiesProps {
    energy: number;
    attack: number;
    defence: number;
    hp: number;
}

export const CardPropertiesLite = (props: CardPropertiesProps) => {
    return (
        <div className="card-properties-lite">
            <p>Energy: {props.energy}</p>
            <p>Attack: {props.attack}</p>
            <p>Defence: {props.defence}</p>
            <p>HP: {props.hp}</p>
        </div>
    );
};
