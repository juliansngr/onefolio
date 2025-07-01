import {
  Briefcase,
  BetweenHorizontalEnd,
  Text,
  User,
  Mail,
} from "lucide-react";

export const getDataScheme = (type) => {
  switch (type) {
    case "about-me":
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
    case "job-experience":
      return {
        title: "",
        jobData: [
          {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
            location: "",
          },
        ],
      };
    case "spacer":
      return {
        height: 5,
        displayLine: true,
      };
    default:
      return {};
  }
};

export const widgetList = [
  {
    type: "about-me",
    name: "About Me",
    description: "Personal introduction and bio",
    icon: <User className="w-4 h-4" />,
  },
  {
    type: "text-and-icons",
    name: "Text and Icons",
    description: "Showcase your work and projects",
    icon: <Text className="w-4 h-4" />,
  },
  {
    type: "job-experience",
    name: "Job Experience",
    description: "Showcase your work experience",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    type: "spacer",
    name: "Spacer",
    description: "Add a space between widgets",
    icon: <BetweenHorizontalEnd className="w-4 h-4" />,
  },
  {
    type: "contact-form",
    name: "Contact Form",
    description: "Let your visitors contact you",
    icon: <Mail className="w-4 h-4" />,
  },
];
