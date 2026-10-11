"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

export default function NavDropdown({
  basePath,
  label,
  items,
}: {
  basePath: string;
  label: string;
  items: { name: string; endPoint: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-9 gap-1.5 rounded-md border border-transparent bg-transparent px-2.5 !text-base !font-medium !font-mono text-content-bone hover:border-border-hairline hover:bg-surface-raised hover:text-brand-vermilion data-[popup-open=true]:border-brand-vermilion/40 data-[popup-open=true]:bg-brand-vermilion/5"
          />
        }
      >
        <span className="flex items-center gap-1.5">
          {label}
          <ChevronDown className="h-3.5 w-3.5 text-content-fog" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[200px] rounded-lg border border-border-hairline bg-surface-reel p-2 text-content-bone shadow-2xl"
      >
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.endPoint}
              render={<Link href={`${basePath}${item.endPoint}`} />}
              className="rounded-sm px-3 py-2 text-sm font-mono text-content-bone transition-colors hover:bg-surface-raised hover:text-brand-vermilion"
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
