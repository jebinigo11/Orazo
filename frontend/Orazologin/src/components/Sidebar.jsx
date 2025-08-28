import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function KpiCard({ title, value, subtitle, icon, color }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
      <Card elevation={6}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: color || "primary.main",
              display: "grid", placeItems: "center", color: "white"}}>
              {icon}
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">{title}</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
              {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
