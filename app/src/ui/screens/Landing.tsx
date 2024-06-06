import { Button } from "@/ui/elements/button";
import { BorderLayout } from "../components/BorderLayout";
import { Connection } from "../components/Connection";
import { Spawn } from "../components/Spawn";
import { useNavigate } from "react-router-dom";
import banner from "/assets/banner.svg";
import BoxRainScene from "../modules/BoxRain";
import { useDojo } from "@/dojo/useDojo";
import { useAccount } from "@starknet-react/core";
import { useMemo, useState } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import { ComponentValue } from "@dojoengine/recs";

export const Landing = () => {
  const { isConnected } = useAccount();
  const {
    account: { account },
  } = useDojo();

  const { player } = usePlayer({ playerId: account?.address });

  const [loading, setLoading] = useState(false);
  return (
    <BorderLayout>
      <div className="fixed h-full w-full z-0">
        <BoxRainScene />
      </div>
      <div className="self-center justify-center flex h-full bg-blue-100">
        <div className="flex gap-4 self-center  p-10 flex-wrap justify-center bg-paved-pink z-10">
          <div className="">
            <img src={banner} alt="banner" className="w-96" />
          </div>
          <div className="w-full flex justify-center">
            <Connection />
          </div>

          {isConnected && (
            <div className="flex">
              {!player ? (
                <Spawn setLoading={setLoading} loading={loading} />
              ) : (
                <Play loading={loading} player={player} />
              )}
            </div>
          )}
        </div>
      </div>
    </BorderLayout>
  );
};

export const Play = ({
  player,
  loading,
}: {
  player: ComponentValue;
  loading: boolean;
}) => {
  const navigate = useNavigate();

  const {
    account: { account },
  } = useDojo();

  const disabled = useMemo(() => {
    return !account || !player;
  }, [account, player]);

  const handleClick = () => {
    if (disabled) return;
    navigate("/game", { replace: true });
  };

  return (
    <Button
      disabled={disabled || loading}
      variant={"secondary"}
      onClick={handleClick}
    >
      {loading ? "Loading..." : "Play"}
    </Button>
  );
};
