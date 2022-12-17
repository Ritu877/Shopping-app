import {Roles} from './Roles';

// Components
import {
Admin,AddItems,Products,cart} from 'components';

export default [
 
 {
  component: Admin,
  path: '/admin',
  title: 'admin',
  permission: [
 Roles.ADMIN,
 ],
  children: [
   {
    component: AddItems,
    path: '/additems',
    title: 'additems',
   }
  ]
 },

 {
    component: Products,
    path: '/products',
    title: 'products',
    permission: [
   Roles.USER,
   ],
    children: [
     {
      component: cart,
      path: '/cart',
      title: 'cart',
     }
    ]
   },

]