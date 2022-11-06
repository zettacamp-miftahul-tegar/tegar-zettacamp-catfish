import { Company } from "./company";

export interface Datas {
    id: number;
    email: string;
    civility: string;
    first_name: string;
    last_name: string;
    user_status: string;
    count_document: string;
    company: Company;
}