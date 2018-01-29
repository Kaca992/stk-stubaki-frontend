import {SeasonTypeEnum} from './enums';

export interface ISeasonInfo {
    id: number;
    displayName: string;
    type: SeasonTypeEnum;
    godina: string;
}

export interface ITableTeamInfo {
    position: string;
    teamId: number;
    name: string;

    gamesPlayed: number;
    won: number;
    lost: number;
    draw: number;
    matches: string;

    points: number;
    negativePoints?: number;
    penaltyDesc?: string;
}
