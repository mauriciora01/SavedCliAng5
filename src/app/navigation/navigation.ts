export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'sample',
                'title': 'Sample',
                'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/sample',
                'badge': {
                    'title': 25,
                    'translate': 'NAV.SAMPLE.BADGE',
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            }
        ]
    }
];

export const navigationGeneral = [
    {
        'id': 'applications',
        'title': 'Menu',
        'translate': 'NAV.APPLICATIONS',
        'type': 'group',
        'children': [
            {
                'id'       : 'empresarias',
                'title'    : 'Empresarias',
                'translate': 'NAV.SAMPLE.TITLE',
                'type'     : 'collapse',
                'icon'     : 'local_florist',                
                'children' : [                    
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
                ]
            },

            {
                'id'       : 'pedidos',
                'title'    : 'Pedidos',
                'translate': 'NAV.SAMPLE.TITLE',
                'type'     : 'collapse',
                'icon'     : 'shopping_cart',                
                'children' : [                    
                    {
                        'id': 'pedidosprincipal',
                        'title': 'Crear Nuevo Pedido',
                        'translate': 'NAV.SAMPLE.TITLE',
                        'type': 'item',
                        'icon': 'add_shopping_cart',
                        'url': '/pedidosprincipal',
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

