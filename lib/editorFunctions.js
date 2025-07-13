import {
  Briefcase,
  BetweenHorizontalEnd,
  Text,
  User,
  Mail,
  PanelTopDashed,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Zap,
  FileStack,
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

export const getImageSettings = (type) => {
  switch (type) {
    case "featured-projects":
      return {
        aspectW: 16,
        aspectH: 9,
        targetW: 500,
        targetH: 281,
      };
    case "hero":
      return {
        aspectW: 1,
        aspectH: 1,
        targetW: 300,
        targetH: 300,
      };
    case "about-me":
      return {
        aspectW: 1,
        aspectH: 1,
        targetW: 300,
        targetH: 300,
      };
    default:
      return {};
  }
};

export const getIcon = (type) => {
  switch (type) {
    case "about-me":
      return <User className="w-4 h-4" />;
    case "hero":
      return <User className="w-4 h-4" />;
    case "text-and-icons":
      return <Text className="w-4 h-4" />;
    case "job-experience":
      return <Briefcase className="w-4 h-4" />;
    case "contact-form":
      return <Mail className="w-4 h-4" />;
    case "spacer":
      return <BetweenHorizontalEnd className="w-4 h-4" />;
    case "header":
      return <PanelTopDashed className="w-4 h-4" />;
    case "github":
      return <Github className="w-4 h-4" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4" />;
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "globe":
      return <Globe className="w-4 h-4" />;
    case "tags":
      return <Zap className="w-4 h-4" />;
    case "featured-projects":
      return <FileStack className="w-4 h-4" />;
  }
};
