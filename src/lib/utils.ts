import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Remove the Supabase import
// import { createClient } from "@supabase/supabase-js"

// Remove the supabaseClient initialization if it's present
// export const supabaseClient = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// )

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (string: string) => {
  return string.slice(0, 60) + "...";
};

export const validateURLString = (url: string) => {
  const youtubeRegex = new RegExp("www.youtube.com");

  if (youtubeRegex.test(url)) {
    return {
      url,
      type: "YOUTUBE",
    };
  } else {
    return {
      url: undefined,
      type: "IMAGE",
    };
  }
};
