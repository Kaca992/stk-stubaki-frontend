import {SeasonTypeEnum} from './enums';

export interface ISeasonInfo {
    id: number;
    displayName: string;
    type: SeasonTypeEnum;
    godina: string;
}

export interface ITableTeamInfo {
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

export interface ITablePlayerInfo {
    playerId: number;
    playerName: string;
    teamName: string;

    won: number;
    lost: number;
}
