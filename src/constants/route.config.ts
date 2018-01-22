import { ILink } from '../components/header/header';

export const SELECTOR_LINKS = {
    competitionPage: '/competition'
};

export const PATHS = {
    home: '/',
    competitionSelector: '/competition-selector',
    competitionPage: '/competition/:id'
};

export const HEADER_LINK: ILink = {
    text: "STK STUBAKI",
    url: PATHS.home,

    icon: {
        name: 'home',
    },
};

export const NAVBAR_LINKS: ILink[] = [
  {
    text: "LIGE KZŽ",
    children: [
        {
            text: "Tablice i raspored",
            url: PATHS.competitionSelector,
        },
    ],
  },

  {
    text: "Test 3",
    url: PATHS.home,
    icon: {
        name: 'wrench',
    },
  },
];
