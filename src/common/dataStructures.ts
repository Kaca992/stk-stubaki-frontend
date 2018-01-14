import {SeasonTypeEnum} from './enums';

export interface ISeasonInfo {
    seasonId: number;
    name: string;
    type: SeasonTypeEnum;
}
