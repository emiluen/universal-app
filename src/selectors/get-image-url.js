export default (baseUrl, dimensions) => {
  let url = `https:${baseUrl}`;

  if (!dimensions) return url;

  const { width, height } = dimensions;

  if (width || height) {
    url += '?';
    url += width ? `w=${width}` : '';

    if (width && height) {
      url += '&';
    }

    url += height ? `h=${height}` : '';
  }

  return url;
};
