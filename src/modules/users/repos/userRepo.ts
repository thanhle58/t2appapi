import { User } from "../domain/user";
import { UserMap } from "../mappers/UserMap";

export interface IUserRepo {
  // findUserByEmail(email: UserEmail): Promise<User>;
  // findUserByUsername (username: string): Promise<User>;
  // exists (email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class UserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }
  


  public async save (user: User): Promise<void> {
    const BaseUserModel = this.models.baseUser;
    // const exists = await this.exists(user.email);
    const rawUser = UserMap.toPersistence(user);
    
    try {
    //   if (!exists) {
    //     // Create new
        
    //   } 
        await BaseUserModel.create(rawUser);
    //   else {
    //     // Save old
    //     const sequelizeUserInstance = await BaseUserModel.findOne({ 
    //       where: { user_email: user.email.value }
    //     })
    //     await sequelizeUserInstance.update(rawUser);
    //   }
    } catch (err) {
      console.log(err);
    }
  }

}
