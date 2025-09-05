import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function refreshAccessToken(req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET as string,
    (err: jwt.VerifyErrors | null, user: any) => {
      if (err || !user) return res.sendStatus(403);

      const newAccessToken = jwt.sign(
        { userId: (user as any).userId },
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" }
      );

      return res.json({ accessToken: newAccessToken });
    }
  );
}
