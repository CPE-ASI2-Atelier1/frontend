export default interface IUser {
    id: number;
    login: string;
    pwd?: string;
    account: number;
    lastName: string;
    surName: string;
    email: string;
    cardList: any[];
}
