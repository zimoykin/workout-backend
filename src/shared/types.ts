export enum IWorkoutType {
  Running = 'Running',
  HighIntensityIntervalTraining = 'High-intensity interval training',
  Cycling = 'Cycling',
  Walking = 'Walking',
  Swimming = 'Swimming',
  Dancing = 'Dancing',
  Yoga = 'Yoga',
  Meditation = 'Meditation',
}

export interface IAwardT {
  size: number;
  title: string;
}
export const AwardsTypes: IAwardT[] = [
  {
    size: 750,
    title: 'bronze',
  },
  {
    size: 1250,
    title: 'silver',
  },
  {
    size: 1750,
    title: 'gold',
  },
  {
    size: 2000,
    title: 'special',
  },
];
