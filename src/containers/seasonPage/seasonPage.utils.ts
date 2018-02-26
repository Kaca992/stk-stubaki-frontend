import { IHeaderProps } from "../../components/customTable/customTable";

export const teamHeaders: IHeaderProps[] = [
        { id: 'name', value: '', size: 5, mobileSize: 7, columnTextAlign: 'left' },
        { id: 'gamesPlayed', value: 'OS', size: 1, tooltip: 'Odigrani susreti' },
        { id: 'won', value: 'P', size: 1, tooltip: 'Pobjede', isHiddenOnMobile: true },
        { id: 'draw', value: 'N', size: 1, tooltip: 'Neriješene', isHiddenOnMobile: true },
        { id: 'lost', value: 'I', size: 1, tooltip: 'Izgubljene', isHiddenOnMobile: true },
        { id: 'matches', value: 'M', size: 2, mobileSize: 2, tooltip: 'Mečevi' },
        { id: 'points', value: 'B', size: 1,  tooltip: 'Bodovi' }
];

export const playerHeaders: IHeaderProps[] = [
    { id: 'playerName', value: '', size: 5, columnTextAlign: 'left' },
    { id: 'teamName', value: '', size: 5, columnTextAlign: 'left'},
    { id: 'matches', value: '', size: 2, columnTextAlign: 'right' }
];
