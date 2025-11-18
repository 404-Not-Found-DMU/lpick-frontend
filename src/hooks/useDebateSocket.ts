"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Client, IMessage, IFrame, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type SockJsExtendedOptions = NonNullable<ConstructorParameters<typeof SockJS>[2]> & {
  withCredentials?: boolean;
  transportOptions?: Record<string, unknown>;
};

export interface DebateInboundMessage {
  chatId: string;
  userId: string; // JWT subject와 비교용
  userNickname: string;
  content: string;
  createdAt: string;
  isBlind: boolean;
  isAnswerTo?: string | null;
}

export interface SendDebateMessageInput {
  content: string;
  parentDebateChatId?: string | null;
}

export interface UseDebateSocketOptions {
  enabled?: boolean;
  debug?: boolean;
}

export interface UseDebateSocketResult {
  isConnected: boolean;
  messages: DebateInboundMessage[];
  latestError?: string;
  sendMessage: (input: SendDebateMessageInput) => void;
}

export function useDebateSocket(
  debateId: string,
  options: UseDebateSocketOptions = {},
): UseDebateSocketResult {
  const { enabled = true, debug = false } = options;
  const clientRef = useRef<Client | null>(null);
  const debateSubRef = useRef<StompSubscription | null>(null);
  const errorSubRef = useRef<StompSubscription | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<DebateInboundMessage[]>([]);
  const [latestError, setLatestError] = useState<string | undefined>();

  const wsUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return undefined;
    return `${base}/ws`;
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (!wsUrl) return;

    const sockOptions: SockJsExtendedOptions = { withCredentials: true };
    const webSocketFactory = () => new SockJS(wsUrl, undefined, sockOptions);

    const client = new Client({
      webSocketFactory,
      reconnectDelay: 5000,
      debug: debug ? (str: string) => console.log("[STOMP]", str) : undefined,
    });

    client.onConnect = () => {
      setIsConnected(true);

      // 1) 에러 큐 구독 (개인 큐)
      errorSubRef.current = client.subscribe("/user/queue/errors", (frame: IMessage) => {
        try {
          const payload = frame.body ? JSON.parse(frame.body) : undefined;
          const message: string = payload?.message || payload?.error || frame.body || "Unknown error";
          setLatestError(message);
          if (debug) console.warn("[WS ERROR]", message, payload);
        } catch {
          setLatestError(frame.body);
          if (debug) console.warn("[WS ERROR]", frame.body);
        }
      });

      // 2) 토론방 구독 (OPEN 상태일 때만 외부에서 enabled=true로 호출)
      debateSubRef.current = client.subscribe(`/topic/debate/${debateId}` as const, (frame: IMessage) => {
        try {
          const data = JSON.parse(frame.body) as DebateInboundMessage;
          setMessages((prev) => [...prev, data]);
        } catch (e) {
          if (debug) console.error("[WS PARSE FAIL]", e, frame.body);
        }
      });
    };

    client.onStompError = (frame: IFrame) => {
      const detail = frame.headers["message"] || frame.body || "STOMP error";
      setLatestError(detail);
      if (debug) console.error("[STOMP ERROR]", frame.headers, frame.body);
    };

    client.onWebSocketClose = () => {
      setIsConnected(false);
    };

    clientRef.current = client;
    client.activate();

    return () => {
      try {
        debateSubRef.current?.unsubscribe();
      } catch {}
      try {
        errorSubRef.current?.unsubscribe();
      } catch {}
      debateSubRef.current = null;
      errorSubRef.current = null;

      client.deactivate();
      clientRef.current = null;
    };
  }, [wsUrl, debateId, enabled, debug]);

  const sendMessage = useCallback(
    (input: SendDebateMessageInput) => {
      const c = clientRef.current;
      if (!c || !isConnected) return;
      const body = JSON.stringify({
        parentDebateChatId: input.parentDebateChatId ?? null,
        content: input.content,
      });
      c.publish({ destination: `/app/debate/${debateId}`, body });
    },
    [debateId, isConnected],
  );

  return { isConnected, messages, latestError, sendMessage };
}


