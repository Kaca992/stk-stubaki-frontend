import { IHeaderProps } from "../../components/customTable/customTable";

export const headers: IHeaderProps[] =
    [
        {
            id: 'position',
            value: '',
            size: 1,
            columnTextAlign: 'left'
        },

        {
            id: 'name',
            value: '',
            size: 5,
            mobileSize: 7,
            columnTextAlign: 'left'
        },

        {
            id: 'gamesPlayed',
            value: 'OS',
            size: 1,
            tooltip: 'Odigrani susreti'
        },

        {
            id: 'won',
            value: 'P',
            size: 1,
            tooltip: 'Pobjede',
            isHiddenOnMobile: true
        },

        {
            id: 'draw',
            value: 'N',
            size: 1,
            tooltip: 'Neriješene',
            isHiddenOnMobile: true
        },

        {
            id: 'lost',
            value: 'I',
            size: 1,
            tooltip: 'Izgubljene',
            isHiddenOnMobile: true
        },

        {
            id: 'matches',
            value: 'M',
            size: 1,
            mobileSize: 2,
            tooltip: 'Mečevi'
        },

        {
            id: 'points',
            value: 'B',
            size: 1,
            tooltip: 'Bodovi'
        }
    ];
