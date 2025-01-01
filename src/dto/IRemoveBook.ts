import { ObjectId } from "mongodb"

export default interface IRemoveBook{
    email: string
    objectId: ObjectId
}