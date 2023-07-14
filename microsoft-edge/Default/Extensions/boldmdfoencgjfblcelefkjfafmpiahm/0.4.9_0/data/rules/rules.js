var website = {
  "total": {
    "themes": {
      "number": 41
    }
  },
  "theme": {
    "number": {
      "custom": 38,
      "native": 41,
      "active": null
    }
  },
  "exclude": {
    "from": {
      "custom": {
        "dark": {
          "mode": [
            "maps",
            "amazon",
            "youtube",
            "facebook"
          ]
        }
      }
    }
  },
  "custom": {
    "compatible": [
      "google",
      "support",
      "accounts",
      "translate",
      "myaccount"
    ],
    "native": {
      "css": {
        "variables": {
          "--native-dark-opacity": "0.85",
          "--native-dark-bg-color": "#292929",
          "--native-dark-text-shadow": "none",
          "--native-dark-font-color": "#dcdcdc",
          "--native-dark-link-color": "#8db2e5",
          "--native-dark-cite-color": "#92de92",
          "--native-dark-fill-color": "#7d7d7d",
          "--native-dark-accent-color": "#a9a9a9",
          "--native-dark-border-color": "#555555",
          "--native-dark-visited-link-color": "#c76ed7",
          "--native-dark-transparent-color": "transparent",
          "--native-dark-bg-image-color": "rgba(0, 0, 0, 0.10)",
          "--native-dark-box-shadow": "0 0 0 1px rgb(255 255 255 / 10%)",
          "--native-dark-bg-image-filter": "brightness(50%) contrast(200%)"
        },
        "rules":`
          :root {
            color-scheme: dark;
            accent-color: var(--native-dark-accent-color);
          }
          
          html a:visited, 
          html a:visited > * {
            color: var(--native-dark-visited-link-color) !important;
          }
          
          a[ping]:link,
          a[ping]:link > *,
          :link:not(cite) {
            color: var(--native-dark-link-color) !important;
          }
          
          html cite,
          html cite a:link,
          html cite a:visited {
            color: var(--native-dark-cite-color) !important;
          }
          
          img,
          image,
          figure:empty {
            opacity: var(--native-dark-opacity) !important;
          }
        `
      }
    },
    "regex": {
      "rules": {
        "twitch": "^http(s)?\:\/\/(www\.)?twitch\.tv",
        "bing": "^http(s)?\:\/\/(www\.)?bing\.([a-zA-Z]+)",
        "reddit": "^http(s)?\:\/\/(www\.)?reddit\.([a-zA-Z]+)",
        "amazon": "^http(s)?\:\/\/(www\.)?amazon\.([a-zA-Z]+)",
        "github": "^http(s)?\:\/\/(www\.)?github\.([a-zA-Z]+)",
        "tumblr": "^http(s)?\:\/\/(www\.)?tumblr\.([a-zA-Z]+)",
        "youtube": "^http(s)?\:\/\/(www\.)?youtube\.([a-zA-Z]+)",
        "dropbox": "^http(s)?\:\/\/(www\.)?dropbox\.([a-zA-Z]+)",
        "twitter": "^http(s)?\:\/\/(www\.)?twitter\.([a-zA-Z]+)",
        "ebay": "^http(s)?\:\/\/([a-zA-Z.]*\.)?ebay\.([a-zA-Z]+)",
        "play": "^http(s)?\:\/\/(www\.)?play\.google\.([a-zA-Z]+)",
        "facebook": "^http(s)?\:\/\/(www\.)?facebook\.([a-zA-Z]+)",
        "maps": "^http(s)?\:\/\/(www\.)?google\.([a-zA-Z]+)\/maps",
        "docs": "^http(s)?\:\/\/(www\.)?docs\.google\.([a-zA-Z]+)",
        "wikipedia": "^http(s)?\:\/\/([a-zA-Z.]*\.)?wikipedia\.org",
        "yahoo": "^http(s)?\:\/\/([a-zA-Z.]*\.)?yahoo\.([a-zA-Z]+)",
        "gmail": "^http(s)?\:\/\/(www\.)?mail\.google\.([a-zA-Z]+)",
        "drive": "^http(s)?\:\/\/(www\.)?drive\.google\.([a-zA-Z]+)",
        "sites": "^http(s)?\:\/\/(www\.)?sites\.google\.([a-zA-Z]+)",
        "instagram": "^http(s)?\:\/\/(www\.)?instagram\.([a-zA-Z]+)",
        "w3schools": "^http(s)?\:\/\/(www\.)?w3schools\.([a-zA-Z]+)",
        "yandex": "^http(s)?\:\/\/([a-zA-Z.]*\.)?yandex\.([a-zA-Z]+)",
        "duckduckgo": "^http(s)?\:\/\/(www\.)?duckduckgo\.([a-zA-Z]+)",
        "telegram": "^http(s)?\:\/\/(www\.)?web\.telegram\.([a-zA-Z]+)",
        "whatsapp": "^http(s)?\:\/\/(www\.)?web\.whatsapp\.([a-zA-Z]+)",
        "support": "^http(s)?\:\/\/(www\.)?support\.google\.([a-zA-Z]+)",
        "accounts": "^http(s)?\:\/\/(www\.)?accounts\.google\.([a-zA-Z]+)",
        "calendar": "^http(s)?\:\/\/(www\.)?calendar\.google\.([a-zA-Z]+)",
        "myaccount": "^http(s)?\:\/\/(www\.)?myaccount\.google\.([a-zA-Z]+)",
        "stackoverflow": "^http(s)?\:\/\/(www\.)?stackoverflow\.([a-zA-Z]+)",
        "translate": "^http(s)?\:\/\/(www\.)?translate\.google\.([a-zA-Z]+)",
        "google": "^http(s)?\:\/\/(www\.)?google\.([a-zA-Z]+)\/(search|travel|flights)"
      }
    }
  },
  "color": {
    "names": [
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkgrey",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkslategrey",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "green",
      "greenyellow",
      "grey",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightgrey",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightslategrey",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "rebeccapurple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "slategrey",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen"
    ]
  }
};