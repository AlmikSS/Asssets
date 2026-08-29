import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CCG Toolkit',
  tagline: 'Toolkit documentation for CandyCandleGames Unity projects',
  url: 'https://almikss.github.io',
  baseUrl: '/Asssets/',
  organizationName: 'AlmikSS',
  projectName: 'Asssets',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      ru: {label: 'Русский', htmlLang: 'ru-RU'},
      en: {label: 'English', htmlLang: 'en-US'},
    },
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  markdown: {mermaid: true},
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'CCG Toolkit',
      items: [
        {type: 'docSidebar', sidebarId: 'toolkitSidebar', position: 'left', label: 'Руководство'},
        {
          type: 'doc',
          docId: 'api-reference',
          label: 'API',
          position: 'right',
        },
        {type: 'localeDropdown', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [{title: 'Документация', items: [{label: 'Быстрый старт', to: '/get-started'}]}],
      copyright: `Copyright © ${new Date().getFullYear()} CandyCandleGames.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
