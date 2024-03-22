import { HU, GB, DE } from "country-flag-icons/react/3x2";

type FlagParam = {
  lang: string;
};

export default function Flag({ lang }: FlagParam) {
  switch (lang) {
    case "Hu":
      return <HU title="Magyar" className="w-6 inline" />;
      break;
    case "De":
      return <DE title="Nemet" className="w-6 inline" />;
      break;
    case "Gb":
      return <GB title="Angol" className="w-6 inline" />;
      break;
    default:
      return <HU title="Magyar" className="w-6 inline" />;
  }
}
