import { Request, Response } from "express"
import { Session, SessionData } from "express-session"
import { UserAuthPayload } from "./UserAuthPayload"

export interface Context {
    
    req: Request & {
        session: Session & Partial<SessionData> & { userId?: number }
    }
    res: Response
    user: UserAuthPayload
}