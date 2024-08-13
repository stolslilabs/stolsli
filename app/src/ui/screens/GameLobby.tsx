import { useLobby } from "@/hooks/useLobby";
import BoxRainScene from "../modules/BoxRain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../elements/tabs";
import { Tournament } from "../components/Tournament";
import { Games } from "../modules/Games";
import banner from "/assets/banner.svg";
import { MusicPlayer } from "../components/MusicPlayer";
import { CreateGame } from "../components/CreateGame";
import { Links } from "../components/Links";
import { Player } from "../modules/Player";
import { Address } from "../components/Address";

const tabs = ["daily", "weekly", "1v1", "tutorial"];
const disabledTabs = ["weekly", "1v1", "tutorial"];

// TODO: Consider applying this to the tabs component directly
const tabsStyles = {
  trigger: "h-full bg-primary/50 data-[state=active]:bg-secondary/50 rounded-b-none border-primary border-[1px] data-[state=active]:border-b-transparent disabled:bg-primary/25 sm:tracking-[0.25rem]",
  content: "h-full bg-primary mt-0 bg-secondary/50 border-x-[1px] border-primary"
}

export const GameLobby = () => {
  const { gameMode } = useLobby();

  return (
    <div className="h-screen flex w-full relative">
      <BoxRainScene />
      <div className="flex w-full h-full gap-8">
        <div className="absolute top-0 left-0 z-0 flex w-full h-full bg-white/90" />
        <div className="w-full sm:w-2/3 z-0 flex flex-col overflow-hidden p-4">
          <div className="h-24 flex justify-between w-full flex-shrink-0">
            <img src={banner} className="h-full" />
            <MusicPlayer />
          </div>
          <div className="flex-1 overflow-hidden">
            <Tabs defaultValue="daily" className="w-full h-full flex flex-col p-0">
              <TabsList className="flex-shrink-0 p-0 bg-transparent justify-start">
                {tabs.map((tab, index) => (
                  <>
                    {index === 0 && <div className={`h-4 self-end border-b-[1px] border-primary w-6 hidden sm:block`} />}
                    <TabsTrigger key={index} disabled={disabledTabs.includes(tab)} value={tab} className={tabsStyles.trigger}>{tab}</TabsTrigger>
                    <div className={`h-4 self-end border-b-[1px] border-primary ${index === (tabs.length - 1) ? "flex-grow" : "w-1 sm:w-6"}`} />
                  </>
                ))}
              </TabsList>
              {tabs.map((tab) => <TabsContent key={tab} value={tab} className={tabsStyles.content}><Games /></TabsContent>)}
              <div className="w-full flex justify-end h-20 border-x-[1px] border-b-[1px] border-primary bg-secondary/50 p-4">
                <CreateGame mode={gameMode} />
              </div>
            </Tabs>
          </div>
        </div>
        <div className="w-1/3 h-full z-20 bottom-0 p-8 shadow-2xl bg-primary overflow-auto hidden">
          <Address />
          <Player />
          <div className="my-4 py-4 border shadow-sm bg-white/90 ">
            <Tournament mode={gameMode} />
          </div>
          <Links />
        </div>
      </div>
    </div>
  );
};
