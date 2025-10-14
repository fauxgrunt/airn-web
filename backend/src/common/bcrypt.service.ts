import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 10;

  /**
   * Hashes a password using bcrypt.
   * @param password The raw password string.
   * @returns The hashed password string.
   */
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares a raw password with a hashed password.
   * @param password The raw password string.
   * @param hash The hashed password string from the database.
   * @returns True if the passwords match, false otherwise.
   */
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}