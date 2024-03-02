/* Autogenerated file. Do not edit manually. */

import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<
  ReturnType<typeof defineContractComponents>
>;

export function defineContractComponents(world: World) {
  return {
    Builder: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          player_id: RecsType.BigInt,
          order: RecsType.Number,
          score: RecsType.Number,
          tile_id: RecsType.Number,
          characters: RecsType.Number,
          claimed: RecsType.BigInt,
        },
        {
          metadata: {
            name: "Builder",
            types: ["u32", "felt252", "u8", "u32", "u32", "u8", "felt252"],
            customTypes: [],
          },
        }
      );
    })(),
    Character: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          player_id: RecsType.BigInt,
          index: RecsType.Number,
          tile_id: RecsType.Number,
          spot: RecsType.Number,
          weight: RecsType.Number,
          power: RecsType.Number,
        },
        {
          metadata: {
            name: "Character",
            types: ["u32", "felt252", "u8", "u32", "u8", "u8", "u8"],
            customTypes: [],
          },
        }
      );
    })(),
    CharacterPosition: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          tile_id: RecsType.Number,
          spot: RecsType.Number,
          player_id: RecsType.BigInt,
          index: RecsType.Number,
        },
        {
          metadata: {
            name: "CharacterPosition",
            types: ["u32", "u32", "u8", "felt252", "u8"],
            customTypes: [],
          },
        }
      );
    })(),
    Game: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.Number,
          name: RecsType.BigInt,
          host: RecsType.BigInt,
          tiles: RecsType.BigInt,
          tile_count: RecsType.Number,
          start_time: RecsType.Number,
          duration: RecsType.Number,
          prize: RecsType.BigInt,
          score: RecsType.Number,
        },
        {
          metadata: {
            name: "Game",
            types: [
              "u32",
              "felt252",
              "felt252",
              "u128",
              "u32",
              "u64",
              "u64",
              "felt252",
              "u32",
            ],
            customTypes: [],
          },
        }
      );
    })(),
    Player: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.BigInt,
          name: RecsType.BigInt,
          order: RecsType.Number,
          bank: RecsType.Number,
          score: RecsType.Number,
          paved: RecsType.Number,
          master: RecsType.BigInt,
        },
        {
          metadata: {
            name: "Player",
            types: ["felt252", "felt252", "u8", "u8", "u32", "u32", "felt252"],
            customTypes: [],
          },
        }
      );
    })(),
    Team: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          order: RecsType.Number,
          score: RecsType.Number,
          alliance: RecsType.Number,
        },
        {
          metadata: {
            name: "Team",
            types: ["u32", "u8", "u32", "u8"],
            customTypes: [],
          },
        }
      );
    })(),
    Tile: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          id: RecsType.Number,
          player_id: RecsType.BigInt,
          plan: RecsType.Number,
          orientation: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          occupied_spot: RecsType.Number,
        },
        {
          metadata: {
            name: "Tile",
            types: ["u32", "u32", "felt252", "u8", "u8", "u32", "u32", "u8"],
            customTypes: [],
          },
        }
      );
    })(),
    TilePosition: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          x: RecsType.Number,
          y: RecsType.Number,
          tile_id: RecsType.Number,
        },
        {
          metadata: {
            name: "TilePosition",
            types: ["u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        }
      );
    })(),
  };
}
