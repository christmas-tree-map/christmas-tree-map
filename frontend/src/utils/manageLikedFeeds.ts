export const manageLikedFeeds = (treeId: number, feedId: number) => {
  const likedFeeds = localStorage.getItem('liked_feeds');
  const parsedFeeds = likedFeeds ? JSON.parse(likedFeeds) : {};

  if (!parsedFeeds[treeId]) {
    parsedFeeds[treeId] = [];
  }

  if (!parsedFeeds[treeId].includes(feedId)) {
    parsedFeeds[treeId].push(feedId);
  } else {
    parsedFeeds[treeId] = parsedFeeds[treeId].filter((id: number) => id !== feedId);
  }

  localStorage.setItem('liked_feeds', JSON.stringify(parsedFeeds));
};
