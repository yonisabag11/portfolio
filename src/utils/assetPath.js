// Helper to get the correct asset path for GitHub Pages
export function getAssetPath(path) {
  const base = import.meta.env.BASE_URL || '/'
  // Remove leading slash from path if it exists
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Combine base with path, ensuring no double slashes
  return base + cleanPath
}
