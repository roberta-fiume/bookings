<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            :checked='calendarOptions.weekends'
            @change='handleWeekendsToggle'
          />
          toggle weekends
        </label>
 
      </div>
      <div class='demo-app-sidebar-section'>
        <h1>My orders</h1>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ bookingSlot }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <v-btn>
          <router-link to="/"> Home </router-link>
      </v-btn>
      <v-btn @click="logout">
        Logout
      </v-btn>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
          <i> {{ bookingSlot}} </i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>


<script>
/* eslint-disable no-unused-vars*/ 
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../event-utils'

const axios = require('axios');

const url = 'http://localhost:8080';


// const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNpZURnVFZIeTVZYlJSejJsZXgzTCJ9.eyJpc3MiOiJodHRwczovL2Rldi0yM3luaWttNS5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjA0OGZkNWM0YTAyYmIwMDY5MDhiYjk5IiwiYXVkIjoiaHR0cHM6Ly9zdXBlcm1hcmtldC5jb20iLCJpYXQiOjE2MTYwNzkxNjIsImV4cCI6MTYxNjE2NTU2MiwiYXpwIjoiRk1UOEJUNmQyMm5zaHhIM1RYNnhmUldiUFM3OVFKN2YiLCJzY29wZSI6InJlYWQ6Ym9va2luZ3Mgd3JpdGU6Ym9va2luZ3MiLCJndHkiOiJwYXNzd29yZCJ9.ikZ6xDwFHLk0b_XI3IdQJ7E6BZOLpP1YhJdgsIFZY1F4MAV0ZykIvT0kipjWviFUNJJuaX6AhLqqzEs163UVmlAg-irE2z_bPe5-Da-c38JWQyCqw682XbmzzmPwr_xuEPquzU9tu8OJQSUI84hPd93eJzGTdsWVbqioSs22RQOS604-siFg55mwkKTHWUJa_AYidIQIS99OJzQShMa9bHdCsWau6h4cgBztcRzD-Lg53BSgI_B9qhynhwP4dJe72Ntn5Q4nYAbt65hQytG2jLQyFjNmtl7R3gBshHy3Y5_paRpYFXPaI_vh_UGgeLN58HZesRG6oV5g24qAM9Th6Q";


import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {

  components: {
    FullCalendar // make the <FullCalendar> tag available
  },

  data: function() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek'
        },
        initialView: 'timeGridWeek',
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        events: [],
        //   { title: 'event 1', date: '2021-02-24T10:00' },
        //   { title: 'event 2', date: '2021-02-25' }
        // ],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,

        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      bookingSlot: null,
         
    }
  },

  created() {
     this.initiCalendar(INITIAL_EVENTS);
     this.url = url;
    console.log("GETTERS IN COMPUTED", this.$store.getters.accessToken);
      // this.token = token
  },

  mounted() {
    console.log("THIS IS THE TOKEN IN MOUNTED", this.token);
  },

  computed: {
     token(){
       return this.$store.getters.accessToken
     },
  },

  methods: {

    // ...mapActions(['updateToken']),

    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },

    handleDateSelect(selectInfo) {
      console.log("Select info", selectInfo);
      let title = confirm('Booking confirmed!');
      let calendarApi = selectInfo.view.calendar;
      this.bookingSlot = "Booked";
      calendarApi.unselect() // clear date selection

          if (title) {
            calendarApi.addEvent({
              id: createEventId(),
                //   title: "Booked!",
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay
            })
          }

      this.createBooking(selectInfo);
    },

    initiCalendar() {
      this.getBookings();
    },

    getBookings() {
      // let url = "https://booking-ms-dot-roberta-dev.nw.r.appspot.com",
       const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token
      }

      console.log("HEADERSSSSS", headers);
      axios.get(url, {
        headers: headers
      }).then(response => {
        let bookings = response.data;
        console.log("RESPONSE", response.data);
        let apiEvents = bookings.map(booking => this.bookingToEvent(booking));
        this.calendarOptions.events = [... apiEvents];
      })
      .catch(error => {
        console.log("this is the error", error);
        // alert("THERE SOMETHING WRONG  WITH YOUR REQUEST. PLEASE TRY AGAIN", error.status);
      });

    },

    bookingToEvent(booking) { //factory function 
      let event = {
        id: booking.id,
        title: "Booked",
        start: booking.date,
        allDay: false,
      };
      return event;
    },

    createBookingId() {
      return Math.floor((Math.random() * 90000) + 10000);
    },

    createBooking(selectInfo) {
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token
      }
      let userId = this.createBookingId();
      let booking = "booking";
      const postPromise = axios.post(`${url}/${booking}`, {
        user_id: userId,
        date: selectInfo.start
      },
      {
        headers: headers
      }
      );
      postPromise.then((response) => {
        console.log(" this is the response",response);
      })
      .catch(error => {
        console.log("this is the error",error);
      });

      return postPromise;
    },

    handleEventClick(clickInfo) { 
      console.log("THIS IS CLICK INFO", clickInfo); 
      let booking = "booking";   
      let id = clickInfo.id ;
      if (confirm(`Are you sure you want to cancel this delivery?`)) {
        clickInfo.event.remove();
      }
      axios.delete(`${url}/${booking}/${id}`).then(response => {
          console.log(" this is the response",response);
        })
        .catch(error => {
        console.log("this is the error",error);
      });
    },

    handleEvents(events) {
      console.log("eventsSet", events);
      this.currentEvents = events
    }
  }
}
</script>

<style lang='css'>

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

</style>
