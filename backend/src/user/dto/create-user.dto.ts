export class CreateUserDto {
  email: string;
  name: string;
  avatar?: string;

  constructor(email: string, name: string, avatar?: string) {
    this.email = email;
    this.name = name;
    this.avatar = avatar;
  }
}
