
export interface IPlaceRepo {
  exists(placeId: string): Promise<boolean>;
}
