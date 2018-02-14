export default (baseUrl, width, height) => {
  let url = `https:${baseUrl}`;

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
