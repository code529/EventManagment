const fs = require("fs");

// Generate events data
const events = [];
const sportsOrganizers = [
  { name: "SportsFrenzy", phone: "123-456-7890", email: "info@sportsfrenzy.com" },
  { name: "PlayWorks", phone: "234-567-8901", email: "info@playworks.com" },
  { name: "GameOn", phone: "345-678-9012", email: "info@gameon.com" },
  { name: "FieldDay", phone: "456-789-0123", email: "info@fieldday.com" },
  { name: "SportingChampions", phone: "567-890-1234", email: "info@sportingchampions.com" },
  { name: "ActiveNation", phone: "678-901-2345", email: "info@activenation.com" },
  { name: "SportingHeroes", phone: "789-012-3456", email: "info@sportingheroes.com" },
  { name: "ChampionChasers", phone: "890-123-4567", email: "info@championchasers.com" },
  { name: "SportingStars", phone: "901-234-5678", email: "info@sportingstars.com" },
  { name: "AllSports", phone: "012-345-6789", email: "info@allsports.com" },
  { name: "AthleticAdventures", phone: "543-210-9876", email: "info@athleticadventures.com" },
  { name: "SportingNation", phone: "654-321-0987", email: "info@sportingnation.com" },
  { name: "TheSportsConnection", phone: "765-432-1098", email: "info@thesportsconnection.com" },
  { name: "ChampionMakers", phone: "876-543-2109", email: "info@championmakers.com" },
  { name: "SportingEdge", phone: "987-654-3210", email: "info@sportingedge.com" },
  { name: "VictoryZone", phone: "098-765-4321", email: "info@victoryzone.com" },
  { name: "SportingPassion", phone: "901-234-5678", email: "info@sportingpassion.com" },
  { name: "AthleticQuest", phone: "890-123-4567", email: "info@athleticquest.com" },
  { name: "SportingExcellence", phone: "789-012-3456", email: "info@sportingexcellence.com" },
  { name: "ChampionNation", phone: "678-901-2345", email: "info@championnation.com" },
  { name: "SportingPride", phone: "567-890-1234", email: "info@sportingpride.com" },
  { name: "AllPlay", phone: "456-789-0123", email: "info@allplay.com" },
  { name: "AthleticStars", phone: "345-678-9012", email: "info@athleticstars.com" },
  { name: "SportsUnlimited", phone: "234-567-8901", email: "info@sportsunlimited.com" }
]

const sports = [
    "Basketball", "Football", "Soccer", "Volleyball", "Baseball",
    "Hockey", "Tennis", "Golf", "Swimming", "Track and Field",
    "Boxing", "MMA", "Wrestling", "Weightlifting", "Rowing",
    "Cycling", "Triathlon", "Cricket", "Rugby", "Fencing",
    "Table Tennis", "Badminton", "Handball", "Water Polo", "Diving",
    "Gymnastics", "Figure Skating", "Skiing", "Snowboarding", "Bobsleigh",
    "Skeleton", "Luge", "Surfing", "Skateboarding", "Snowshoeing",
    "Cross-country Skiing", "Alpine Skiing", "Biathlon", "Speed Skating", "Short Track Speed Skating",
    "Curling", "Bandy", "Polo", "Archery", "Shooting",
    "Equestrian", "Paddleboarding", "Kiteboarding", "Canoeing", "Kayaking"
]
let sportImages = [
    "https://www.example.com/images/basketball.jpg",
    "https://www.example.com/images/football.jpg",
    "https://www.example.com/images/soccer.jpg",
    "https://www.example.com/images/volleyball.jpg",
    "https://www.example.com/images/baseball.jpg",
    "https://www.example.com/images/hockey.jpg",
    "https://www.example.com/images/tennis.jpg",
    "https://www.example.com/images/golf.jpg",
    "https://www.example.com/images/swimming.jpg",
    "https://www.example.com/images/track-and-field.jpg",
    "https://www.example.com/images/boxing.jpg",
    "https://www.example.com/images/mma.jpg",
    "https://www.example.com/images/wrestling.jpg",
    "https://www.example.com/images/weightlifting.jpg",
    "https://www.example.com/images/rowing.jpg",
    "https://www.example.com/images/cycling.jpg",
    "https://www.example.com/images/triathlon.jpg",
    "https://www.example.com/images/cricket.jpg",
    "https://www.example.com/images/rugby.jpg",
    "https://www.example.com/images/fencing.jpg",
    "https://www.example.com/images/table-tennis.jpg",
    "https://www.example.com/images/badminton.jpg",
    "https://www.example.com/images/handball.jpg",
    "https://www.example.com/images/water-polo.jpg",
    "https://www.example.com/images/diving.jpg",
    "https://www.example.com/images/gymnastics.jpg",
    "https://www.example.com/images/figure-skating.jpg",
    "https://www.example.com/images/skiing.jpg",
    "https://www.example.com/images/snowboarding.jpg",
    "https://www.example.com/images/bobsleigh.jpg",
    "https://www.example.com/images/skeleton.jpg",
    "https://www.example.com/images/luge.jpg",
    "https://www.example.com/images/surfing.jpg",
    "https://www.example.com/images/skateboarding.jpg",
    "https://www.example.com/images/snowshoeing.jpg",
    "https://www.example.com/images/cross-country-skiing.jpg",
    "https://www.example.com/images/alpine-skiing.jpg",
    "https://www.example.com/images/biathlon.jpg",
    "https://www.example.com/images/speed-skating.jpg",
    "https://www.example.com/images/short-track-speed-skating.jpg",
    "https://www.example.com/images/curling.jpg",
    "https://www.example.com/images/bandy.jpg",
    "https://www.example.com/images/polo.jpg",
    "https://www.example.com/images/archery.jpg",
    "https://www.example.com/images/shooting.jpg",
    "https://www.example.com/images/equestrian.jpg",
    "https://www.example.com/images/paddleboarding.jpg",
    "https://www.example.com/images/kiteboarding.jpg",
    "https://www.example.com/images/canoeing.jpg",
    "https://www.example.com/images/kayaking.jpg"
];

india_cities = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Bhopal", "Patna", "Ludhiana", "Agra", "Nashik", "Vadodara", "Faridabad", "Madurai", "Varanasi", "Jamshedpur", "Srinagar", "Amritsar", "Raipur", "Allahabad", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Mysore", "Guwahati", "Bhubaneswar", "Kota", "Salem", "Aligarh", "Bareilly", "Moradabad", "Gurgaon", "Jalandhar", "Tiruchirappalli", "Ambala", "Hisar", "Hubli-Dharwad", "Sambalpur", "Kurnool"]

for (let i = 1; i <= 1000 ; i++) {
  const randomDate = new Date(Date.now() + Math.floor(Math.random() * 60 * 60 * 24 * 30 * 1000));
  let randomIndex = Math.floor(Math.random() * sports.length);
  let randomCity = Math.floor(Math.random() * india_cities.length); 
  let sportOrganizeri = Math.floor(Math.random()*sportsOrganizers.length);
  let j = Math.floor(Math.random() * 100); 
  const event = {
    id: i,
    name: `Sports Event ${i}`,
    date: randomDate,
    location: india_cities[randomCity] ,
    description: `Join us for the ${j}th edition of the annual sports event in City ${j}!`,
    image: sportImages[randomIndex] , 
    organizer: {
      name: sportsOrganizers[sportOrganizeri].name ,
      email:  sportsOrganizers[sportOrganizeri].email , 
      phone: sportsOrganizers[sportOrganizeri].phone 
    },
    category : sports[randomIndex] , 
    price: Math.floor(Math.random() * 100) + 10
  };
  events.push(event);
}

// Write events data to data.json file
const data = JSON.stringify(events, null, 2);

fs.writeFile("data.json", data, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Events data written to data.json file.");
});

