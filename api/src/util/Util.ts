import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateKeyPair } from "crypto";

import { HTTPStatusCode, KeyPair } from "../types";
import User, { IUser } from "../models/User";

export class Util {
  public static capitalise(str: string): string {
    return str.length > 0
      ? str
          .split(/ +/gi)
          .map((word: string) => word[0].toUpperCase() + word.slice(1).toLowerCase())
          .join(" ")
      : str;
  }

  public static loadEnv(envPath: string): NodeJS.ProcessEnv {
    const env = require(envPath);
    if (!env) throw new Error("(Util#loadEnv) No environment variables to load");

    return Util.loadObjectToEnv(env);
  }

  public static loadObjectToEnv(obj: object): NodeJS.ProcessEnv {
    for (const entry of Object.entries(obj)) {
      if (typeof entry[1] === "object") {
        Util.loadObjectToEnv(entry[1]);
      } else {
        process.env[entry[0]] = entry[1].toString();
      }
    }
    return process.env;
  }

  public static findNested(dir: string, pattern: string = "js"): string[] {
    let results: string[] = [];

    fs.readdirSync(dir).forEach((innerDir) => {
      innerDir = path.resolve(dir, innerDir);
      const stat = fs.statSync(innerDir);

      if (stat.isDirectory()) results = results.concat(Util.findNested(innerDir, pattern));

      if (stat.isFile() && innerDir.split(".").pop() === pattern) results.push(innerDir);
    });

    return results;
  }

  public static async verifyPwdUsernameMatch(username: string, pwd: string): Promise<IUser | null> {
    const user = await User.findOne({ username });
    if (!user) return null;

    const pwdMatch = await Util.comparePwd(pwd, user.pwdHash);
    if (!pwdMatch) return null;

    return user;
  }

  public static serializePwd(pwd: string): Promise<string> {
    return new Promise((res, rej) => {
      bcrypt.hash(pwd, parseInt(process.env["salt-rounds"] as string, 2), function (err, hash) {
        if (err) return rej(err);
        else res(hash);
      });
    });
  }

  public static comparePwd(pwd: string, hash: string): Promise<boolean> {
    return new Promise((res, rej) => {
      bcrypt.compare(pwd, hash, function (err, result) {
        if (err) return rej(err);
        else res(result);
      });
    });
  }

  public static async ensureDir(path: string): Promise<void> {
    return new Promise((res, rej) => {
      fs.access(path, (err) => {
        if (err) {
          fs.mkdir(path, (err) => {
            if (err) return rej(err);
            else res();
          });
        } else res();
      });
    });
  }

  public static genKeypair(dir: string): Promise<KeyPair> {
    return new Promise(async (res, rej) => {
      const pubPath = path.join(dir, "public.key");
      const privPath = path.join(dir, "private.key");

      await Util.ensureDir(dir);

      const privExists = fs.existsSync(privPath);
      const pubExists = fs.existsSync(pubPath);

      if (privExists && pubExists)
        return res({
          pub: fs.readFileSync(pubPath).toString(),
          pri: fs.readFileSync(privPath).toString(),
        });

      generateKeyPair(
        "rsa",
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: process.env["keys.private.passphrase"] as string,
          },
        },
        (err, pub, pri) => {
          if (err) return rej(err);

          fs.writeFileSync(pubPath, pub);
          fs.writeFileSync(privPath, pri);

          res({ pub, pri });
        }
      );
    });
  }

  public static async issueJwt(
    userOrId: IUser | string
  ): Promise<{
    token?: string;
    expires?: string;
    error?: string;
  }> {
    let user: IUser | null = null;

    if (typeof userOrId === "string") {
      user = await User.findOne({ id: userOrId }).exec();
    } else user = userOrId;

    if (!user) return { error: "No user found" };

    const id = user.id;
    const expires = "1d";
    const passphrase = process.env["keys.private.passphrase"] as string;
    const key = process.env["keys.private"] as string;

    const payload = {
      sub: id,
      iat: Date.now(),
    };

    const token = jwt.sign(payload, { key, passphrase }, { expiresIn: expires, algorithm: "RS256" });

    return { token, expires };
  }

  public static httpCodes: Record<HTTPStatusCode, string> = {
    // 1×× Informational
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    // 2×× Success
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non - authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi - Status",
    208: "Already Reported",
    226: "IM Used",
    // 3×× Redirection
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    // 4×× Client Error
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "Request - URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    444: "Connection Closed Without Response",
    451: "Unavailable For Legal Reasons",
    499: "Client Closed Request",
    // 5×× Server Error
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    509: "Bandwidth Limit Exceeded",
    510: "Not Extended",
    511: "Network Authentication Required",
    599: "Network Connect Timeout Error",
  };
}