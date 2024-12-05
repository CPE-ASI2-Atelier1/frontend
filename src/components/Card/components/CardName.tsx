interface IProps {
    title:string;
}

export const CardName =(props:IProps)=> {
    return (
        <div className="card-name">
            <p><b>{props.title}</b></p>
        </div>
    )
}