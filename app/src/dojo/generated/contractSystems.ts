/* Autogenerated file. Do not edit manually. */

import { DojoProvider } from "@dojoengine/core";
import { Config } from "../../../dojoConfig.ts";
import {
  Initialize,
  CreateGame,
  Claim,
  Sponsor,
  CreatePlayer,
  Discard,
  Surrender,
  Build,
} from "../types/systems";
import { Account, InvocationsDetails } from "starknet";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export const getContractByName = (manifest: any, name: string) => {
  const contract = manifest.contracts.find((contract: any) =>
    contract.name.includes("::" + name)
  );
  if (contract) {
    return contract.address;
  } else {
    return "";
  }
};

export async function setupWorld(provider: DojoProvider, config: Config) {
  const details: InvocationsDetails = { maxFee: 2e16 };

  const execute = async (
    account: Account,
    contractName: string,
    methodName: string,
    args: any[],
    details: InvocationsDetails
  ) => {
    const { transaction_hash } = await provider.execute(
      account,
      contractName,
      methodName,
      args,
      details
    );
    const receipt = await account.waitForTransaction(transaction_hash, {
      retryInterval: 100,
    });

    if (receipt.execution_status === "REVERTED") {
      throw new Error("Transaction reverted");
    }

    return receipt;
  };

  function account() {
    const contract_name = "account";
    const contract = config.manifest.contracts.find((c) =>
      c.name.includes(contract_name)
    );
    if (!contract) {
      throw new Error(`Contract ${contract_name} not found in manifest`);
    }

    const initialize = async ({ account, world }: Initialize) => {
      try {
        return await execute(
          account,
          contract_name,
          "initialize",
          [world],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const create = async ({ account, name, master }: CreatePlayer) => {
      const contract_address = getContractByName(
        config.manifest,
        contract_name
      );
      const calls = [
        {
          contractAddress: config.feeTokenAddress,
          entrypoint: "mint",
          calldata: [account.address, `0x${(1e21).toString(16)}`, "0x0"],
        },
        {
          contractAddress: contract_address,
          entrypoint: "create",
          calldata: [provider.getWorldAddress(), name, master],
        },
      ];
      try {
        return await provider.executeMulti(account, calls, details);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    return {
      address: contract.address,
      initialize,
      create,
    };
  }

  function daily() {
    const contract_name = "daily";
    const contract = config.manifest.contracts.find((c) =>
      c.name.includes(contract_name)
    );
    if (!contract) {
      throw new Error(`Contract ${contract_name} not found in manifest`);
    }

    const initialize = async ({ account, world }: Initialize) => {
      try {
        return await execute(
          account,
          contract_name,
          "initialize",
          [world],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const spawn = async ({ account }: CreateGame) => {
      const contract_address = getContractByName(
        config.manifest,
        contract_name
      );
      const calls = [
        {
          contractAddress: config.feeTokenAddress,
          entrypoint: "approve",
          calldata: [contract_address, `0x${(1e18).toString(16)}`, "0x0"],
        },
        {
          contractAddress: contract_address,
          entrypoint: "spawn",
          calldata: [provider.getWorldAddress()],
        },
      ];
      try {
        return await provider.executeMulti(account, calls, details);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const claim = async ({ account, tournament_id, rank }: Claim) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "claim",
          [
            provider.getWorldAddress(),
            tournament_id.toString(),
            rank.toString(),
          ],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const sponsor = async ({ account, amount }: Sponsor) => {
      const contract_address = getContractByName(
        config.manifest,
        contract_name
      );
      const calls = [
        {
          contractAddress: config.feeTokenAddress,
          entrypoint: "approve",
          calldata: [contract_address, amount, "0x0"],
        },
        {
          contractAddress: contract_address,
          entrypoint: "sponsor",
          calldata: [provider.getWorldAddress(), amount],
        },
      ];
      try {
        return await provider.executeMulti(account, calls, details);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const discard = async ({ account, game_id }: Discard) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "discard",
          [provider.getWorldAddress(), game_id.toString()],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const surrender = async ({ account, game_id }: Surrender) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "surrender",
          [provider.getWorldAddress(), game_id.toString()],
          details
        );
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
      console.log(provider.getWorldAddress());
      try {
        return await provider.execute(
          account,
          contract_name,
          "build",
          [
            provider.getWorldAddress(),
            game_id.toString(),
            orientation.toString(),
            x.toString(),
            y.toString(),
            role.toString(),
            spot.toString(),
          ],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    return {
      address: contract.address,
      initialize,
      spawn,
      claim,
      sponsor,
      discard,
      surrender,
      build,
    };
  }

  function weekly() {
    const contract_name = "weekly";
    const contract = config.manifest.contracts.find((c) =>
      c.name.includes(contract_name)
    );
    if (!contract) {
      throw new Error(`Contract ${contract_name} not found in manifest`);
    }

    const initialize = async ({ account, world }: Initialize) => {
      try {
        return await execute(
          account,
          contract_name,
          "initialize",
          [world],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const spawn = async ({ account }: CreateGame) => {
      const contract_address = getContractByName(
        config.manifest,
        contract_name
      );
      const calls = [
        {
          contractAddress: config.feeTokenAddress,
          entrypoint: "approve",
          calldata: [contract_address, `0x${(1e18).toString(16)}`, "0x0"],
        },
        {
          contractAddress: contract_address,
          entrypoint: "spawn",
          calldata: [provider.getWorldAddress()],
        },
      ];
      try {
        return await provider.executeMulti(account, calls, details);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const claim = async ({ account, tournament_id, rank }: Claim) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "claim",
          [
            provider.getWorldAddress(),
            tournament_id.toString(),
            rank.toString(),
          ],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const sponsor = async ({ account, amount }: Sponsor) => {
      const contract_address = getContractByName(
        config.manifest,
        contract_name
      );
      const calls = [
        {
          contractAddress: config.feeTokenAddress,
          entrypoint: "approve",
          calldata: [contract_address, amount, "0x0"],
        },
        {
          contractAddress: contract_address,
          entrypoint: "sponsor",
          calldata: [provider.getWorldAddress(), amount],
        },
      ];
      try {
        return await provider.executeMulti(account, calls, details);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const discard = async ({ account, game_id }: Discard) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "discard",
          [provider.getWorldAddress(), game_id.toString()],
          details
        );
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    const surrender = async ({ account, game_id }: Surrender) => {
      try {
        return await provider.execute(
          account,
          contract_name,
          "surrender",
          [provider.getWorldAddress(), game_id.toString()],
          details
        );
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
      const calls = [
        {
          contractAddress: contract.address,
          entrypoint: "build",
          calldata: [
            provider.getWorldAddress(),
            game_id.toString(),
            orientation.toString(),
            x.toString(),
            y.toString(),
            role.toString(),
            spot.toString(),
          ],
        },
      ];
      try {
        return await provider.executeMulti(account, calls, details);
      } catch (error) {
        console.error("Error executing initialize:", error);
        throw error;
      }
    };

    return {
      address: contract.address,
      initialize,
      spawn,
      claim,
      sponsor,
      discard,
      surrender,
      build,
    };
  }

  return {
    account: account(),
    daily: daily(),
    weekly: weekly(),
  };
}
