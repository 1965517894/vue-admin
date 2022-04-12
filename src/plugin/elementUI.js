import Vue from "vue";

// 按需引入element-ui
import {
  Button,
  Container,
  Header,
  Main,
  Aside,
  Col,
  Row,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Table,
  TableColumn,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Pagination,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

const uesAll = (arr) => {
  for (let e of arr) {
    Vue.use(e);
  }
};

uesAll([
  Button,
  Container,
  Header,
  Main,
  Aside,
  Col,
  Row,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Table,
  TableColumn,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  DatePicker,
  Option,
  Dialog,
  Pagination,
]);
