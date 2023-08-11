"use client";

import { Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { solids } from "@/lib/colors";

type ColorPickerProps = {
  color: string;
  setColor: (background: string) => void;
  className?: string;
};

export function ColorPicker({ color, setColor, className }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !color && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {color ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ backgroundColor: color }}
              />
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {color ? color : "Pick a color"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <Tabs defaultValue="solid" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="solid"
            className="flex flex-wrap gap-1 mt-0 max-h-60 overflow-y-auto"
          >
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="border border-black dark:border-none rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setColor(s)}
              />
            ))}
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={color}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setColor(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
