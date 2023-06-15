import { ICONS, IMAGES } from "../assests";
import Account from "../containers/Account";
import Customer from "../containers/CustomerCare";
import AboutUs from "../containers/AboutUs";
import ProductCategory from "../containers/ProductCategory";
 export const Google_key="AIzaSyDjyTvygnEWDcJvXCkJv6DknRMMX6A4h1g";

export const BASE_URL = "https://ecommerce-server-le5a.onrender.com/api";

export const sideBar = [
  {
    id: 0,
    label: "Men's",
    icon: <ICONS.man />,
    path: "/mens",
    // component:<ProductCategory/>
  },
  {
    id: 1,
    label: "Women's",
    icon: <ICONS.woman />,
    path: "/womens",
  },
  {
    id: 2,
    label: "Kid's",
    icon: <ICONS.childcare />,
    path: "/kids",
  },
  {
    id: 3,
    label: "Cosmetics",
    icon: <ICONS.laptop />,
    path: "/cosmetics",
  },
  {
    id: 4,
    label: "Electronics",
    icon: <ICONS.electronics />,
    path: "/electronics",
  },
  {
    id: 5,
    label: "Footwear",
    icon: <ICONS.kitchen />,
    path: "/footwear",
  },
];

export const sideBar2 = [
  {
    id: 1,
    label: "Your Account",
    icon: <ICONS.account />,
    path: "/account",
    component: <Account />,
  },
  {
    id: 2,
    label: "About Us",
    icon: <ICONS.info />,
    path: "/about",
    component: <AboutUs />,
  },
  {
    id: 3,
    label: "Customer Care",
    icon: <ICONS.customercare />,
    path: "/customer",
    component: <Customer />,
  },
];
// export const Homecontent = [
//   {
//     id: 1,
//     label: "TShirts",
//     image: IMAGES.tshirt,
//   },
//   {
//     id: 2,
//     label: "Shirts",
//     image: IMAGES.shirt,
//   },
//   {
//     id: 3,
//     label: "Tops",
//     image: IMAGES.tops,
//   },
//   {
//     id: 4,
//     label: "Jewellery",
//     image: IMAGES.jewellery,
//   },
//   {
//     id: 5,
//     label: "Accessories",
//     image: IMAGES.accessories,
//   },
//   {
//     id: 6,
//     label: "Flip-flops",
//     image: IMAGES.flipflops,
//   },
//   {
//     id: 7,
//     label: "BagPacks",
//     image: IMAGES.BagPacks,
//   },
//   {
//     id: 8,
//     label: "Trousers",
//     image: IMAGES.trousers,
//   },
// ];

// export const Carousel = [
//   {
//     id: 1,
//     image: IMAGES.ad1,
//   },
//   {
//     id: 2,
//     image: IMAGES.ad1,
//   },
//   {
//     id: 3,
//     image: IMAGES.ad1,
//   },
//   {
//     id: 4,
//     image: IMAGES.ad1,
//   },
// ];

// export const Springcollection = [
//   {
//     id: 1,
//     image: IMAGES.offer1,
//   },
//   {
//     id: 2,
//     image: IMAGES.offer2,
//   },
//   {
//     id: 3,
//     image: IMAGES.offer3,
//   },
//   {
//     id: 4,
//     image: IMAGES.offer4,
//   },
//   {
//     id: 5,
//     image: IMAGES.offer5,
//   },
//   {
//     id: 6,
//     image: IMAGES.offer6,
//   },
// ];

export const categories = [
  {
    id: 1,
    name: "Fashion",
    image: IMAGES.jewellery,
    path: "/womens",
    component: <ProductCategory />,
  },
  {
    id: 2,
    name: "Accessories",
    image: IMAGES.accessories,
    path: "/cosmetics",
    component: <ProductCategory />,
  },
  {
    id: 3,
    name: "Home Decor",
    image: IMAGES.homedecor,
    path: "/womens",
    component: <ProductCategory />,
  },
  //   // { id: 4, name: "Toys", image: "https://via.placeholder.com/150x150" },
];
