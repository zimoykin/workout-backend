import * as DataLoader from 'dataloader';
import { maps } from '../../shared/utils';
import { Workout } from './models/workout.model';
import { WorkoutService } from './workout.service';

export function createWorkoutLoader(service: WorkoutService) {
  return new DataLoader<string, Workout>(async (ids) => {
    const models = await service.findByIds(...ids);
    const modelMaps = maps(models, (_) => _.id);
    return ids.map((id) => modelMaps[id]);
  });
}
