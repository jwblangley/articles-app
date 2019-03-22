// Default ordering.
export function noComparison(a, b) {
  return 0;
}

// Order by number of views.
export function viewsComparison(a, b) {
  return a.views - b.views;
}

// Order alphabetically by title.
export function titleComparison(a, b) {
  return a.title.localeCompare(b.title);
}
