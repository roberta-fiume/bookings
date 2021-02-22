/* eslint-disable no-unused-vars*/ 
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: "",
  //   start: todayStr,
  //   allDay: false,
  // },
  // {
  //   id: createEventId(),
  //   title: "",
  //   start: todayStr,
  //   allDay: false,
  // }
]

export function createEventId() {
  return String(eventGuid++)
}