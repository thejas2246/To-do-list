import { addYears, formatWithOptions, format } from "date-fns/fp";
import { enUS, eo } from "date-fns/locale";

export function dateFormating() {
  let stringDate = "2025-07-17";
  let [year, month, day] = stringDate.split("-");
  const result = format("LLLL dd,yyyy", new Date(year, month - 1, day));
  console.log(result);
}
