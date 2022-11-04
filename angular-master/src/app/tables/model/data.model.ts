export interface Datas {
    _id: number;
    email: string;
    civility: string;
    first_name: string;
    last_name: string;
    company: {
        name: string;
        user_type: string;
    },
    user_status: string;
    count_document: string
}