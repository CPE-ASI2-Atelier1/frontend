enum MediaType {
    IMAGE = "img",
    VIDEO = "video"
}

interface IProps {
    source:string,
    type: string,
    className?: string,
}

// Bon, si on veut respecter OCP, il faut déléguer les logiques à des sous-composants : MediaImage.tsx, VideoImage.tsx, etc
// Sinon, cette classe va devenir immense et non maintenable...
export const Media = (props:IProps) => {
    let result;
    switch (props.type) {
        case MediaType.IMAGE:
            result = (
                <img
                    src={props.source}
                    alt={props.source}
                    className={props.className}>
                </img>
            )
            break;
        case MediaType.VIDEO:
            result = (
                <object
                    data={props.source}
                    className={props.className}>
                </object>
            )
            break;
        default:
            break;
    }
    return result;
}