import {SeasonTypeEnum} from './enums';

export interface ISeason {
    seasonId: number;
    name: string;
    type: SeasonTypeEnum;
}
