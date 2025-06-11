export const getDataScheme = (type) => {
  switch (type) {
    case "profile-header":
      return {
        name: "",
        description: "",
        files: [],
      };
    case "text-and-icons":
      return {
        description: "",
        iconData: [
          {
            alt: "",
            description: "",
            link: "",
            tooltip: "",
          },
          {
            alt: "",
            description: "",
            link: "",
            tooltip: "",
          },
          {
            alt: "",
            description: "",
            link: "",
            tooltip: "",
          },
        ],
        files: [],
      };
    default:
      return {};
  }
};
