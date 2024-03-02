import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useLogs } from "@/hooks/useLogs";

export type LogType = {
  timestamp: number;
  log: string;
  regionFrom?: number;
  regionTo?: number;
};

export const Log = () => {
  const { logs } = useLogs();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"command"} size={"command"}>
                <FontAwesomeIcon className="h-12" icon={faInfoCircle} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="select-none">Game logs</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Game logs</SheetTitle>
        </SheetHeader>
        <ScrollArea className="grow">
          {logs &&
            logs.map((log, index) => (
              <div key={index} className="flex justify-between">
                <p className="text-xs">
                  <span className="text-slate-400">
                    {`[${log.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}]`}
                  </span>
                  <strong style={{ color: log.color }}>
                    {` ${log.builder}`}
                  </strong>
                  {log.category === "Scored" ? ` ✨ ${log.log}` : " ⚒️"}
                </p>
              </div>
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
