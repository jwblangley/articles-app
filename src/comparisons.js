export function noComparison(a, b) {
  return 0;
}

export function viewsComparison(a, b) {
  return a.views - b.views;
}

export function titleComparison(a, b) {
  return a.title.localeCompare(b.title);
}
