"use client";
import { Box, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import type { SvgIconComponent } from "@mui/icons-material";

interface NavItem {
  label: string;
  Icon: SvgIconComponent;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "หน้าแรก", Icon: HomeRoundedIcon,          path: "/" },
  { label: "เล่นเกม",  Icon: SportsEsportsRoundedIcon, path: "/setup" },
  { label: "บทความ",  Icon: MenuBookRoundedIcon,       path: "/articles" },
  { label: "โปรไฟล์", Icon: PersonRoundedIcon,         path: "/profile" },
];

const ACTIVE   = "#4E7B5E";
const INACTIVE = "#B0A090";
const INDICATOR_BG = "#4E7B5E18";

export default function BottomNav() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        zIndex: 100,
        backgroundColor: "rgba(255,251,244,0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(180,155,120,0.18)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: 64,
        px: 0.5,
        boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
        maxWidth: "100%",
      }}
    >
      {NAV_ITEMS.map(({ label, Icon, path }) => {
        const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);

        return (
          <Box
            key={path}
            onClick={() => router.push(path)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.3,
              cursor: "pointer",
              flex: 1,
              py: 0.75,
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",
              transition: "transform 0.15s",
              "&:active": { transform: "scale(0.9)" },
            }}
          >
            {/* Icon container */}
            <Box sx={{
              width: 40, height: 28,
              borderRadius: 2,
              backgroundColor: isActive ? INDICATOR_BG : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
            }}>
              <Icon sx={{
                fontSize: "1.35rem",
                color: isActive ? ACTIVE : INACTIVE,
                transition: "color 0.2s",
              }} />
            </Box>

            {/* Label */}
            <Typography sx={{
              fontSize: "0.62rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? ACTIVE : INACTIVE,
              lineHeight: 1,
              transition: "color 0.2s, font-weight 0.2s",
              letterSpacing: "0.01em",
            }}>
              {label}
            </Typography>

            {/* Active dot */}
            {isActive && (
              <Box sx={{
                width: 4, height: 4, borderRadius: "50%",
                backgroundColor: ACTIVE,
                mt: 0.25,
              }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
