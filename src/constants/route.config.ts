import { ILink } from '../components/header/header';

export const PATHS = {
    home: '/',
    competition: '/competition',
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
    text: "Test 1 dugiiiiiiiiiiiiiiiii",
    url: PATHS.competition,
  },

  {
    text: "Test 2",
    children: [
        {
            text: "Test 2.1",
            url: PATHS.home,
        },

        {
            text: "Test 2.2.",
            url: PATHS.home,
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
