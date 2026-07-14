import videosJson from "./loox-videos.json";
import photosJson from "./loox-photos.json";

export type LooxVideo = {
  id: string;
  reviewer: string;
  rating: number;
  altText: string;
  poster: string;
  preview: string;
  videoDuration: number;
  verified: boolean;
};

export type LooxPhoto = {
  id: string;
  reviewer: string;
  body: string;
  product: string;
  src: string;
  alt: string;
};

export const LOOX_CLIENT_ID = "a5f-qLj-84";

export const LOOX_VIDEOS = videosJson as LooxVideo[];
export const LOOX_PHOTOS = photosJson as LooxPhoto[];
