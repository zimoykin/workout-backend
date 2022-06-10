import * as DataLoader from 'dataloader';
import { maps } from '../../shared/utils';
import { Award } from './models/award.model';
import { AwardService } from './award.service';

export function createAwardsLoader(service: AwardService) {
  return new DataLoader<string, Award>(async (ids) => {
    const models = await service.findByIds(...ids);
    const mapper = maps(models, (_) => _.id);
    return ids.map((id) => mapper[id]);
  });
}
