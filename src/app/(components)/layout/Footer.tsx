import React from "react";
import { ChevronDown } from "lucide-react";

interface FooterSection {
  title: string;
  links: string[];
}

const footerSections: FooterSection[] = [
  {
    title: "ABOUT LUNCHBOX",
    links: ["Who We Are", "Blog", "Work With Us", "Contact Us"],
  },
  {
    title: "LUNCHVERSE",
    links: ["LunchBox", "District Placeholders"],
  },
  {
    title: "FOR CANTEENS",
    links: ["Partner With Us", "Open your Canteen"],
  },
  {
    title: "LEARN MORE",
    links: ["Privacy", "Security", "Terms", "Sitemap"],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-4 pb-6 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Logo and Selectors */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/* Logo/Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tighter mb-4 sm:mb-0">
            LunchBox
          </h1>

          {/* Language and Country Selectors */}
          <div className="flex space-x-4">
            {/* Country Selector (India) */}
            <div className="relative inline-flex items-center bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="flex items-center py-2 px-3 text-gray-700 text-base font-medium">
                {/* Placeholder for Flag Icon (using Unicode flag) */}
                <span className="mr-2" role="img" aria-label="India flag">
                  🇮🇳
                </span>
                India
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
            </div>

            {/* Language Selector (English) */}
            <div className="relative inline-flex items-center bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors">
              <span className="flex items-center py-2 px-3 text-gray-700 text-base font-medium">
                {/* Placeholder for Globe Icon */}
                <span className="mr-2 text-xl align-middle">&#127760;</span>
                English
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <hr className="border-gray-200 mb-8" />

        {/* Bottom Section: Links Grid (Mobile-First Responsive Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              // Custom spanning for the last two sections on desktop to align layout
              className={
                index >= 2
                  ? "col-span-1 md:col-span-2 lg:col-span-1"
                  : "col-span-1"
              }
            >
              <h4 className="text-base font-bold text-gray-900 mb-4 tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Placeholder for Social Media Icons/App Links (Rightmost Column) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-base font-bold text-gray-900 mb-4 tracking-wider">
              SOCIAL
            </h4>
            <div className="flex space-x-3 mb-4">
              {/* Placeholder Icons (e.g., Facebook, Twitter, Instagram) */}
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-xs">© LunchBox Company, 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
