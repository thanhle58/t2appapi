import { WatchedList } from "../../../core/domain/WatchedList";
import { Member } from "./member";

export class Members extends WatchedList<Member> {
  private constructor(initialVotes: Member[]) {
    super(initialVotes);
  }
  public compareItems (a: Member, b: Member): boolean {
    return a.equals(b)
  }

  public static create (comments?: Member[]): Members {
    return new Members(comments ? comments : []);
  }
}
