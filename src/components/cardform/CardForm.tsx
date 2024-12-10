import "./CardForm.css"

export const CardForm = () => {

    return (
        <form className="card-form">
            <label htmlFor="name">Nom:</label>
            <input type="text" id="name" name="name"/>

            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description"/>

            <label htmlFor="family">Family:</label>
            <input type="text" id="family" name="family"/>

            <label htmlFor="affinity">Affinity:</label>
            <input type="text" id="affinity" name="affinity"/>

            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" name="image"/>

            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" disabled/>

            <label htmlFor="attack">Attack:</label>
            <input type="text" id="attack" name="attack" value="50" readOnly/>

            <label htmlFor="defense">Defense:</label>
            <input type="text" id="defense" name="defense" value="40" readOnly/>

            <label htmlFor="energy">Energy:</label>
            <input type="text" id="energy" name="energy" value="30" readOnly/>

            <label htmlFor="hp">HP:</label>
            <input type="text" id="hp" name="hp" value="100" readOnly/>

            <input type="button" id="generateProperties" value="Generate Props"/>

            <input type="submit" id="createCard" value="Create Card" disabled/>
        </form>
    )
}