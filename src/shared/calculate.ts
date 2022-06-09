import { IWorkoutType } from "./types";


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
 * @param weight
 * @param end
 * @param start
 * @returns Total calories burned.
 */
export function calculate(workoutType: IWorkoutType, weight: number, end: string, start: string): number {
    const duration = (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60;
    return (duration * (getMET(workoutType) * 3.5 * weight)) / 200;
}
