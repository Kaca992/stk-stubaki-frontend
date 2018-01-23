import {SeasonTypeEnum} from './enums';

export interface ISeasonInfo {
    id: number;
    displayName: string;
    type: SeasonTypeEnum;
    godina: string;
}
