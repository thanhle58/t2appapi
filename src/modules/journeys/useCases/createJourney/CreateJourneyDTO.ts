
export interface CreateJourneyDTO {
    title: string;
    price?: number;
    create_by: string;
    status?: number;
    location_ids: string[];
    type: string;
}