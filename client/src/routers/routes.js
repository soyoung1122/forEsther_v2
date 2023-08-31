import UnitPrice from '../pages/unitprice/ListPage';
import Item from '../pages/item/ListPage';
import Bom from '../pages/bom/ListPage';

const routes = [
    {
        path: '/unitprices',
        component: UnitPrice
    },
    {
        path: '/seriallots',
        component: UnitPrice
    },
    {
        path: '/items',
        component: Item
    },
    {
        path: '/boms',
        component: Bom
    },
];

export default routes;