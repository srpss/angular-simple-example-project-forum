export interface IBoards {
    "_id": string;
    "usename": string;
    "image": string;

}

export class repos {
    "_id": string;
    "originalPoster": string;
    "image": string;
    "date": Date;
    "owner": string;
    "description": string[];
    "__v": number;
}