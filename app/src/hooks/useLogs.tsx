import { useDojo } from "@/dojo/useDojo";
import { Event } from "@/dojo/events";
import {
  parseBuiltEvent,
  createBuiltLog,
  parseScoredEvent,
  createScoredLog,
  createDiscardedLog,
  parseDiscardedEvent,
  parseGameOverEvent,
  createGameOverLog,
} from "@/utils/events";
import { useEffect, useRef, useState } from "react";
import { Subscription } from "rxjs";
import { useQueryParams } from "@/hooks/useQueryParams";
import { BUILT_EVENT, SCORED_EVENT, DISCARDED_EVENT } from "@/constants/events";
import { ec } from "starknet";

export type BuiltLog = {
  id: string;
  gameId: number;
  tileId: number;
  tileX: number;
  tileY: number;
  playerId: string;
  playerName: string;
  playerColor: string;
  timestamp: Date;
};

export type ScoredLog = {
  id: string;
  gameId: number;
  tileId: number;
  tileX: number;
  tileY: number;
  playerId: string;
  playerName: string;
  playerColor: string;
  orderId: number;
  score: number;
  timestamp: Date;
};

export type DiscardedLog = {
  id: string;
  gameId: number;
  tileId: number;
  playerId: string;
  playerName: string;
  playerColor: string;
  orderId: number;
  score: number;
  timestamp: Date;
};

export type Log = {
  id: string;
  timestamp: Date;
  category: string;
  builder: string;
  color: string;
  log: string;
};

const generateLogFromEvent = (event: Event): Log => {
  if (event.keys[0] === BUILT_EVENT) {
    return createBuiltLog(parseBuiltEvent(event));
  } else if (event.keys[0] === SCORED_EVENT) {
    return createScoredLog(parseScoredEvent(event));
  } else if (event.keys[0] === DISCARDED_EVENT) {
    return createDiscardedLog(parseDiscardedEvent(event));
  } else if (
    event.keys[0] ===
    ec.starkCurve.poseidonHashMany([BigInt("GameOver")]).toString()
  ) {
    return createGameOverLog(parseGameOverEvent(event));
  }
  throw new Error("Unknown event type");
};

export const useLogs = () => {
  const { gameId } = useQueryParams();
  const [logs, setLogs] = useState<Log[]>([]);
  const subscribedRef = useRef(false);

  const {
    setup: {
      contractEvents: { createEvents, queryEvents },
    },
  } = useDojo();

  useEffect(() => {
    // Query all existing logs from the db
    const query = async () => {
      const gameIdString = `0x${gameId.toString(16)}`;
      const builtEvents = await queryEvents([BUILT_EVENT, gameIdString]);
      const scoredEvents = await queryEvents([SCORED_EVENT, gameIdString]);
      const discardedEvents = await queryEvents([
        DISCARDED_EVENT,
        gameIdString,
      ]);
      setLogs((prevLogs) => [
        ...prevLogs,
        ...builtEvents.map(generateLogFromEvent),
        ...scoredEvents.map(generateLogFromEvent),
        ...discardedEvents.map(generateLogFromEvent),
      ]);
    };

    query();

    // Check if already subscribed to prevent duplication due to HMR
    if (!subscribedRef.current) {
      console.log("Subscribing to logs");
      subscribedRef.current = true; // Mark as subscribed
      const subscriptions: Subscription[] = [];

      const subscribeToEvents = async () => {
        const gameIdString = `0x${gameId.toString(16)}`;
        const builtObservable = await createEvents([BUILT_EVENT, gameIdString]);
        subscriptions.push(
          builtObservable.subscribe(
            (event) =>
              event &&
              setLogs((prevLogs) => [...prevLogs, generateLogFromEvent(event)])
          )
        );
        const scoredObservable = await createEvents([
          SCORED_EVENT,
          gameIdString,
        ]);
        subscriptions.push(
          scoredObservable.subscribe(
            (event) =>
              event &&
              setLogs((prevLogs) => [...prevLogs, generateLogFromEvent(event)])
          )
        );
        const discardedObservable = await createEvents([
          DISCARDED_EVENT,
          gameIdString,
        ]);
        subscriptions.push(
          discardedObservable.subscribe(
            (event) =>
              event &&
              setLogs((prevLogs) => [...prevLogs, generateLogFromEvent(event)])
          )
        );
      };

      subscribeToEvents();

      // Cleanup function to unsubscribe
      return () => {
        subscriptions.forEach((sub) => sub.unsubscribe());
        console.log("Unsubscribed from logs");
        subscribedRef.current = false;
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Remove duplicates
  const dedupedLogs = logs.filter(
    (log, idx) => idx === logs.findIndex((l) => l.id === log.id)
  );
  const sortedLogs = dedupedLogs.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );
  return { logs: sortedLogs };
};
