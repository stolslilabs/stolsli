import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { useDojo } from "@/dojo/useDojo";
import { useComponentValue, useEntityQuery } from "@dojoengine/react";
import {
  Entity,
  Has,
  HasValue,
  NotValue,
  defineEnterSystem,
  defineSystem,
} from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useNavigate } from "react-router-dom";

import { CreateSoloGame } from "@/ui/components/CreateSoloGame";
import { CreateMultiGame } from "@/ui/components/CreateMultiGame";
import { shortString } from "starknet";
import { TournamentDialog, TournamentHeader } from "../components/Tournament";
import { useLobbyStore } from "@/store";

export const Games = () => {
  const { mode, setMode } = useLobbyStore();
  const [games, setGames] = useState<{ [key: number]: typeof Game }>({});
  const [showSingle, setShowSingle] = useState<boolean>(false);
  const [showMulti, setShowMulti] = useState<boolean>(false);
  const {
    account: { account },
    setup: {
      world,
      clientComponents: { Game },
    },
  } = useDojo();

  useMemo(() => {
    defineEnterSystem(world, [Has(Game)], function ({ value: [game] }: any) {
      setGames((prevTiles: any) => {
        return { ...prevTiles, [game.id]: game };
      });
    });
    defineSystem(world, [Has(Game)], function ({ value: [game] }: any) {
      setGames((prevTiles: any) => {
        return { ...prevTiles, [game.id]: game };
      });
    });
  }, []);

  const toggleMode = () => {
    setMode(mode === "single" ? "multi" : "single");
  };

  const filteredSingleGames = useMemo(() => {
    return Object.values(games)
      .filter((game) => game.mode === 1 && (showSingle || game.tile_count < 99))
      .sort((a, b) => b.id - a.id);
  }, [games, showSingle, account]);

  const filteredMultiGames = useMemo(() => {
    return Object.values(games)
      .filter((game) => {
        if (game.player_count === 0) return false;
        if (game.mode !== 2) return false;
        if (showMulti) return true;
        const endtime = game.start_time + game.duration;
        return (
          game.start_time == 0 ||
          game.duration == 0 ||
          endtime > Math.floor(Date.now() / 1000)
        );
      })
      .sort((a, b) => b.id - a.id);
  }, [games, showMulti]);

  const backgroundColor = useMemo(() => "#FCF7E7", []);

  return (
    <div className="bg-yellow-100 h-full grow" style={{ backgroundColor }}>
      <div className="flex flex-col gap-8 items-start w-full p-10 h-full">
        <h1>Game lobby</h1>

        <Tabs
          defaultValue={mode}
          value={mode}
          onValueChange={toggleMode}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="single">Solo</TabsTrigger>
            <TabsTrigger value="multi">Multiplayer</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <div className="flex my-4 gap-4 items-center">
              <CreateSoloGame />
              <TournamentDialog />
              <TournamentHeader />
            </div>

            <div className="flex justify-between w-full">
              <h4>Games</h4>
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-finished"
                  checked={showSingle}
                  onCheckedChange={() => setShowSingle(!showSingle)}
                />
                <Label className="text-xs" htmlFor="show-finished">
                  Show finished Games
                </Label>
              </div>
            </div>
            <ScrollArea className="h-1/2 w-full">
              <Table>
                <TableHeader>
                  <TableRow className="text-sm">
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Tiles played</TableHead>
                    <TableHead>Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(filteredSingleGames).map((game, index) => {
                    return <GameSingleRow key={index} game={game} />;
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="multi">
            <div className="my-4">
              <CreateMultiGame />{" "}
            </div>
            <div className="flex justify-between w-full">
              <h4>Games</h4>
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-finished"
                  checked={showMulti}
                  onCheckedChange={() => setShowMulti(!showMulti)}
                />
                <Label className="text-xs" htmlFor="show-finished">
                  Show finished Games
                </Label>
              </div>
            </div>
            <ScrollArea className="w-full h-1/2">
              <Table>
                <TableHeader>
                  <TableRow className="text-sm">
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Current players</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Time left</TableHead>
                    <TableHead>Tiles played</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(filteredMultiGames).map((game, index) => {
                    return <GameMultiRow key={index} game={game} />;
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export const GameSingleRow = ({ game }: { game: any }) => {
  const [tilesPlayed, setTilesPlayed] = useState<number>();
  const [score, setScore] = useState<number>();
  const [over, setOver] = useState<boolean>(false);
  const {
    account: { account },
    setup: {
      world,
      clientComponents: { Builder },
    },
  } = useDojo();

  const builderKey = useMemo(
    () => getEntityIdFromKeys([BigInt(game.id), BigInt(account.address)]),
    [game, account]
  );
  const builder = useComponentValue(Builder, builderKey);

  useEffect(() => {
    if (game && builder) {
      setTilesPlayed(game.tile_count);
      setScore(game.score);
      setOver(game.tile_count >= 99);
    }
  }, [game, builder]);

  const navigate = useNavigate();

  const setGameQueryParam = useMemo(() => {
    return (id: string) => {
      navigate("?id=" + id, { replace: true });
    };
  }, [navigate]);

  if (!game || !builder) return null;

  return (
    <TableRow className="text-xs">
      <TableCell>{game.id}</TableCell>
      <TableCell>{tilesPlayed}</TableCell>
      <TableCell>{score}</TableCell>

      <TableCell className="w-12">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => setGameQueryParam(game.id || 0)}
              >
                <FontAwesomeIcon icon={over ? faEye : faRightToBracket} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="select-none">Join the game</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
};

export const GameMultiRow = ({ game }: { game: any }) => {
  const [gameId, setGameId] = useState<number>();
  const [gameName, setGameName] = useState<string>();
  const [playerCount, setPlayerCount] = useState<number>();
  const [startTime, setStartTime] = useState<number>();
  const [duration, setDuration] = useState<number>();
  const [gameDuration, setGameDuration] = useState<string>();
  const [timeLeft, setTimeLeft] = useState<string>();
  const [tilesPlayed, setTilesPlayed] = useState<number>();
  const [over, setOver] = useState<boolean>(false);
  const {
    account: { account },
    setup: {
      clientComponents: { Player, Builder },
    },
  } = useDojo();

  const builders = useEntityQuery([
    Has(Builder),
    HasValue(Builder, { game_id: game?.id }),
    NotValue(Builder, { order: 0 }),
  ]);
  const playerKey = useMemo(
    () => getEntityIdFromKeys([BigInt(account.address)]) as Entity,
    [account]
  );
  const player = useComponentValue(Player, playerKey);
  const builderKey = useMemo(() => {
    if (!game || !player) return undefined;
    return getEntityIdFromKeys([BigInt(game.id), BigInt(player.id)]) as Entity;
  }, [game, player]);
  const builder = useComponentValue(Builder, builderKey);

  useEffect(() => {
    if (game) {
      setGameId(game.id);
      setGameName(shortString.decodeShortString(game.name));
      setStartTime(game.start_time);
      setDuration(game.duration);
      setTilesPlayed(game.tile_count);
      setOver(
        game.start_time !== 0 &&
          game.duration !== 0 &&
          game.start_time + game.duration < Math.floor(Date.now() / 1000)
      );
    }
    setPlayerCount(builders?.length || 0);
  }, [game, builders]);

  // Calculating game duration
  useEffect(() => {
    if (duration) {
      // Calculating hours, minutes, and seconds
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      // Formatting HH:MM:SS
      const formattedTime = `
        ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setGameDuration(formattedTime);
    } else {
      setGameDuration("∞");
    }
  }, [duration]);

  // Calculating time left
  useEffect(() => {
    if (startTime && duration) {
      const interval = setInterval(() => {
        // Remaining time in seconds
        const dt = startTime + duration - Math.floor(Date.now() / 1000);

        // Calculating hours, minutes, and seconds
        const hours = Math.floor(dt / 3600);
        const minutes = Math.floor((dt % 3600) / 60);
        const seconds = dt % 60;

        // Formatting HH:MM:SS
        const formattedTime = `
          ${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        setTimeLeft(formattedTime);

        if (dt < 0) {
          clearInterval(interval);
          setTimeLeft("00:00:00");
        }

        if (duration == 0) {
          clearInterval(interval);
          setTimeLeft("00:00:00");
        }
      }, 1000);
      return () => clearInterval(interval);
    } else if (duration) {
      // Calculating hours, minutes, and seconds
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      const seconds = duration % 60;

      // Formatting HH:MM:SS
      const formattedTime = `
        ${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setTimeLeft(formattedTime);
    } else {
      setTimeLeft("∞");
    }
  }, [startTime, duration]);

  const navigate = useNavigate();

  const setGameQueryParam = useMemo(() => {
    return (id: string) => {
      navigate("?id=" + id, { replace: true });
    };
  }, [navigate]);

  const handleClick = async () => {
    if (!game) return;
    setGameQueryParam(game.id);
  };

  if (!game) return null;

  return (
    <TableRow className="text-xs">
      <TableCell>{gameId}</TableCell>
      <TableCell>{gameName}</TableCell>
      <TableCell>{playerCount}</TableCell>
      <TableCell>{gameDuration}</TableCell>
      <TableCell>{timeLeft}</TableCell>
      <TableCell>{tilesPlayed}</TableCell>

      <TableCell className="w-12">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={"align-right"}
                variant={"secondary"}
                size={"icon"}
                onClick={handleClick}
              >
                <FontAwesomeIcon
                  icon={
                    (builder || game.start_time === 0) && !over
                      ? faRightToBracket
                      : faEye
                  }
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="select-none">Join the game</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
};
