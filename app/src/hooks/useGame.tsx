import { useDojo } from "@/dojo/useDojo";
import { useMemo } from "react";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";

export const useGame = ({ gameId }: { gameId: number }) => {
  const {
    setup: {
      clientModels: {
        models: { Game },
        classes: { Game: GameClass },
      },
    },
  } = useDojo();

  const gameKey = useMemo(
    () => getEntityIdFromKeys([BigInt(gameId)]) as Entity,
    [gameId]
  );
  const component = useComponentValue(Game, gameKey);
  const game = useMemo(() => {
    return component ? new GameClass(component) : null;
  }, [component]);

  return { game, gameKey };
};
