export class Product {
  constructor(
    public key?: string,
    public id?: number,
    public name?: string,
    public price?: number,
    public amount?: number,
    public category?: string,
    public imageUrl?: string,
    public description?: string,
    public isFavorite = false
  ) {
  }
}
