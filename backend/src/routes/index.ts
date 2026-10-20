import { Router } from "express";

import syncRoutes from "../modules/sync/sync.routes";
import invitationRoutes from "../modules/invitations/invitation.routes";

const router = Router();
router.use("/sync", syncRoutes);
router.use("/invitations", invitationRoutes);
router.use("/health", (req, res) => res.send("OK"));

export default router;