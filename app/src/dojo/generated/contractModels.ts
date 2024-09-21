// Generated by dojo-bindgen on Thu, 19 Sep 2024 17:13:23 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript`
import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<
  ReturnType<typeof defineContractComponents>
>;

// Type definition for `dojo::model::layout::Layout` enum
export type Layout =
  | { type: "Fixed"; value: RecsType.NumberArray }
  | { type: "Struct"; value: RecsType.StringArray }
  | { type: "Tuple"; value: RecsType.StringArray }
  | { type: "Array"; value: RecsType.StringArray }
  | { type: "ByteArray" }
  | { type: "Enum"; value: RecsType.StringArray };

export const LayoutDefinition = {
  type: RecsType.String,
  value: RecsType.String,
};

// Type definition for `paved::models::index::Builder` struct
export interface Builder {
  game_id: Number;
  player_id: BigInt;
  tile_id: Number;
  characters: Number;
}
export const BuilderDefinition = {
  game_id: RecsType.Number,
  player_id: RecsType.BigInt,
  tile_id: RecsType.Number,
  characters: RecsType.Number,
};

// Type definition for `core::byte_array::ByteArray` struct
export interface ByteArray {
  data: String[];
  pending_word: BigInt;
  pending_word_len: Number;
}
export const ByteArrayDefinition = {
  data: RecsType.StringArray,
  pending_word: RecsType.BigInt,
  pending_word_len: RecsType.Number,
};

// Type definition for `dojo::model::layout::FieldLayout` struct
export interface FieldLayout {
  selector: BigInt;
  layout: Layout;
}
export const FieldLayoutDefinition = {
  selector: RecsType.BigInt,
  layout: LayoutDefinition,
};

// Type definition for `paved::models::index::Char` struct
export interface Char {
  game_id: Number;
  player_id: BigInt;
  index: Number;
  tile_id: Number;
  spot: Number;
  weight: Number;
  power: Number;
}
export const CharDefinition = {
  game_id: RecsType.Number,
  player_id: RecsType.BigInt,
  index: RecsType.Number,
  tile_id: RecsType.Number,
  spot: RecsType.Number,
  weight: RecsType.Number,
  power: RecsType.Number,
};

// Type definition for `paved::models::index::CharPosition` struct
export interface CharPosition {
  game_id: Number;
  tile_id: Number;
  spot: Number;
  player_id: BigInt;
  index: Number;
}
export const CharPositionDefinition = {
  game_id: RecsType.Number,
  tile_id: RecsType.Number,
  spot: RecsType.Number,
  player_id: RecsType.BigInt,
  index: RecsType.Number,
};

// Type definition for `paved::models::index::Game` struct
export interface Game {
  id: Number;
  over: Boolean;
  discarded: Number;
  built: Number;
  tiles: BigInt;
  tile_count: Number;
  start_time: Number;
  end_time: Number;
  score: Number;
  seed: BigInt;
  mode: Number;
  tournament_id: Number;
}
export const GameDefinition = {
  id: RecsType.Number,
  over: RecsType.Boolean,
  discarded: RecsType.Number,
  built: RecsType.Number,
  tiles: RecsType.BigInt,
  tile_count: RecsType.Number,
  start_time: RecsType.Number,
  end_time: RecsType.Number,
  score: RecsType.Number,
  seed: RecsType.BigInt,
  mode: RecsType.Number,
  tournament_id: RecsType.Number,
};

// Type definition for `paved::models::index::Player` struct
export interface Player {
  id: BigInt;
  name: BigInt;
  master: BigInt;
}
export const PlayerDefinition = {
  id: RecsType.BigInt,
  name: RecsType.BigInt,
  master: RecsType.BigInt,
};

// Type definition for `paved::models::index::Tile` struct
export interface Tile {
  game_id: Number;
  id: Number;
  player_id: BigInt;
  plan: Number;
  orientation: Number;
  x: Number;
  y: Number;
  occupied_spot: Number;
}
export const TileDefinition = {
  game_id: RecsType.Number,
  id: RecsType.Number,
  player_id: RecsType.BigInt,
  plan: RecsType.Number,
  orientation: RecsType.Number,
  x: RecsType.Number,
  y: RecsType.Number,
  occupied_spot: RecsType.Number,
};

// Type definition for `paved::models::index::TilePosition` struct
export interface TilePosition {
  game_id: Number;
  x: Number;
  y: Number;
  tile_id: Number;
}
export const TilePositionDefinition = {
  game_id: RecsType.Number,
  x: RecsType.Number,
  y: RecsType.Number,
  tile_id: RecsType.Number,
};

// Type definition for `paved::models::index::Tournament` struct
export interface Tournament {
  id: Number;
  prize: BigInt;
  top1_player_id: BigInt;
  top2_player_id: BigInt;
  top3_player_id: BigInt;
  top1_score: Number;
  top2_score: Number;
  top3_score: Number;
  top1_claimed: Boolean;
  top2_claimed: Boolean;
  top3_claimed: Boolean;
}
export const TournamentDefinition = {
  id: RecsType.Number,
  prize: RecsType.BigInt,
  top1_player_id: RecsType.BigInt,
  top2_player_id: RecsType.BigInt,
  top3_player_id: RecsType.BigInt,
  top1_score: RecsType.Number,
  top2_score: RecsType.Number,
  top3_score: RecsType.Number,
  top1_claimed: RecsType.Boolean,
  top2_claimed: RecsType.Boolean,
  top3_claimed: RecsType.Boolean,
};

export function defineContractComponents(world: World) {
  return {
    // Model definition for `paved::models::index::Builder` model
    Builder: (() => {
      return defineComponent(
        world,
        {
          game_id: RecsType.Number,
          player_id: RecsType.BigInt,
          tile_id: RecsType.Number,
          characters: RecsType.Number,
        },
        {
          metadata: {
            namespace: "paved",
            name: "Builder",
            types: ["u32", "felt252", "u32", "u8"],
            customTypes: [],
          },
        },
      );
    })(),

    // Model definition for `paved::models::index::Char` model
    Char: (() => {
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
            namespace: "paved",
            name: "Char",
            types: ["u32", "felt252", "u8", "u32", "u8", "u8", "u8"],
            customTypes: [],
          },
        },
      );
    })(),

    // Model definition for `paved::models::index::CharPosition` model
    CharPosition: (() => {
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
            namespace: "paved",
            name: "CharPosition",
            types: ["u32", "u32", "u8", "felt252", "u8"],
            customTypes: [],
          },
        },
      );
    })(),

    // Model definition for `paved::models::index::Game` model
    Game: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.Number,
          over: RecsType.Boolean,
          discarded: RecsType.Number,
          built: RecsType.Number,
          tiles: RecsType.BigInt,
          tile_count: RecsType.Number,
          start_time: RecsType.Number,
          end_time: RecsType.Number,
          score: RecsType.Number,
          seed: RecsType.BigInt,
          mode: RecsType.Number,
          tournament_id: RecsType.Number,
        },
        {
          metadata: {
            namespace: "paved",
            name: "Game",
            types: [
              "u32",
              "bool",
              "u8",
              "u8",
              "u128",
              "u32",
              "u64",
              "u64",
              "u32",
              "felt252",
              "u8",
              "u64",
            ],
            customTypes: [],
          },
        },
      );
    })(),

    // Model definition for `paved::models::index::Player` model
    Player: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.BigInt,
          name: RecsType.BigInt,
          master: RecsType.BigInt,
        },
        {
          metadata: {
            namespace: "paved",
            name: "Player",
            types: ["felt252", "felt252", "felt252"],
            customTypes: [],
          },
        },
      );
    })(),

    // Model definition for `paved::models::index::Tile` model
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
            namespace: "paved",
            name: "Tile",
            types: ["u32", "u32", "felt252", "u8", "u8", "u32", "u32", "u8"],
            customTypes: [],
          },
        },
      );
    })(),

    // Model definition for `paved::models::index::TilePosition` model
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
            namespace: "paved",
            name: "TilePosition",
            types: ["u32", "u32", "u32", "u32"],
            customTypes: [],
          },
        },
      );
    })(),

    // Model definition for `paved::models::index::Tournament` model
    Tournament: (() => {
      return defineComponent(
        world,
        {
          id: RecsType.Number,
          prize: RecsType.BigInt,
          top1_player_id: RecsType.BigInt,
          top2_player_id: RecsType.BigInt,
          top3_player_id: RecsType.BigInt,
          top1_score: RecsType.Number,
          top2_score: RecsType.Number,
          top3_score: RecsType.Number,
          top1_claimed: RecsType.Boolean,
          top2_claimed: RecsType.Boolean,
          top3_claimed: RecsType.Boolean,
        },
        {
          metadata: {
            namespace: "paved",
            name: "Tournament",
            types: [
              "u64",
              "felt252",
              "felt252",
              "felt252",
              "felt252",
              "u32",
              "u32",
              "u32",
              "bool",
              "bool",
              "bool",
            ],
            customTypes: [],
          },
        },
      );
    })(),
  };
}
