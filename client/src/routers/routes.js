import UnitPrice from '../pages/unitprice/ListPage';
import Item from '../pages/item/ListPage';
import ItemRegister from '../pages/item/RegisterPage';
import Bom from '../pages/bom/ListPage';
import URegister from "../pages/unitprice/Register";

const routes = [
    {
        path: '/unitprices',
        component: UnitPrice
    },
    {
        path : "/unitprices/register",
        component : URegister
    },
    {
        path: '/seriallots',
        component: UnitPrice
    },
    {
        path: '/items',
        component: Item,
    },
    {
        path: '/items/register',
        component: ItemRegister
    },
    {
        path: '/boms',
        component: Bom
    },
];

export default routes;