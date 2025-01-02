import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "email",
        });
    }

    // the validate function appends the return to the body under user:
    async validate(email: string, password: string) {
        return this.authService.validateLocalUser(email, password);
    }
}