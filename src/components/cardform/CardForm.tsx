export const CardForm = () => {

    // const [card, setCard] = useState({
    //         name: "",
    //         description: "",
    //         family: "",
    //         affinity: "",
    //         imgUrl: "",
    //         smallOmgUrl: "",
    //         id: -1,
    //         energy: -1,
    //         hp: -1,
    //         defence: -1,
    //         attack: -1,
    //         price: 0,
    //         userId: -1, // ?
    // })
    //
    // function processInput(event, {valueData}) {
    //     const target = event.currentTarget;
    //     const value = target.value;
    //     const name = target.name;
    //     console.log(event.target.value);
    //     card[name] = value;
    // }

    return (
        <form>
            <input type="text" id="name"/>
            <input type="text" id="family"/>
            <input type="button" id="generateProperties"/>
            <input type="submit"/>
        </form>
    )
}