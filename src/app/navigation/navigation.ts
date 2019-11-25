export const navigation = [
    {
        'id': 'applications',
        'title': 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id': 'sample',
                'title': 'Sample',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'email',
                'url': '/sample',
                'badge': {
                    'title': 25,
                    'translate': 'NAV.SAMPLE.BADGE',
                    'bg': '#F44336',
                    'fg': '#FFFFFF'
                }
            }
        ]
    }
];

export const navigationGeneral = [


    { 
        'id': 'home',
        'title': 'Home',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'item',
        'icon': 'home',
        'url': '/principal',
    },
    { 
        'id': 'articulos',
        'title': 'Artículos',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'item',
        'icon': 'business_center',
        'url': '/frasf',
    },
    { //
        'id': 'cuenta',
        'title': 'Mi cuenta',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'item',
        'icon': 'perm_identity',
        'url': '/perfil',
    },
    {
        'id': 'empresarias',
        'title': 'Empresarias',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'collapse',
        'icon': 'local_florist',
        'children': [
            {
                'id': 'registroempresariaec',
                'title': 'Crear Nueva Empresaria',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'person_add',
                'url': '/registroempresariaec',
            },
            {
                'id': 'misempresarias',
                'title': 'Mis Empresarias',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'group',
                'url': '/misempresarias',
            },
            {
                'id': 'misprospectos',
                'title': 'Mis Prospectos',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'group',
                'url': '/misprospectos',
            },
            {
                'id': 'misactivas',
                'title': 'Mis Activas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'group',
                'url': '/misactivas',
            },
            {
                'id': 'misposiblesegresos',
                'title': 'Mis Posibles Egresos',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'group',
                'url': '/misposiblesegresos',
            },
            {
                'id': 'misinactivas',
                'title': 'Mis Inactivas',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'group',
                'url': '/misinactivas',
            },
        ]
    },

    {
        'id': 'pedidos',
        'title': 'Pedidos',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'collapse',
        'icon': 'shopping_cart',
        'children': [
            {
                'id': 'pedidosprincipal',
                'title': 'Crear Nuevo Pedido',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'add_shopping_cart',
                'url': '/pedidosprincipal',
            },
            {
                'id': 'mispedidos',
                'title': 'Mis Pedidos',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'view_list',
                'url': '/mispedidos',
            },
            {
                'id': 'pedidosfacturados',
                'title': 'Pedidos Facturados',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'today',
                'url': '/pedidosfacturados',
            },
        ]
    },
    {
        'id': 'oficinavirtual',
        'title': 'Oficina Virtual',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'collapse',
        'icon': 'timeline',
        'children': [
            {
                'id': 'micartera',
                'title': 'Mi Cartera',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'attach_money',
                'url': '/micartera',
            },
        ]
    },
    {
        'id': 'ubicaciongeneral',
        'title': 'Ubicación General',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'item',
        'icon': 'place',
        'url': '/ubicaciongeneral',
    },


    {
        'id': 'Salir',
        'title': 'Salir',
        'translate': 'NAV.SAMPLE.TITLE',
        'type': 'item',
        'icon': 'input',
        'url': '/login',
    },


];



export const navigationGeneralEmpre = [
    {
        'id': 'applications',
        'title': 'Menu',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            { //perm_identity
                'id': 'home',
                'title': 'HOME',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'place',
                'url': '/',
            },
            { //perm_identity
                'id': 'home',
                'title': 'ARTICULOS',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'business_center',
                'url': '/',
            },
            { //
                'id': 'home',
                'title': 'MI CUENTA',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'perm_identity',
                'url': '/principal',
            },
            {
                'id': 'pedidos',
                'title': 'Pedidos',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'collapse',
                'icon': 'shopping_cart',
                'children': [
                    {
                        'id': 'pedidosprincipal',
                        'title': 'Crear Nuevo Pedido',
                        'translate': 'NAV.SAMPLE.TITLE',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/pedidosprincipal',
                    },
                    {
                        'id': 'mispedidos',
                        'title': 'Mis Pedidos',
                        'translate': 'NAV.SAMPLE.TITLE',
                        'type': 'item',
                        'icon': 'view_list',
                        'url': '/mispedidos',
                    },
                    {
                        'id': 'pedidosfacturados',
                        'title': 'Pedidos Facturados',
                        'translate': 'NAV.SAMPLE.TITLE',
                        'type': 'item',
                        'icon': 'today',
                        'url': '/pedidosfacturados',
                    },
                ]
            },
            {
                'id': 'oficinavirtual',
                'title': 'Oficina Virtual',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'collapse',
                'icon': 'timeline',
                'children': [
                    {
                        'id': 'micartera',
                        'title': 'Mi Cartera',
                        'translate': 'NAV.SAMPLE.TITLE',
                        'type': 'item',
                        'icon': 'attach_money',
                        'url': '/micartera',
                    },
                ]
            },
            {
                'id': 'ubicaciongeneral',
                'title': 'Ubicación General',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'place',
                'url': '/ubicaciongeneral',
            },


            {
                'id': 'Salir',
                'title': 'Salir',
                'translate': 'NAV.SAMPLE.TITLE',
                'type': 'item',
                'icon': 'input',
                'url': '/login',
            },
        ]
    }
];
