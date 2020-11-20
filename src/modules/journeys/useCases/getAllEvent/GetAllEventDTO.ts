export interface GetAllEventDTO {
    location_id?: string;
    start_date?: number;
    end_date?: number;
    price?: number;
    paged?: number;
    page_size?: number;
    status?: boolean;
    type?: number;
}
