// interface Imenu {
//   [str: string]: any[];
// }
const MenuData: Array<any> = [
  { name: "首页", path: "/index", children: [] },
  {
    name: "博客管理",
    path: "/blog/management",
    children: [
      {
        name: "博客列表",
        path: "/blog/list",
        children: [],
      },
      {
        name: "新建博客",
        path: "/blog/create",
        children: [],
      },
    ],
  },
  {
    name: "分类管理",
    path: "/category/management",
    children: [
      {
        name: "分类列表",
        path: "/category/list",
        children: [],
      },
      {
        name: "新建分类",
        path: "/category/create",
        children: [],
      },
    ],
  },
  {
    name: "物品管理",
    path: "/item/management",
    children: [
      {
        name: "物品列表",
        path: "/item/list",
        children: [],
      },
      {
        name: "物品分类",
        path: "/item/create",
        children: [],
      },
    ],
  },

  { name: "用户列表", path: "/user/list", children: [] },
];
export default MenuData;
