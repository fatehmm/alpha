import { useLocation } from "@tanstack/react-router";

import { pages } from "@/lib/consts";
import { Button } from "@/components/ui/button";

export function DocsButton() {
  const location = useLocation();

  return (
    <Button variant="outline" asChild>
      <a
        href={`https://docs.dind.io/docs/${
          pages.find((p) => p.href === location.pathname.split("/")[1])
            ?.docUrl ?? "intro"
        }`}
        target="_blank"
        rel="noreferrer"
      >
        Docs
      </a>
    </Button>
  );
}
