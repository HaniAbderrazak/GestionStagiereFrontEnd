export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  
  {
    id: 'offres',
    title: 'offres',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'offres',
        title: 'Offres',
        type: 'item',
        url: '/admin/offres',
        icon: 'feather icon-globe',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'add-offre',
        title: 'add-offre',
        type: 'item',
        url: '/admin/addOffre',
        icon: 'feather icon-plus ',
        target: true,
        breadcrumbs: false
      }
    ]
  },

  {
    id: 'stagieres',
    title: 'stagieres',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'stagieres',
        title: 'stagieres',
        type: 'item',
        url: '/admin/stagieres',
        icon: 'feather icon-users',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'add-stagiere',
        title: 'add-stagiere',
        type: 'item',
        url: '/admin/addStagiere',
        icon: 'feather icon-plus ',
        target: true,
        breadcrumbs: false
      }
    ]
  }


]