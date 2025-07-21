import { UserElectro } from "./electro";

export class User {
  static async getByEmail(email: string) {
    const user = await UserElectro.query.byEmail({
      email,
    }).go();

    return user.data?.[0];
  }

  static async create(email: string, name?: string, pictureUrl?: string) {
    const user = await UserElectro.create({
      email,
      name,
      pictureUrl,
    }).go();

    return user.data;
  }
}

