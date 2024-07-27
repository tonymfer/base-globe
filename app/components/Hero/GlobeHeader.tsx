"use client";
import BaseLogo from "@/app/components/base-logo";
import { useLandingStore } from "@/app/stores/landing";
import { useMapStore } from "@/app/stores/map";
import { activateGlobe, deactivateGlobe } from "@/app/utils/globe";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function GlobeHeader() {
  const setBurgerVisible = useLandingStore((s) => s.setBurgerVisible);
  const burgerVisible = useLandingStore((state) => state.burgerVisible);
  const ready = useMapStore((s) => s.ready);
  const about = useMapStore((s) => s.about);
  const activeCity = useMapStore((s) => s.activeCity);
  const globeActive = useMapStore((s) => s.globeActive);
  const mobile = useLandingStore((s) => s.mobile);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();

  return (
    <div
      className={`${
        burgerVisible || mobile
          ? "pointer-events-auto opacity-100"
          : "pointer-events-auto opacity-100"
      } fixed z-[30000] md:gap-8 flex h-20 w-screen justify-between md:justify-start overflow-visible pt-10 padded-horizontal-wide items-center`}
    >
      <button
        // onMouseDown={() => {
        //   deactivateGlobe();
        // }}
        // onTouchStart={() => {
        //   deactivateGlobe();
        // }}
        className={`h-8 w-auto overflow-y-hidden tablet:h-10
        ${
          !about && (!globeActive || !ready || activeCity)
            ? "pointer-events-none opacity-100"
            : "pointer-events-auto opacity-100"
        }
          `}
        style={{
          filter: "drop-shadow(3px 5px 2px rgb(255 255 255 / 0.2))",
        }}
      >
        <BaseLogo />
      </button>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          className="text-base hover:bg-white hover:text-black"
          onClick={() => {
            if (isHome) {
              useMapStore.setState({
                globeActive: true,
                about: false,
              });
              activateGlobe();
            } else {
              router.push("/");
            }
          }}
        >
          Home
        </Button>
        <Button
          asChild
          variant="ghost"
          className="text-base hover:bg-white hover:text-black"
        >
          <Link href="/leaderboard">Leaderboard</Link>
        </Button>
        <Button
          className="text-base hover:bg-white hover:text-black"
          onClick={() => {
            deactivateGlobe(true);
            useMapStore.setState({ about: true });
          }}
          variant="ghost"
        >
          About
        </Button>
      </div>

      {/* <div className="flex flex-col text-xs gap-1 items-center justify-center">
        <div className="text-white">made with ♥️ by</div>
        <div className="flex items-center justify-center gap-1">
          <a
            href="https://warpcast.com/to"
            rel="noopener noreferrer"
            target="_blank"
            className="px-2 py-1 w-fit rounded-lg bg-[#472A91] text-white text-xs"
          >
            @to
          </a>
          <a
            href="https://warpcast.com/undefined"
            rel="noopener noreferrer"
            target="_blank"
            className="px-2 py-1 w-fit rounded-lg bg-[#472A91] text-white text-xs"
          >
            @undefined
          </a>
        </div>
      </div> */}
      {/* <SideMenu /> */}
    </div>
  );
}
