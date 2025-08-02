export class OrderTrackingDTO {

  constructor(data:Partial<OrderTrackingDTO>) {
    Object.assign(this, data);
  }

  id?: string|null;
  trackDate?: string|null;
  history?: string|null;
  order?: string|null;

}
