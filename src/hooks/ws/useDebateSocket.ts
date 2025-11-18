"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

type OnMessage = (msg: {
  chatId: string;
  userId: string;
  userNickname: string;
  content: string;
  createdAt: string;
  isBlind: boolean;
  isAnswerTo?: string | null;
}) => void;

export function useDebateSocket(opts: {
  debateId: string | null | undefined;
  enabled?: boolean;
  onMessage?: OnMessage;
  onErrorMessage?: (message: string) => void;
}) {
  const { debateId, enabled = true, onMessage, onErrorMessage } = opts;
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<Client | null>(null);
  const topicSubRef = useRef<StompSubscription | null>(null);
  const errorSubRef = useRef<StompSubscription | null>(null);
  const onMessageRef = useRef<OnMessage | undefined>(onMessage);
  const onErrorMessageRef = useRef<typeof onErrorMessage>(onErrorMessage);

  // Keep latest handlers without re-creating the connection
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);
  useEffect(() => {
    onErrorMessageRef.current = onErrorMessage;
  }, [onErrorMessage]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!enabled || !debateId) return;
    if (!baseUrl) return;

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${baseUrl}/ws`, undefined, {
          transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
        }),
      reconnectDelay: 5000,
      debug: (str: string) => {
        if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
          console.log('[stomp]', str);
        }
      },
      onConnect: () => {
        setConnected(true);
        // 개인 에러 큐 구독
        errorSubRef.current = client.subscribe("/user/queue/errors", (message: IMessage) => {
          try {
            const payload = message.body ? JSON.parse(message.body) : null;
            const text = typeof payload === "string" ? payload : payload?.message ?? "웹소켓 오류가 발생했습니다.";
            onErrorMessageRef.current?.(text);
          } catch {
            onErrorMessageRef.current?.("웹소켓 오류가 발생했습니다.");
          }
        });
        // 토론방 구독
        topicSubRef.current = client.subscribe(`/topic/debate/${debateId}`, (message: IMessage) => {
          // 수신한 STOMP 메시지의 전체 내용을 콘솔에 출력 (개발 환경에서만)
          if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
            try {
              console.groupCollapsed('[stomp] <<< MESSAGE (debate)');
              console.log('Full frame:', message);
              console.log('Headers:', message.headers);
              console.log('Body (raw):', message.body);
              try {
                const parsedForLog = JSON.parse(message.body);
                console.log('Body (parsed):', parsedForLog);
              } catch {
                console.warn('Body is not valid JSON');
              }
              console.groupEnd?.();
            } catch {
              // ignore
            }
          }
          if (!onMessageRef.current) return;
          try {
            const payload = JSON.parse(message.body);
            onMessageRef.current(payload);
          } catch {
            // ignore
          }
        });
      },
      onDisconnect: () => setConnected(false),
      onStompError: () => onErrorMessageRef.current?.("STOMP 오류가 발생했습니다."),
      onWebSocketError: (e?: unknown) => {
        if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
          console.error('[stomp] websocket error', e);
        }
        onErrorMessageRef.current?.("웹소켓 연결에 실패했습니다.");
      },
      onWebSocketClose: (evt?: unknown) => {
        const code = (evt as { code?: number } | undefined)?.code;
        const reason = (evt as { reason?: string } | undefined)?.reason;
        if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
          console.warn('[stomp] websocket closed', { code, reason });
        }
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      try {
        topicSubRef.current?.unsubscribe();
        errorSubRef.current?.unsubscribe();
      } catch {
        // ignore
      }
      topicSubRef.current = null;
      errorSubRef.current = null;
      client.deactivate();
      clientRef.current = null;
      setConnected(false);
    };
  }, [enabled, debateId, baseUrl]);

  const sendChat = useMemo(() => {
    return (content: string, parentDebateChatId?: string | null) => {
      if (!clientRef.current || !connected || !debateId) return;
      const body = JSON.stringify({
        parentDebateChatId: parentDebateChatId ?? null,
        content,
      });
      clientRef.current.publish({
        destination: `/app/debate/${debateId}/send`,
        headers: { 'content-type': 'application/json' },
        body,
      });
    };
  }, [connected, debateId]);

  return { connected, sendChat };
}


