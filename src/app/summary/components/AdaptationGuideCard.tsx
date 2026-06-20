import { Box, Typography } from "@mui/material";
import { JohariDimension } from "@/constants/reflectionTags";
import { JohariQuadrant, ADAPTATION_GUIDES } from "@/data/adaptationGuides";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

interface Props {
  dimension: JohariDimension;
  quadrant: JohariQuadrant;
}

const PRIMARY = "#4E7B5E";

export default function AdaptationGuideCard({ dimension, quadrant }: Props) {
  const guide = ADAPTATION_GUIDES.find((g) => g.dimension === dimension && g.quadrant === quadrant);

  if (!guide) return null;

  return (
    <Box sx={{
      backgroundColor: "#FFFFFF", borderRadius: 3, p: 3,
      boxShadow: "0 4px 16px rgba(100,70,30,0.06)",
      border: "1px solid rgba(180,155,120,0.18)",
      display: "flex", flexDirection: "column", gap: 1.5,
      mt: 2
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{
          width: 36, height: 36, borderRadius: "50%",
          backgroundColor: `${PRIMARY}15`, display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>
          <AutoAwesomeRoundedIcon sx={{ color: PRIMARY, fontSize: "1.2rem" }} />
        </Box>
        <Typography fontWeight={800} sx={{ color: "#2C2218", fontSize: "1rem" }}>
          {guide.displayTitle}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: "#7A6248", lineHeight: 1.7, fontWeight: 600 }}>
        {guide.actionableGuide}
      </Typography>
    </Box>
  );
}
