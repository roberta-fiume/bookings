/* eslint-disable no-unused-vars*/ 
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: "booked",
  //   start: "2021-02-22T14:45:12.000Z",
  //   allDay: false,
  // },
  // {
  //   id: createEventId(),
  //   title: "booked",
  //   start: "2021-02-24",
  //   allDay: false,
  // },
  // {
  //   id: createEventId(),
  //   title: "booked",
  //   start: "2021-02-26",
  //   allDay: false,
  // }
]

export function createEventId() {
  return String(eventGuid++)
}