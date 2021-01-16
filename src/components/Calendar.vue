<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64" >
        <v-toolbar
          flat
        >  
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>

          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="title">
              {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <!-- <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item> -->
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-container>
                    <v-form @submit.prevent="addEvent">
                        <v-text-field
                            v-model="firstName"
                            type="text"
                            label="First name"
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="lastName"
                            type="text"
                            label="Last name"
                        >
                        </v-text-field>
                            <v-text-field
                            v-model="email"
                            type="text"
                            label="Email"
                        >
                        </v-text-field>
                        <v-btn
                            type="submit"
                            color="primary"
                            class="mr-4"
                            @click.stop="dialog = false"
                        >
                            Book slot
                        </v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>

      <v-sheet height="600" @click="openModal" >
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :type="type"
          class="v-calendar v-calendar-daily"
        ></v-calendar>

          <!-- <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
        ></v-calendar> -->
        <!-- <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu> -->
      </v-sheet>
    </v-col>
  
  </v-row>


</template>

<script>

/* eslint-disable no-unused-vars */
  export default {
    data() {
    
      return {
        title: null,
        focus: '',
        type: 'week',
        typeToLabel: {
        week: 'Week',
        month: 'Month',  
        day: 'Day',
        '4day': '4 Days'
        },
        //   selectedEvent: {},
        //   selectedElement: null,
        //   selectedOpen: false,
        //   events: [],
        colors: ['red', 'green'],
        names: ['Booked', 'Available'],
        dialog: false,
        firstName: null,
        lastName: null,
        email: null,
        bookingDate: null,
      }
    },
    mounted() {
      this.$refs.calendar.checkChange();
      this.createAvailability();
      this.editTime();  
      this.removeUnnacessaryTimes();  
      this.title = this.$refs.calendar.title;
      console.log("TITLE IN MOUNTED", this.title);
      // this.removeSquares();
    },

    methods: {
      createAvailability() {
        let squares = document.getElementsByClassName("v-calendar-daily__day-interval");
        squares.forEach(square => {
             square.innerHTML = "AVAILABLE";
        });
      },

      editTime() {
          //TODO: make is configurable from API in bbackend      
        let times = document.getElementsByClassName("v-calendar-daily__interval-text");
        times[0].innerHTML = "6.00 - 8.00";
        times[1].innerHTML = "8.00 - 10.00";
        times[2].innerHTML = "10.00 - 12.00";
        times[3].innerHTML = "12.00 - 14.00";
        times[4].innerHTML = "15.00 - 17.00";
        times[5].innerHTML = "17.00 - 19.00";
        times[6].innerHTML = "19.00 - 21.00";
        times[7].innerHTML = "21.00 - 23.00";
      },

      removeUnnacessaryTimes() {
        let times = document.getElementsByClassName("v-calendar-daily__interval"); 
        for(var i = times.length -1; i >= 8; i--) {
            times[i].parentNode.removeChild(times[i]);
        }
      },

      // removeSquares() {
      //   let squares = document.getElementsByClassName("v-calendar-daily__day-interval"); 
      //   // for(var i = squares.length -1; i >= 9; i--) {
      //   //     squares[i].parentNode.removeChild(squares[i]);
      //   // } 
      // },

      // bookSlot() {
      //   let user = {
      //     firstName: this.firstName,
      //     lastName: this.lastName,
      //     email: this.email,
      //   }
      // },

      // getBookingDateTime() {

      // },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      openModal(){
        this.dialog = true;
        let squares = document.getElementsByClassName("v-calendar");
      }, 

        //   showEvent ({ nativeEvent, event }) {
        //     const open = () => {
        //       this.selectedEvent = event
        //       this.selectedElement = nativeEvent.target
        //       setTimeout(() => {
        //         this.selectedOpen = true
        //       }, 10)
        //     }

        //     if (this.selectedOpen) {
        //       this.selectedOpen = false
        //       setTimeout(open, 10)
        //     } else {
        //       open()
        //     }

        //     nativeEvent.stopPropagation()
        //   },
        //   updateRange ({ start, end }) {
        //     const events = []

        //     const min = new Date(`${start.date}T00:00:00`)
        //     const max = new Date(`${end.date}T23:59:59`)
        //     const days = (max.getTime() - min.getTime()) / 86400000
        //     const eventCount = this.rnd(days, days + 20)

        //     for (let i = 0; i < eventCount; i++) {
        //       const allDay = this.rnd(0, 3) === 0
        //       const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        //       const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        //       const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        //       const second = new Date(first.getTime() + secondTimestamp)

        //       events.push({
        //         name: this.names[this.rnd(0, this.names.length - 1)],
        //         start: first,
        //         end: second,
        //         color: this.colors[this.rnd(0, this.colors.length -1)],
        //         timed: !allDay,
        //       })
        //     }

        //     this.events = events
        //   },
        //   rnd (a, b) {
        //     return Math.floor((b - a + 1) * Math.random()) + a
        //   },
    }

  
  }
</script>

<style lang="scss">
    .v-calendar-daily {
        cursor: pointer; 
    }

    .v-calendar-daily__day-interval {
      color: green;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

</style>