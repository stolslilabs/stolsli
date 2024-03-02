import type { IWorld } from "./generated/generated";

import { toast } from "sonner";
import * as SystemTypes from "./generated/types";
import { ClientComponents } from "./createClientComponents";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls({
  client,
  clientComponents,
}: {
  client: IWorld;
  clientComponents: ClientComponents;
}) {
  const extractedMessage = (message: string) => {
    return message.match(/\('([^']+)'\)/)?.[1];
  };

  const notify = (message: string, transaction: any) => {
    if (transaction.execution_status != "REVERTED") {
      toast.success(message);
    } else {
      toast.error(extractedMessage(transaction.revert_reason));
    }
  };

  const create_game = async ({ account, ...props }: SystemTypes.CreateGame) => {
    try {
      const { transaction_hash } = await client.host.create({
        account,
        ...props,
      });

      notify(
        "Game has been created.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const rename_game = async ({ account, ...props }: SystemTypes.RenameGame) => {
    try {
      const { transaction_hash } = await client.host.rename({
        account,
        ...props,
      });

      notify(
        "Game has been renamed.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error renaming game:", error);
    }
  };

  const update_game = async ({ account, ...props }: SystemTypes.UpdateGame) => {
    try {
      const { transaction_hash } = await client.host.update({
        account,
        ...props,
      });

      notify(
        "Game has been updated.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const join_game = async ({ account, ...props }: SystemTypes.JoinGame) => {
    try {
      const { transaction_hash } = await client.host.join({
        account,
        ...props,
      });

      notify(
        "Game has been joined.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  const transfer_game = async ({
    account,
    ...props
  }: SystemTypes.TransferGame) => {
    try {
      const { transaction_hash } = await client.host.transfer({
        account,
        ...props,
      });

      notify(
        "Game has been transferred.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error transferring game:", error);
    }
  };

  const leave_game = async ({ account, ...props }: SystemTypes.LeaveGame) => {
    try {
      const { transaction_hash } = await client.host.leave({
        account,
        ...props,
      });

      notify(
        "Game has been left.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error leaving game:", error);
    }
  };

  const start_game = async ({ account, ...props }: SystemTypes.StartGame) => {
    try {
      const { transaction_hash } = await client.host.start({
        account,
        ...props,
      });

      notify(
        "Game has been started.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  const create_player = async ({
    account,
    ...props
  }: SystemTypes.CreatePlayer) => {
    try {
      const { transaction_hash } = await client.manage.create({
        account,
        ...props,
      });

      notify(
        "Player has been created.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const rename_player = async ({
    account,
    ...props
  }: SystemTypes.RenamePlayer) => {
    try {
      const { transaction_hash } = await client.manage.rename({
        account,
        ...props,
      });

      notify(
        "Player has been renamed.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error renaming player:", error);
    }
  };

  const reorder_player = async ({
    account,
    ...props
  }: SystemTypes.ReorderPlayer) => {
    try {
      const { transaction_hash } = await client.manage.reorder({
        account,
        ...props,
      });

      notify(
        "Player has been reordered.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error reordering player:", error);
    }
  };

  const buy = async ({ account, ...props }: SystemTypes.Buy) => {
    try {
      const { transaction_hash } = await client.manage.buy({
        account,
        ...props,
      });

      notify(
        "Bought.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error buying:", error);
    }
  };

  const claim = async ({ account, ...props }: SystemTypes.Claim) => {
    try {
      const { transaction_hash } = await client.manage.claim({
        account,
        ...props,
      });

      notify(
        "Claimed.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error claiming:", error);
    }
  };

  const draw = async ({ account, ...props }: SystemTypes.Draw) => {
    try {
      const { transaction_hash } = await client.play.draw({
        account,
        ...props,
      });

      notify(
        "Tile has been revealed.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error drawing:", error);
    }
  };

  const discard = async ({ account, ...props }: SystemTypes.Discard) => {
    try {
      const { transaction_hash } = await client.play.discard({
        account,
        ...props,
      });

      notify(
        "Tile has been discarded.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error discarding:", error);
    }
  };

  const build = async ({ account, ...props }: SystemTypes.Build) => {
    console.log(props);

    const entityId = getEntityIdFromKeys([
      BigInt(props.game_id),
      BigInt(props.tile_id),
    ]) as Entity;

    const tileId = uuid();

    clientComponents.Tile.addOverride(tileId, {
      entity: entityId,
      value: {
        game_id: props.game_id,
        id: props.tile_id,
        player_id: BigInt(account.address),
        orientation: props.orientation,
        x: props.x,
        y: props.y,
      },
    });

    try {
      const { transaction_hash } = await client.play.build({
        account,
        ...props,
      });

      notify(
        "Tile has been paved.",
        await account.waitForTransaction(transaction_hash, {
          retryInterval: 100,
        })
      );
    } catch (error) {
      console.error("Error building:", error);
      clientComponents.Tile.removeOverride(tileId);
    } finally {
      clientComponents.Tile.removeOverride(tileId);
    }
  };

  return {
    create_game,
    rename_game,
    update_game,
    join_game,
    transfer_game,
    leave_game,
    start_game,
    create_player,
    rename_player,
    reorder_player,
    buy,
    claim,
    draw,
    discard,
    build,
  };
}
