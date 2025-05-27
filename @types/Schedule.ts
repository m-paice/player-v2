export interface ScheduleItem {
  accountId: string;
  addition: number;
  averageTime: number;
  createdAt: string;
  deletedAt: any;
  discount: number;
  employeeId: string;
  id: string;
  scheduleAt: string;
  services: any[];
  shortName: any;
  status: string;
  updatedAt: string;
  user: User;
  userId: string;
}

export interface User {
  cellPhone: string;
  name: string;
}
