-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "sampleItinerary" JSONB;

-- Hand-curated, geographically accurate day-by-day routes replacing the
-- previous auto-generated itinerary (which cycled through Destination
-- records with no awareness that two records can be the same place).

UPDATE "Package" SET "sampleItinerary" = $json$[
  {"day": 1, "title": "Sigiriya & Dambulla", "region": "Central Province", "description": "Climb the UNESCO-listed Sigiriya Rock Fortress and explore the ancient cave temples of Dambulla, filled with centuries-old Buddhist murals and statues."},
  {"day": 2, "title": "Kandy", "region": "Central Province", "description": "Visit the Temple of the Sacred Tooth Relic, stroll the Royal Botanical Gardens in Peradeniya, and end the day with a traditional Kandyan dance show."},
  {"day": 3, "title": "Nuwara Eliya", "region": "Central Province", "description": "Drive through rolling tea plantations, visit a working tea factory, and take in the cool hill-country air around Gregory Lake."},
  {"day": 4, "title": "Ella — Nine Arches Bridge", "region": "Uva Province", "description": "Walk across the iconic Nine Arches Bridge, hike up Little Adam's Peak for sweeping valley views, and cool off at Ravana Falls."},
  {"day": 5, "title": "Udawalawe", "region": "Sabaragamuwa Province", "description": "Visit the Elephant Transit Home and head out on a wildlife safari through Udawalawe National Park, one of the best places in Sri Lanka to see wild elephants."}
]$json$::jsonb
WHERE "slug" = '5-day-tour';

UPDATE "Package" SET "sampleItinerary" = $json$[
  {"day": 1, "title": "Sigiriya & Dambulla", "region": "Central Province", "description": "Climb the UNESCO-listed Sigiriya Rock Fortress and explore the ancient cave temples of Dambulla, filled with centuries-old Buddhist murals and statues."},
  {"day": 2, "title": "Kandy", "region": "Central Province", "description": "Visit the Temple of the Sacred Tooth Relic, stroll the Royal Botanical Gardens in Peradeniya, and end the day with a traditional Kandyan dance show."},
  {"day": 3, "title": "Nuwara Eliya", "region": "Central Province", "description": "Drive through rolling tea plantations, visit a working tea factory, and take in the cool hill-country air around Gregory Lake."},
  {"day": 4, "title": "Ella — Nine Arches Bridge", "region": "Uva Province", "description": "Walk across the iconic Nine Arches Bridge, hike up Little Adam's Peak for sweeping valley views, and cool off at Ravana Falls."},
  {"day": 5, "title": "Udawalawe", "region": "Sabaragamuwa Province", "description": "Visit the Elephant Transit Home and head out on a wildlife safari through Udawalawe National Park, one of the best places in Sri Lanka to see wild elephants."},
  {"day": 6, "title": "Galle", "region": "Southern Province", "description": "Explore the UNESCO-listed Galle Fort, walk the historic ramparts, and browse the boutiques and cafés inside its Dutch colonial walls."},
  {"day": 7, "title": "Mirissa", "region": "Southern Province", "description": "Head out on a whale-watching boat trip (seasonal, Nov–Apr), then relax on Mirissa's beaches and the famous Coconut Tree Hill."}
]$json$::jsonb
WHERE "slug" = '7-day-tour';

UPDATE "Package" SET "sampleItinerary" = $json$[
  {"day": 1, "title": "Sigiriya & Dambulla", "region": "Central Province", "description": "Climb the UNESCO-listed Sigiriya Rock Fortress and explore the ancient cave temples of Dambulla, filled with centuries-old Buddhist murals and statues."},
  {"day": 2, "title": "Polonnaruwa", "region": "North Central Province", "description": "Explore the ruins of Sri Lanka's medieval capital — royal palaces, ancient stupas, and the carved Buddha statues of Gal Vihara."},
  {"day": 3, "title": "Minneriya Safari", "region": "North Central Province", "description": "Head out on a jeep safari at Minneriya National Park, famous for \"The Gathering\" — one of the largest wild elephant gatherings in Asia."},
  {"day": 4, "title": "Kandy", "region": "Central Province", "description": "Visit the Temple of the Sacred Tooth Relic, stroll the Royal Botanical Gardens in Peradeniya, and end the day with a traditional Kandyan dance show."},
  {"day": 5, "title": "Nuwara Eliya", "region": "Central Province", "description": "Drive through rolling tea plantations, visit a working tea factory, and take in the cool hill-country air around Gregory Lake."},
  {"day": 6, "title": "Ella — Nine Arches Bridge", "region": "Uva Province", "description": "Walk across the iconic Nine Arches Bridge, hike up Little Adam's Peak for sweeping valley views, and cool off at Ravana Falls."},
  {"day": 7, "title": "Yala National Park", "region": "Southern Province", "description": "An early-morning safari through Yala, Sri Lanka's most famous national park and home to one of the highest leopard densities in the world."},
  {"day": 8, "title": "Mirissa", "region": "Southern Province", "description": "Head out on a whale-watching boat trip (seasonal, Nov–Apr), then relax on Mirissa's beaches and the famous Coconut Tree Hill."},
  {"day": 9, "title": "Galle", "region": "Southern Province", "description": "Explore the UNESCO-listed Galle Fort, walk the historic ramparts, and browse the boutiques and cafés inside its Dutch colonial walls."},
  {"day": 10, "title": "Bentota", "region": "Southern Province", "description": "Try water sports along the Bentota coastline, take a boat safari through the Madu River's mangroves, and stop at the Pinnawala Elephant Orphanage on the way back to Colombo."}
]$json$::jsonb
WHERE "slug" = '10-day-tour';

UPDATE "Package" SET "sampleItinerary" = $json$[
  {"day": 1, "title": "Negombo", "region": "Western Province", "description": "Settle in near a traditional fishing village, visit the bustling fish market, and relax on Negombo's beach after your flight in."},
  {"day": 2, "title": "Anuradhapura", "region": "North Central Province", "description": "Explore Sri Lanka's first ancient capital — centuries-old dagobas, sacred Bodhi trees, and ruins spread across a vast archaeological park."},
  {"day": 3, "title": "Polonnaruwa", "region": "North Central Province", "description": "Explore the ruins of Sri Lanka's medieval capital — royal palaces, ancient stupas, and the carved Buddha statues of Gal Vihara."},
  {"day": 4, "title": "Minneriya Safari", "region": "North Central Province", "description": "Head out on a jeep safari at Minneriya National Park, famous for \"The Gathering\" — one of the largest wild elephant gatherings in Asia."},
  {"day": 5, "title": "Sigiriya & Dambulla", "region": "Central Province", "description": "Climb the UNESCO-listed Sigiriya Rock Fortress and explore the ancient cave temples of Dambulla, filled with centuries-old Buddhist murals and statues."},
  {"day": 6, "title": "Kandy", "region": "Central Province", "description": "Visit the Temple of the Sacred Tooth Relic, stroll the Royal Botanical Gardens in Peradeniya, and end the day with a traditional Kandyan dance show."},
  {"day": 7, "title": "Nuwara Eliya", "region": "Central Province", "description": "Drive through rolling tea plantations, visit a working tea factory, and take in the cool hill-country air around Gregory Lake."},
  {"day": 8, "title": "Ella — Nine Arches Bridge", "region": "Uva Province", "description": "Walk across the iconic Nine Arches Bridge, hike up Little Adam's Peak for sweeping valley views, and cool off at Ravana Falls."},
  {"day": 9, "title": "Yala National Park", "region": "Southern Province", "description": "An early-morning safari through Yala, Sri Lanka's most famous national park and home to one of the highest leopard densities in the world."},
  {"day": 10, "title": "Mirissa", "region": "Southern Province", "description": "Head out on a whale-watching boat trip (seasonal, Nov–Apr), then relax on Mirissa's beaches and the famous Coconut Tree Hill."},
  {"day": 11, "title": "Galle", "region": "Southern Province", "description": "Explore the UNESCO-listed Galle Fort, walk the historic ramparts, and browse the boutiques and cafés inside its Dutch colonial walls."},
  {"day": 12, "title": "Bentota", "region": "Southern Province", "description": "Try water sports along the Bentota coastline and take a boat safari through the Madu River's mangroves and river islands."},
  {"day": 13, "title": "Colombo", "region": "Western Province", "description": "Tour Sri Lanka's capital — Galle Face Green, Gangaramaya Temple, and the colonial-era Fort district — with a stop at the Pinnawala Elephant Orphanage along the way."},
  {"day": 14, "title": "Departure", "region": "Western Province", "description": "Transfer to the airport for your onward journey, with time for last-minute souvenir shopping."}
]$json$::jsonb
WHERE "slug" = '14-day-tour';

UPDATE "Package" SET "sampleItinerary" = $json$[
  {"day": 1, "title": "Sigiriya & Dambulla", "region": "Central Province", "description": "Climb the UNESCO-listed Sigiriya Rock Fortress and explore the ancient cave temples of Dambulla, filled with centuries-old Buddhist murals and statues."},
  {"day": 2, "title": "Kandy", "region": "Central Province", "description": "Visit the Temple of the Sacred Tooth Relic, stroll the Royal Botanical Gardens in Peradeniya, and end the day with a traditional Kandyan dance show."},
  {"day": 3, "title": "Nuwara Eliya", "region": "Central Province", "description": "Drive through rolling tea plantations, visit a working tea factory, and take in the cool hill-country air around Gregory Lake."},
  {"day": 4, "title": "Ella — Nine Arches Bridge", "region": "Uva Province", "description": "Walk across the iconic Nine Arches Bridge, hike up Little Adam's Peak for sweeping valley views, and cool off at Ravana Falls."},
  {"day": 5, "title": "Udawalawe", "region": "Sabaragamuwa Province", "description": "Visit the Elephant Transit Home and head out on a wildlife safari through Udawalawe National Park, one of the best places in Sri Lanka to see wild elephants."},
  {"day": 6, "title": "Galle", "region": "Southern Province", "description": "Explore the UNESCO-listed Galle Fort, walk the historic ramparts, and browse the boutiques and cafés inside its Dutch colonial walls."},
  {"day": 7, "title": "Mirissa", "region": "Southern Province", "description": "Head out on a whale-watching boat trip (seasonal, Nov–Apr), then relax on Mirissa's beaches and the famous Coconut Tree Hill."}
]$json$::jsonb
WHERE "slug" = 'customized-tour';
