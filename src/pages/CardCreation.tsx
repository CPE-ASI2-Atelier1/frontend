import {CardForm} from "../components/cardform/CardForm.tsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//import {Card} from "../components/Card/Card.tsx"

export const CardCreation =() => {
    const location = useLocation();
    const navigate = useNavigate();
    const [wipId, setWipId] = useState<number | null>(null);

    // Permet de sauvgarder le state de la card en cours de modification que l'on veut éditer
    // Si on vient de MyCreations
    useEffect(() => {
        if (location.state?.id) {
            setWipId(location.state.id);
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    return (
        <>
        {wipId != null ? 
            <CardForm cardId={wipId} /> // Cas où on a cliqué sur une wip dans MyCreations
            : 
            <CardForm cardId={-1} /> // Cas où on créé une nouvelle carte
        }
        </>
    );
    // <Card display={"full"} cardId={1}></Card>
}