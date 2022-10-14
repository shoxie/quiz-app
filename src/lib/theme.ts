import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("#575279", "#e0def4")(props),
      bg: mode("#faf4ed", "#232136")(props),
    },
  }),
};

const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: (props: any) => ({
      dialog: {
        bg: mode("white", "#141214")(props),
      },
    }),
  },
};

const theme = extendTheme({
  components,
  styles,
});

export default theme;

// const theme = extendTheme({
//   colors: {
//     linen: "#fdf0e9",
//     pink: {
//       400: "#E7677E",
//     },
//     gray: {
//       900: "#111111",
//     },
//   },
//   fonts: {
//     body: "futura-pt",
//     heading: "futura-pt",
//     primary: "futura-pt",
//     secondary: "Cormorant Garamond",
//   },
//   components: {
//     Button: {
//       baseStyle: {
//         fontWeight: "normal",
//         borderRadius: 0,
//       },
//     },
//     Checkbox: {
//       baseStyle: {
//         control: {
//           border: "0px",
//           bg: "transparent",
//           _checked: {
//             bg: "transparent"
//           },
//           _focus: {
//             bg: "transparent"
//           },
//           _hover: {
//             bg: "transparent"
//           },
//         }
//       }
//     }
//   },
// });

// export default theme;
// export { theme };
