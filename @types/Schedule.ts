export interface ScheduleItem {
  _id: string;
  client: {
    name: string;
    phone: string;
  };
  scheduleAt: Date;
  services: {
    _id: string;
    name: string;
  }[];
  createdAt: Date;
}

export interface User {
  cellPhone: string;
  name: string;
}
