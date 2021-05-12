<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
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
        <h2 v-if="currentEvents.length">Hi {{ this.name }} these are your current orders: </h2>
        <h2 v-else> You don't have any orders yet. </h2>
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
      <div> I AM LOGGED IN: {{ isUserLoggedIn }} </div>
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
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import jwt_decode from "jwt-decode";

const axios = require('axios');

const url = 'http://localhost:8080';

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
      isUserLoggedIn: false,
         
    }
  },

  created() {
    this.$store.dispatch('getUserId'); 

    this.initiCalendar(INITIAL_EVENTS);

    this.getUser();

   
    this.url = url;

    console.log("USER ID IN CREATED", this.userId);

  },

  mounted() {
      if (this.token) {
        this.isUserLoggedIn = true;
     }

    this.$store.dispatch('getUserId'); 
  },

  computed: {
    token(){
      return this.$store.getters.accessToken;
    },

    userId() {
      return this.$store.getters.getUserId;
    },

    name() {
      return this.$store.getters.getDecodedIdToken.name;
    },

    email() {
      return this.$store.getters.getDecodedIdToken.email;
    },
  },

  methods: {
    ...mapActions(['login', 'logout', 'getUserId']),

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

    getUser() {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token
      }

      let getUser = 'getUser';

      axios.get(`${url}/${getUser}/${this.userId}`, {
        headers: headers
      }).then(response => {
        let users = response.data;
        console.log("USERS ARRAY", users);
        if (!users.length) {
          this.sendUserDetails();
        }
      })
      .catch(error => {
        console.log("this is the error in getting the user", error);
      });


    },

    getBookings() {
      // let url = "https://booking-ms-dot-roberta-dev.nw.r.appspot.com",
       const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token
      }

      let getBookings = 'getbookings';
      
      axios.get(`${url}/${getBookings}/${this.userId}`, {
        headers: headers
      }).then(response => {
        let bookings = response.data;
        console.log("RESPONSE", response.data);

        bookings.forEach(booking => console.log( typeof booking.UserId ));
       
        let apiEvents = bookings.map(booking => this.bookingToEvent(booking));
        this.calendarOptions.events = [... apiEvents];
      })
      .catch(error => {
        console.log("this is the error", error);
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
  
    sendUserDetails() {
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token
      }
      let user = "user";
      const postPromise = axios.post(`${url}/${user}`, {
        userId: this.userId,
        name: this.name,
        email: this.email
      },
      {
        headers: headers
      }
      );
      postPromise.then((response) => {
        console.log(" this is the response",response);
      })
      .catch(error => {
        console.log("this is the error in posting a user",error);
      });

      return postPromise;
    },

    createBooking(selectInfo) {
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ this.token
      }
     
      let booking = "booking";
      
      const postPromise = axios.post(`${url}/${booking}`, {
        userId: this.userId,
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
        console.log("this is the error in creating a booking",error);
      });

      return postPromise;
    },

    // post request to send user details to back end 

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
