const sizes = {
  original: "original",
  780: "w780",
  500: "w500",
  342: "w342",
  185: "w185",
  154: "w154",
  92: "w92",
} as const;

type PosterSizes = keyof typeof sizes;

export const getPosterSrc = (fileName: string, size: PosterSizes) => {
  return `${process.env.REACT_APP_API_POSTER_URL}/${sizes[size]}${fileName}`;
};
