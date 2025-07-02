export interface IRsvp {
    id: string;
    name: string;
    email: string;
    accompany: string
    attendance: string;
}

export interface IRsvpTable {
    data: IRsvp[]
}