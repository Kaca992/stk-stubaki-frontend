import { IHeaderProps } from "../../components/customTable/customTable";

export const headers: IHeaderProps[] =
    [
        {
            id: 'position',
            value: '',
        },

        {
            id: 'name',
            value: '',
            size: 5
        },

        {
            id: 'gamesPlayed',
            value: 'Odigrani Susreti',
            mobileValue: 'OS',
            size: 1,
            mobileSize: 2
        },

        {
            id: 'won',
            value: 'P',
            size: 1
        },

        {
            id: 'lost',
            value: 'I',
            size: 1
        },

        {
            id: 'draw',
            value: 'N',
            size: 1
        },

        {
            id: 'matches',
            value: 'M',
            size: 1
        },

        {
            id: 'points',
            value: 'B',
            size: 1
        }
    ];
