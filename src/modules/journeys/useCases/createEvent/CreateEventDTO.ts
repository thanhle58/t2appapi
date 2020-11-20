
export interface CreateEventDTO {
    title: string;
    start_date: number;
    end_date: number;
    price?: number;
    create_by: string;
    status?: number;
    location_id?: string;
    type: string;
}