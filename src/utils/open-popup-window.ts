const openPopupWindow = (
  pageURL: string,
  pageTitle: string,
  popupWinWidth: number,
  popupWinHeight: number
) => {
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = 1;
  const left = (width - popupWinWidth) / 2 / systemZoom + dualScreenLeft;
  const top = (height - popupWinHeight) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    pageURL,
    pageTitle,
    `
    scrollbars=yes,
    width=${popupWinWidth / systemZoom},
    height=${popupWinHeight / systemZoom},
    top=${top},
    left=${left}
    `
  );
  if (window.focus && newWindow) newWindow.focus();

  return newWindow;
};

export default openPopupWindow;
