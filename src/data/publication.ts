// Set the official URL and published: true together when the preprint is released.
export const arxivPublication = {
  url: "https://arxiv.org/abs/0000.00000",
  published: false,
};

export function isArxivPublished(destination = arxivPublication.url) {
  if (!arxivPublication.published || destination !== arxivPublication.url) return false;
  try {
    const url = new URL(destination);
    return url.protocol === "https:" && url.hostname === "arxiv.org" &&
      !url.username && !url.password && url.pathname.startsWith("/abs/") &&
      url.pathname !== "/abs/0000.00000";
  } catch { return false; }
}
