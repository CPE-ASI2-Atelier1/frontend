import {Card} from "../components/Card/Card.tsx";

/**
 * Application page for showing a particular card on the screen
 * @constructor
 */
export const CardDisplay =() =>{
    const id = 1 // TEST, need after that to be passed through the properties

    return (
        <>
            <Card cardId={id} display="full"></Card>
        </>
    )
}