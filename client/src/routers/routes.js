import UnitPrice from '../pages/unitprice/ListPage';
import Item from '../pages/item/ListPage';

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
        component: UnitPrice
    },
];

export default routes;