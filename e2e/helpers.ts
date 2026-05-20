export function pagePath(path: string) {
  return new RegExp(`${path.replace(/\//g, '\\/')}/?$`);
}

