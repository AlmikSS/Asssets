import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CCG Toolkit',
  tagline: 'Toolkit documentation for CandyCandleGames Unity projects',
  url: 'https://candycandlegames.github.io',
  baseUrl: '/Asssets/',
  organizationName: 'CandyCandleGames',
  projectName: 'Asssets',
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
        pages: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'CCG Toolkit',
      items: [
        {type: 'docSidebar', sidebarId: 'toolkitSidebar', position: 'left', label: 'Guide'},
        {to: '/api/index.html', label: 'API', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [{title: 'Documentation', items: [{label: 'Get Started', to: '/get-started'}]}],
      copyright: `Copyright © ${new Date().getFullYear()} CandyCandleGames.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
