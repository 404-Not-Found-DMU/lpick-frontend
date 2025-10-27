/**
 * 환영 모달 관련 타입 정의
 */

export interface WelcomeModalUserInfo {
  nickname: string;
  profile: string;
  about: string;
}

export interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: WelcomeModalUserInfo | null;
  onTakeLPTI: () => void;
}

export interface UseWelcomeModalReturn {
  isModalOpen: boolean;
  closeModal: () => void;
  handleTakeLPTI: () => void;
  userInfo: WelcomeModalUserInfo | null;
}