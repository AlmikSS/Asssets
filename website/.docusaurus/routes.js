import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Asssets/__docusaurus/debug',
    component: ComponentCreator('/Asssets/__docusaurus/debug', '588'),
    exact: true
  },
  {
    path: '/Asssets/__docusaurus/debug/config',
    component: ComponentCreator('/Asssets/__docusaurus/debug/config', 'd19'),
    exact: true
  },
  {
    path: '/Asssets/__docusaurus/debug/content',
    component: ComponentCreator('/Asssets/__docusaurus/debug/content', '32f'),
    exact: true
  },
  {
    path: '/Asssets/__docusaurus/debug/globalData',
    component: ComponentCreator('/Asssets/__docusaurus/debug/globalData', 'c8e'),
    exact: true
  },
  {
    path: '/Asssets/__docusaurus/debug/metadata',
    component: ComponentCreator('/Asssets/__docusaurus/debug/metadata', '982'),
    exact: true
  },
  {
    path: '/Asssets/__docusaurus/debug/registry',
    component: ComponentCreator('/Asssets/__docusaurus/debug/registry', '897'),
    exact: true
  },
  {
    path: '/Asssets/__docusaurus/debug/routes',
    component: ComponentCreator('/Asssets/__docusaurus/debug/routes', 'fbf'),
    exact: true
  },
  {
    path: '/Asssets/',
    component: ComponentCreator('/Asssets/', 'e7c'),
    routes: [
      {
        path: '/Asssets/',
        component: ComponentCreator('/Asssets/', 'c50'),
        routes: [
          {
            path: '/Asssets/',
            component: ComponentCreator('/Asssets/', 'dee'),
            routes: [
              {
                path: '/Asssets/api-reference',
                component: ComponentCreator('/Asssets/api-reference', '32c'),
                exact: true,
                sidebar: "toolkitSidebar"
              },
              {
                path: '/Asssets/architecture',
                component: ComponentCreator('/Asssets/architecture', 'cf0'),
                exact: true,
                sidebar: "toolkitSidebar"
              },
              {
                path: '/Asssets/developer-guide',
                component: ComponentCreator('/Asssets/developer-guide', 'beb'),
                exact: true,
                sidebar: "toolkitSidebar"
              },
              {
                path: '/Asssets/get-started',
                component: ComponentCreator('/Asssets/get-started', '800'),
                exact: true,
                sidebar: "toolkitSidebar"
              },
              {
                path: '/Asssets/roadmap',
                component: ComponentCreator('/Asssets/roadmap', '442'),
                exact: true,
                sidebar: "toolkitSidebar"
              },
              {
                path: '/Asssets/rules',
                component: ComponentCreator('/Asssets/rules', 'f81'),
                exact: true,
                sidebar: "toolkitSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
