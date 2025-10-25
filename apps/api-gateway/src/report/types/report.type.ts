import { Timelog } from '@contracts/timelog';

export type Report = { totalHours: number; timelogs: Timelog[] };
