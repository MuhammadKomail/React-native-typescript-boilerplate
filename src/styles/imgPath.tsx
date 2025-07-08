// Define image paths as constants to maintain consistency and avoid typos
import logo from '../assets/images/icon.png';
import bgImg from '../assets/images/background.png';
import menuIcon from '../assets/images/menu.png';
import tools from '../assets/images/tools.png';
import parts from '../assets/images/parts.png';
import arrow from '../assets/images/arrow.png';
import home from '../assets/images/home.png';
import profile from '../assets/images/profile.png';
import bell from '../assets/images/bell.png';
import faq from '../assets/images/faq.png';
import help from '../assets/images/help.png';
import schedule from '../assets/images/schedule.png';
import world from '../assets/images/world.png';
import translate from '../assets/images/translate.png';
import lock from '../assets/images/lock.png';
import bgHeader from '../assets/images/header.png';
import block from '../assets/images/block.png';
import dateTime from '../assets/images/grid.png';
import logout from '../assets/images/logout.png';
import loader from '../assets/images/loader.gif';
import cart from '../assets/images/cart.png';
import camera from '../assets/images/camera.png';
import ticket from '../assets/images/ticket.png';
import noTicket from '../assets/images/noTicket.png';
import noSpareParts from '../assets/images/noSpareParts.png';
import request from '../assets/images/requests.png';
import inventory from '../assets/images/inventory.png';
import internet from '../assets/images/internet.png';
import write from '../assets/images/write.png';
import send from '../assets/images/send.png';
import chatTicket from '../assets/images/chatTicket.png';
import profileCamera from '../assets/images/profileCamera.png';
import nextArrow from '../assets/images/nextArrow.png';
import search from '../assets/images/search.png';

const imagePath = {
  // Logo and branding
  logo: logo,
  backgroundImg: bgImg,
  menuIcon: menuIcon,
  parts: parts,
  tools: tools,
  arrow: arrow,
  home: home,
  profile: profile,
  bell: bell,
  faq: faq,
  help: help,
  schedule: schedule,
  world: world,
  translate: translate,
  lock: lock,
  bgHeader: bgHeader,
  block: block,
  dateTime: dateTime,
  logout: logout,
  loader: loader,
  cart: cart,
  camera: camera,
  ticket: ticket,
  noTicket: noTicket,
  noSpareParts: noSpareParts,
  request: request,
  inventory: inventory,
  internet: internet,
  write: write,
  send: send,
  chatTicket: chatTicket,
  profileCamera: profileCamera,
  nextArrow: nextArrow,
  search: search,
} as const;

export default imagePath;

// Type for image paths to enable autocomplete and type checking
export type ImagePath = (typeof imagePath)[keyof typeof imagePath];
