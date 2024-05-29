#! /usr/bin/env node

console.log(
    'This script populates some test events, organizers, venues and participants to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);

  const Venue = require('./models/venue')
  const Event = require('./models/Event')
  const Organizer = require('./models/organizer')
  const Participant = require('./models/participant')

  const venues = [];
  const events = [];
  const organizers = [];
  const participants = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    // await createVenues();
    // await createParticipants();
    // await createOrganizers();
    await createEvents();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

  async function venueCreate(index, name, address, capacity) {
    const venue = new Venue({ name, address, capacity })
    await venue.save()
    venues[index] = venue
    console.log(`Added venue: ${name}`)
  }

  async function organizerCreate(index, name, email) {
    const organizer = new Organizer({ name, email, })
    await organizer.save()
    organizers[index] = organizer
  }

  async function participantCreate(index, name, email) {
    const participant = new Participant({ name, email})
    await participant.save()
    participants[index] = participant
  }

  async function eventCreate(index, name, description, date, Venue, organizers, participants) {
    const eventDetail = {
        name, description, date, Venue, organizers, participants
    }
    const event = new Event(eventDetail)
    await event.save()
    events[index] = event
    console.log(`Added event ${name}`)
  }

  async function createOrganizers() {
    console.log("Adding organizers")
    await Promise.all([
        organizerCreate(0, "John Smith", "johnsmith@example.com"),
        organizerCreate(1, "Elena Owens", "elenaowens@example.com"),
        organizerCreate(2, "Kay Lena", "kaylena@example.com"),
    ])
  }

  async function createParticipants() {
    console.log("Adding participants")
    await Promise.all([
        participantCreate(0, "John Mikko", "johnmikko@example.com"),
        participantCreate(1, "Joel Mo", "joelmoexample.com"),
        participantCreate(2, "Patty Mills", "pattymills@example.com"),

    ])
  }

  async function createVenues() {
    console.log("Adding venues")
    await Promise.all([
        venueCreate(0, "Arizona", "9234 Negra Arroyo Lane", 200),
        venueCreate(1, "San Francisco", "1000 Holloway Avenue", 100),
        venueCreate(2, "Oakland", "3214 Oakland Street", 50),
    ])
  }

  async function createEvents() {
    console.log("Adding Events")
    eventCreate(0,
        "Eraserheads Concert",
        "Filipino band is performing",
        new Date(),
        venues[0],
        organizers[0],
        participants
    ),
    eventCreate(1,
        "NBA Finals",
        "Celtics vs Mavericks",
        new Date(),
        venues[1],
        organizers[1],
        participants
    ), 
    eventCreate(2,
        "Warriors vs Lakers",
        "Battle of the Olds",
        new Date(),
        venues[2],
        organizers[2],
        participants
    )
  }



  
  