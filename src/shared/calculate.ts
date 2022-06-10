import { IWorkoutType } from './types';

/**
 * activity calculator
 * @param user UserModel
 */
function getMET(workoutType: IWorkoutType): number {
  switch (workoutType) {
    case IWorkoutType.Running:
      return 10.0;
    case IWorkoutType.Dancing:
      return 7.0;
    case IWorkoutType.HighIntensityIntervalTraining:
      return 11.2;
    case IWorkoutType.Meditation:
      return 1.0;
    case IWorkoutType.Cycling:
      return 8.5;
    case IWorkoutType.Swimming:
      return 6.0;
    case IWorkoutType.Walking:
      return 3.0;
    case IWorkoutType.Yoga:
      return 4.0;
    default:
      return 2.0;
  }
}
/**
 * Duration of physical activity in minutes × (MET × 3.5 × your weight in kg) / 200 = Total calories burned.
 * CB = T * (0.6309*H + 0.1988*W + 0.2017*A - 55.0969) / 4.184
 * @param A - AGE
 * @param W - WEIGHT
 * @param T - DURATION
 * @param H - BPM (HEART RATE)
 * @returns Total calories burned.
 */
export function calculate(A: number, W: number, T: number, H: number): number {
  //return (duration * (getMET(workoutType) * 3.5 * weight)) / 200;
  //new
  return (T * (0.6309 * H + 0.1988 * W + 0.2017 * A - 55.0969)) / 4.184;
}
