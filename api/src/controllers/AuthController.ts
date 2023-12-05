import _ from "lodash";
import bcrypt from "bcrypt";
import {
  registerSchema,
  loginSchema,
  lostPasswordSchema,
  resetPasswordSchema,
} from "../schemas/AuthSchemas";
import { handleMessage } from "../utils/handles";
import express from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { ApiError, AuthError } from "../utils/errors";
import { User } from "../entities/User";
import { wrap } from "@mikro-orm/core";

function makeJwtToken(user: User) {
  const token = jwt.sign(
    _.omit(wrap(user).toObject(), ["password"]),
    env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return token;
}

export class AuthController {
  async login(req: express.Request, res: express.Response) {
    const { email, password } = await loginSchema.validate(req.body);

    const user = await res.locals.di.userRepository.findOne({ email });

    if (!user) {
      throw new AuthError("user or password is wrong");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AuthError("user or password is wrong");
    }

    return handleMessage(
      {
        jwt: makeJwtToken(user),
      },
      res
    );
  }

  async register(req: express.Request, res: express.Response) {
    const { name, email, password } = await registerSchema.validate(req.body);
    const exists = await res.locals.di.userRepository.findOne({ email });
    if (!!exists) {
      throw new AuthError("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, env.PASSWORD_SALT);

    const created = res.locals.di.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await res.locals.di.userRepository.persistAndFlush(created);

    return handleMessage({ id: created.id }, res);
  }

  async lostPassword(req: express.Request, res: express.Response) {
    const { email } = await lostPasswordSchema.validate(req.body);

    const user = await res.locals.di.userRepository.findOne({ email });

    if (!user) {
      throw new AuthError("not found", 404);
    }

    const tokenCreated = res.locals.di.passwordResetTokenRepository.create({
      user,
    });

    await res.locals.di.passwordResetTokenRepository.persistAndFlush(
      tokenCreated
    );

    let message = `Olá ${user.name}, esse é o seu token temporário: ${tokenCreated.token}`;
    message += `\n\nClique nesse link e escolha uma nova senha https://cartorio-blockchain.com/auth/reset-password?token=${tokenCreated.token}`;
    await res.locals.di.emailService.sendMail("Redefinição de Senha", message, email);
    return handleMessage({ success: true }, res);
  }

  async resetPassword(req: express.Request, res: express.Response) {
    const { password, token } = await resetPasswordSchema.validate(req.body);

    const tokenFound = await res.locals.di.passwordResetTokenRepository.findOne(
      {
        token,
      }
    );

    if (!tokenFound) {
      throw new AuthError("invalid token");
    }

    const hashedPassword = await bcrypt.hash(password, env.PASSWORD_SALT);

    const user = await res.locals.di.userRepository.findOne({
      id: tokenFound.user.id,
    });

    user!.password = hashedPassword;

    await res.locals.di.userRepository.flush();

    await res.locals.di.passwordResetTokenRepository.removeAndFlush(tokenFound);

    await res.locals.di.emailService.sendMail(
      "Password reseted",
      `Hi ${user!.name}, your password was resetted sucessfully.`,
      user!.email
    );

    return handleMessage({ success: true }, res);
  }
}
