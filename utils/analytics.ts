export const trackClick = (elementId: string, additionalData?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && 'zaraz' in window) {
      (window as any).zaraz.track('click', {
        element_id: elementId,
        ...additionalData,
      });
      console.log(`[Analytics: Click] Tracked via Zaraz: ${elementId}`);
    } else {
      console.log(`[Analytics: Click] Local Log: ${elementId}`, additionalData || {});
    }
  } catch (error) {
    console.error('Failed to track click event', error);
  }
};

export const trackDownload = (fileName: string, platform?: string, additionalData?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && 'zaraz' in window) {
      (window as any).zaraz.track('download', {
        file_name: fileName,
        platform: platform,
        ...additionalData,
      });
      console.log(`[Analytics: Download] Tracked via Zaraz: ${fileName}`);
    } else {
      console.log(`[Analytics: Download] Local Log: ${fileName} (${platform})`, additionalData || {});
    }
  } catch (error) {
    console.error('Failed to track download event', error);
  }
};
