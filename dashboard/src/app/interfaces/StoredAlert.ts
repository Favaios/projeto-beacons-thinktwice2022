import Alert from "./Alert";

export default interface StoredAlert extends Alert {
  image: string
  seen: boolean
}