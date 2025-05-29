// Define image paths as constants to maintain consistency and avoid typos
import logo from '../assets/images/icon.png';
import search from '../assets/images/search.png';

const imagePath = {
  // Logo and branding
  logo: logo,
  search: search,
} as const;

export default imagePath;

// Type for image paths to enable autocomplete and type checking
export type ImagePath = (typeof imagePath)[keyof typeof imagePath];
