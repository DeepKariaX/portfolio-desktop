import type { MetaTagsProps } from "svelte-meta-tags";

const DESCRIPTION = "Deep Karia's interactive portfolio desktop environment.";

export const prerender = true;

export const load = ({ url }: any) => {
  const baseMetaTags = Object.freeze({
    title: "Deep Karia Portfolio",
    description: DESCRIPTION,
    canonical: new URL(url.pathname, url.origin).href,
    openGraph: {
      type: "website",
      url: new URL(url.pathname, url.origin).href,
      locale: "en_US",
      title: "Deep Karia Portfolio",
      description: DESCRIPTION,
      siteName: "Deep Karia Portfolio",
      images: [
        {
          url: "https://desktop.deepkaria.dev/og/index.png",
        },
      ],
    },
  }) satisfies MetaTagsProps;

  return {
    baseMetaTags,
  };
};
