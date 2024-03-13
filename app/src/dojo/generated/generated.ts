/* Autogenerated file. Do not edit manually. */

import { Account } from "starknet";
import { DojoProvider } from "@dojoengine/core";
import {
  CreateGame,
  RenameGame,
  UpdateGame,
  JoinGame,
  TransferGame,
  LeaveGame,
  StartGame,
} from "./types";
import {
  CreatePlayer,
  RenamePlayer,
  ReorderPlayer,
  Buy,
  Claim,
  Draw,
  Discard,
  Build,
} from "./types";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
  function host() {
    const contract_name = "host";

    const create = async ({ account, name, duration, mode }: CreateGame) => {
      try {
        return await provider.execute(account, contract_name, "create", [
          provider.getWorldAddress(),
          name,
          duration,
          mode,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const rename = async ({ account, game_id, name }: RenameGame) => {
      try {
        return await provider.execute(account, contract_name, "rename", [
          provider.getWorldAddress(),
          game_id,
          name,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const update = async ({ account, game_id, duration }: UpdateGame) => {
      try {
        return await provider.execute(account, contract_name, "update", [
          provider.getWorldAddress(),
          game_id,
          duration,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const join = async ({ account, game_id, order }: JoinGame) => {
      try {
        return await provider.execute(account, contract_name, "join", [
          provider.getWorldAddress(),
          game_id,
          order,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const transfer = async ({ account, game_id, host_id }: TransferGame) => {
      try {
        return await provider.execute(account, contract_name, "transfer", [
          provider.getWorldAddress(),
          game_id,
          host_id,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const leave = async ({ account, game_id }: LeaveGame) => {
      try {
        return await provider.execute(account, contract_name, "leave", [
          provider.getWorldAddress(),
          game_id,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const start = async ({ account, game_id }: StartGame) => {
      try {
        return await provider.execute(account, contract_name, "start", [
          provider.getWorldAddress(),
          game_id,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    return { create, rename, update, join, transfer, leave, start };
  }

  function manage() {
    const contract_name = "manage";

    const create = async ({ account, name, order, master }: CreatePlayer) => {
      try {
        return await provider.execute(account, contract_name, "create", [
          provider.getWorldAddress(),
          name,
          order,
          master,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const rename = async ({ account, name }: RenamePlayer) => {
      try {
        return await provider.execute(account, contract_name, "rename", [
          provider.getWorldAddress(),
          name,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const reorder = async ({ account, order }: ReorderPlayer) => {
      try {
        return await provider.execute(account, contract_name, "reorder", [
          provider.getWorldAddress(),
          order,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const buy = async ({ account, amount }: Buy) => {
      try {
        return await provider.execute(account, contract_name, "buy", [
          provider.getWorldAddress(),
          amount,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const claim = async ({ account, game_id }: Claim) => {
      try {
        return await provider.execute(account, contract_name, "claim", [
          provider.getWorldAddress(),
          game_id,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    return { create, rename, reorder, buy, claim };
  }

  function play() {
    const contract_name = "play";

    const draw = async ({ account, game_id }: Draw) => {
      try {
        return await provider.execute(account, contract_name, "draw", [
          provider.getWorldAddress(),
          game_id,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const discard = async ({ account, game_id }: Discard) => {
      try {
        return await provider.execute(account, contract_name, "discard", [
          provider.getWorldAddress(),
          game_id,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const build = async ({
      account,
      game_id,
      orientation,
      x,
      y,
      role,
      spot,
    }: Build) => {
      try {
        return await provider.execute(account, contract_name, "build", [
          provider.getWorldAddress(),
          game_id,
          orientation,
          x,
          y,
          role,
          spot,
        ]);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    return { draw, discard, build };
  }

  return {
    host: host(),
    manage: manage(),
    play: play(),
  };
}
