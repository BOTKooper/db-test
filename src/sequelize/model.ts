import {
  Column,
  DataType,
  Index,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

export enum ActionType {
  LIKE= 'LIKE',
  DISLIKE= 'DISLIKE',
  SUPER_LIKE= 'SUPER_LIKE',
  PRIORITY_LIKE= 'PRIORITY_LIKE',
  MATCH='MATCH',
  MATCH_SUPER_LIKE='MATCH_SUPER_LIKE',
}

@Table({
  timestamp: true,
  tableName: 'user_action',
})
export class UserActionModel extends Model<UserActionModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  /**
   * User which makes an Action. If Alfred makes a swipe with a like. His userId will be here
   */
  @Index
  @Unique(`user_action_userId_actUserId_unique`)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public userId: number;

  /**
   * User who this operation performs on. If Alfred makes a swipe on Monica with a like. Monica's id will be here
   */
  @Index
  @Unique(`user_action_userId_actUserId_unique`)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public actUserId: number;

  @Column({
    type: DataType.ENUM(...Object.keys(ActionType)),
    allowNull: false,
  })
  public actionType: ActionType;
}
