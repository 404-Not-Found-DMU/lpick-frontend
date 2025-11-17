/**
 * 이미지 검색 API
 */

export type ImageSearchResult = {
  wikiId: string;
  albumId: string;
  name: string;
  similarity: number;
  distance: number;
  imageUrl: string;
};

/**
 * 이미지 파일을 업로드하여 앨범을 검색합니다.
 * @param file 이미지 파일
 * @returns 검색 결과 배열
 */
export const searchAlbumByImage = async (file: File): Promise<ImageSearchResult[]> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!baseUrl) {
      throw new Error('API Base URL이 설정되지 않았습니다.');
    }
    
    const response = await fetch(`${baseUrl}/api/v1/public/data/search/album/image`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      // FormData는 Content-Type을 자동으로 설정하므로 headers에 포함하지 않음
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('이미지 검색 API 호출 오류:', error);
    throw error;
  }
};

/**
 * Blob URL을 File 객체로 변환합니다.
 * @param blobUrl Blob URL
 * @param filename 파일명 (기본값: 'image.jpg')
 * @returns File 객체
 */
export const blobUrlToFile = async (blobUrl: string, filename: string = 'image.jpg'): Promise<File> => {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type || 'image/jpeg' });
  } catch (error) {
    console.error('Blob URL을 File로 변환하는 중 오류 발생:', error);
    throw error;
  }
};

