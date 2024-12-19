export default interface ICard {
    name: string;
    description: string;
    family: string;
    affinity: string;
    imgUrl: string;
    smallOmgUrl: string;
    id: number;
    energy: number | null;
    hp: number | null ;
    defence: number | null;
    attack: number | null;
    price: number;
    userId: number;
}