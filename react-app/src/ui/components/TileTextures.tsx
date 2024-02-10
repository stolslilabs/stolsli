import { useState, useEffect, useMemo } from "react";
import { useDojo } from "@/dojo/useDojo";
import { defineSystem, Has, HasValue, NotValue } from "@dojoengine/recs";
import { TileTexture } from "./TileTexture";
import { TileEmpty } from "./TileEmpty";
import { useQueryParams } from "../../hooks/useQueryParams";

type Position = {
  col: number;
  row: number;
};

type Item = {
  tile: any | Position;
  empty: boolean;
};

type Items = {
  [key: string]: Item;
};

export const TileTextures = ({ squareSize }: { squareSize: number }) => {
  const { gameId } = useQueryParams();
  const [items, setItems] = useState<Items>({});

  const {
    setup: {
      world,
      clientComponents: { Tile },
    },
  } = useDojo();

  const offsets = useMemo(
    () => [
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
    ],
    []
  );

  useEffect(() => {
    defineSystem(
      world,
      [
        Has(Tile),
        HasValue(Tile, { game_id: gameId }),
        NotValue(Tile, { orientation: 0 }),
      ],
      ({ value: [tile] }: typeof Tile) => {
        // Create a new item for the tile
        const key = `${tile.game_id}-${tile.x}-${tile.y}`;
        const item: Item = { tile: tile, empty: false };
        const newItems: Items = { [key]: item };

        // Create new items for the surrounding tiles
        offsets.forEach((offset) => {
          const col = tile.x + offset.x;
          const row = tile.y + offset.y;
          const position: Position = { col: col, row: row };
          const key = `${tile.game_id}-${col}-${row}`;

          if (!Object.keys(items).includes(key)) {
            const item: Item = { tile: position, empty: true };
            newItems[key] = item;
          }
        });

        // Merge the new items with the previous items with priority to not empty items
        setItems((prevItems) => {
          const updatedItems = { ...prevItems };
          Object.keys(newItems).forEach((key) => {
            if (
              !Object.keys(updatedItems).includes(key) ||
              !newItems[key].empty
            ) {
              updatedItems[key] = newItems[key];
            }
          });
          return updatedItems;
        });
      }
    );
  }, []);

  return (
    <>
      {Object.keys(items).map((key: string) => {
        const item = items[key];
        if (item.empty) {
          return (
            <TileEmpty
              key={key}
              col={item.tile.col}
              row={item.tile.row}
              size={squareSize}
            />
          );
        } else {
          return <TileTexture key={key} tile={item.tile} size={squareSize} />;
        }
      })}
    </>
  );
};
