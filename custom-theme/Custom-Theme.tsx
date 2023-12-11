import type { CustomFlowbiteTheme } from 'flowbite-react';


export const customTheme: CustomFlowbiteTheme = {
  navbar: {
    "root": {
      "base": "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
      "rounded": {
        "on": "rounded",
        "off": ""
      },
      "bordered": {
        "on": "border",
        "off": ""
      },
      "inner": {
        "base": "mx-auto flex flex-wrap items-center justify-between",
        "fluid": {
          "on": "",
          "off": "container"
        }
      }
    },
    "brand": {
      "base": "flex items-center"
    },
    "collapse": {
      "base": "w-1/2 md:block md:w-auto z-10 rounded-md top-16 bg-white md:inherit md:top-0 md:bg-transparent",
      "list": "p-2 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      "hidden": {
        "on": "hidden",
        "off": ""
      }
    },
    "link": {
      "base": "block py-2 pr-4 pl-3 md:p-0 text-base rounded-md",
      "active": {
        "on": "bg-purple-600 md:bg-transparent",
        "off": "border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-purple-600 md:border-0 md:hover:bg-transparent md:hover:text-purple-600 md:dark:hover:bg-transparent md:dark:hover:text-purple-600"
      },
      "disabled": {
        "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        "off": ""
      },
    },
    "toggle": {
      "base": "inline-flex items-center rounded-lg p-1 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      "icon": "h-6 w-6 shrink-0"
    }
  },
  accordion: {
    "root": {
      "base": "divide-y divide-gray-200 border-gray-200",
      "flush": {
        "off": "rounded-lg border",
        "on": "border-b"
      }
    },
    "content": {
      "base": "py-5 px-5 last:rounded-b-lg first:rounded-t-lg "
    },
    "title": {
      "arrow": {
        "base": " w-6 shrink-0 bg-transparent",
        "open": {
          "off": "",
          "on": "rotate-180"
        }
      },
      "base": "flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-gray-500",
      "flush": {
        "off": "",
        "on": ""
      },
      "heading": "",
      "open": {
        "off": "",
        "on": "text-gray-900 bg-gray-100"
      }
    }
  },
  pagination : {
    "base": "",
    "layout": {
      "table": {
        "base": "text-sm text-gray-700 dark:text-gray-400",
        "span": "font-semibold text-gray-900 dark:text-white"
      }
    },
    "pages": {
      "base": "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      "showIcon": "inline-flex",
      "previous": {
        "base": "ml-0 rounded-l-lg bg-blue-950 py-2 px-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700",
        "icon": "h-5 w-5"
      },
      "next": {
        "base": "rounded-r-lg bg-blue-950 py-2 px-2 leading-tight text-gray-300 enabled:hover:bg-gray-100 enabled:hover:text-gray-700",
        "icon": "h-5 w-5"
      },
      "selector": {
        "base": "w-8 sm:w-12 bg-blue-950 py-2 leading-tight text-gray-300 enabled:hover:bg-gray-100 enabled:hover:text-gray-700",
        "active": "bg-gray-100 text-gray-700 hover:bg-cyan-100 hover:text-cyan-700",
        "disabled": "opacity-50 cursor-normal"
      }
    }
  }
};
