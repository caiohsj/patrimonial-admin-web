export function useWebView() {
  const isWebView = (): boolean => {
    return window.navigator.userAgent.includes('PatrimonialApp');
  };

  return { isWebView };
};
