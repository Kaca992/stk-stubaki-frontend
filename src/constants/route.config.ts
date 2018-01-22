import { ILink } from '../components/header/header';

export const SELECTOR_LINKS = {
    tablicaPage: '/tablica'
};

export const PATHS = {
    home: '/',
    seasonSelector: '/season-selector',
    tablicaPage: '/tablica/:id'
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
            text: "Tablica",
            url: PATHS.seasonSelector,
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
