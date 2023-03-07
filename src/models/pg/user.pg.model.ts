import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize'
import { sequelize } from '@/config/sql.config'
import ModelConstant from '@/constants/model.pg.constant'
import { PostModel } from '.'

type UserAssociations = 'posts'

class User extends Model<
  InferAttributes<User, { omit: UserAssociations }>,
  InferCreationAttributes<User, { omit: UserAssociations }>
> {
  declare id: CreationOptional<uuid>
  declare username: string
  declare first_name?: string | null
  declare last_name?: string | null
  declare email: string | null
  declare phone: string | null
  declare password: string | null
  declare is_admin: boolean
  // declare fcm_token: string | null
  declare readonly created_at?: Date
  declare readonly updated_at?: Date
  declare readonly deleted_at?: Date | null

  declare static associations: {
    authors: Association<PostModel, User>,
  }

  declare posts?: NonAttribute<PostModel[]>
  declare getPosts: HasManyGetAssociationsMixin<PostModel>
  declare setPosts: HasManySetAssociationsMixin<PostModel, uuid>
  declare addPost: HasManyAddAssociationMixin<PostModel, uuid>
  declare addPosts: HasManyAddAssociationsMixin<PostModel, uuid>
  declare createPost: HasManyCreateAssociationMixin<PostModel>
  declare removePost: HasManyRemoveAssociationMixin<PostModel, uuid>
  declare removePosts: HasManyRemoveAssociationsMixin<PostModel, uuid>
  declare hasPost: HasManyHasAssociationMixin<PostModel, uuid>
  declare hasPosts: HasManyHasAssociationsMixin<PostModel, uuid>
  declare countPosts: HasManyCountAssociationsMixin


    static initModel(): typeof User {
      User.init({
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        // fcm_token: {
        //   type: DataTypes.STRING,
        //   allowNull: true,
        // },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        }
      }, {
        sequelize,
        modelName: 'User',
        tableName: ModelConstant.USER_MODEL,
      })
      return User
    }

    static sendPush() {

    }
}



export default User