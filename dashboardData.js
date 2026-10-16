/**
 * JUMEIRAH ISLANDS DIGITAL TWIN - CAMERA REGISTRY & TELEMETRY DATABASE
 * 16 Site Camera Stations (460+ Timelapse Frames) + 3 BIM Target Renders
 * Accurate 3D Spatial Positions, Floor Groupings, Azimuth, and Timestamp Tracking
 */

const SITE_DATA = {
  "project": {
    "id": "JI-VILLA-003",
    "name": "Jumeirah Islands Luxury Villa 003",
    "location": "Cluster 3, Jumeirah Islands, Dubai, United Arab Emirates",
    "coordinates": {
      "lat": 25.0617,
      "lng": 55.1528
    },
    "developer": "Private Client",
    "consultant": "ONIX Engineering Consultancy",
    "contractor": "VH Contracting LLC",
    "asBuiltDate": "October 2026",
    "status": "Superstructure & Interior Fitout (84% Complete)",
    "siteArea": "12,450 sq.ft",
    "builtUpArea": "9,800 sq.ft",
    "floors": "LG + G + 1 + Roof Terrace",
    "zones": [
      "Site Perimeter & Driveway",
      "Lower Ground Wellness Lobby",
      "Ground Floor Grand Foyer & Khutoot Wall",
      "Ground Floor Formal Living & Dining",
      "First Floor Master Suite & Terraces",
      "First Floor Secondary Suites (Ayat, Dua, Nur, Jannah)",
      "Roof Terrace & Solar Pergola",
      "Rear Infinity Pool & Waterfront Shoreline"
    ]
  },
  "weather": {
    "temp": "34°C",
    "condition": "Sunny / Clear Skies",
    "humidity": "48%",
    "wind": "14 km/h NW",
    "uv": "8.5 High",
    "solarIrradiance": "840 W/m²",
    "airQuality": "Good (AQI 32)"
  },
  "progress": {
    "overall": 84,
    "milestones": [
      {
        "name": "Shoring, Piling & Dewatering",
        "pct": 100
      },
      {
        "name": "Basement & Lower Ground RCC",
        "pct": 100
      },
      {
        "name": "Superstructure (G+1+R Concrete)",
        "pct": 96
      },
      {
        "name": "Khutoot Wall Structural Framing",
        "pct": 90
      },
      {
        "name": "Facade Glazing & Louvers",
        "pct": 86
      },
      {
        "name": "Flooring Screed & Marble Works",
        "pct": 75
      },
      {
        "name": "Infinity Pool & Lake Shoreline",
        "pct": 72
      },
      {
        "name": "Landscape, Carport & Trellis",
        "pct": 68
      }
    ]
  },
  "cameras": [
    {
      "id": "CAM-01",
      "code": "EXT-FRONT-MAIN",
      "title": "Exterior Front Main Entrance",
      "category": "exterior-front",
      "floor": "exterior",
      "folder": "Exterior Front Main Entrance",
      "filename": "site-pictures/Exterior Front Main Entrance/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "1.65 m (Eye Level)",
      "azimuth": "180° South Facade",
      "fov": 75,
      "description": "Direct head-on view of the main double-height glass portal entrance, front cantilever slab, wooden louvers, driveway staging, and scaffolding.",
      "position": {
        "x": -2,
        "y": 3.5,
        "z": 32
      },
      "target": {
        "x": -1,
        "y": 7,
        "z": 0
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/Exterior Front Main Entrance/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-02",
      "code": "EXT-FRONT-SIDE",
      "title": "Exterior Front Side (Wide Angle)",
      "category": "exterior-front",
      "floor": "exterior",
      "folder": "Exterior front side",
      "filename": "site-pictures/Exterior front side/20261014090000.jpg",
      "date": "14 Oct 2026 • 09:00 (9:00 AM)",
      "timeFormatted": "09:00 GST",
      "height": "2.80 m (Elevated Corner)",
      "azimuth": "215° SW Perspective",
      "fov": 82,
      "description": "Wide angle perspective from the southwest corner showing front cantilevered upper suites, carport canopy wing, and neighboring villa construction.",
      "position": {
        "x": -26,
        "y": 6.5,
        "z": 28
      },
      "target": {
        "x": 4,
        "y": 6,
        "z": -2
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior front side/20261013080000.jpg",
          "date": "13 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013080000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013083000.jpg",
          "date": "13 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013083000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013090000.jpg",
          "date": "13 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013090000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013093000.jpg",
          "date": "13 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013093000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013100000.jpg",
          "date": "13 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013100000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013103000.jpg",
          "date": "13 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013103000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013110000.jpg",
          "date": "13 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013110000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013113000.jpg",
          "date": "13 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013113000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013120000.jpg",
          "date": "13 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013120000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013123000.jpg",
          "date": "13 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013123000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013130000.jpg",
          "date": "13 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013130000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013133000.jpg",
          "date": "13 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013133000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013140000.jpg",
          "date": "13 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013140000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013143000.jpg",
          "date": "13 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013143000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013150000.jpg",
          "date": "13 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013150000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013153000.jpg",
          "date": "13 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013153000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013160000.jpg",
          "date": "13 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013160000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013163000.jpg",
          "date": "13 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013163000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013170000.jpg",
          "date": "13 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013170000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013173000.jpg",
          "date": "13 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013173000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261013180000.jpg",
          "date": "13 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013180000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/Exterior front side/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        }
      ]
    },
    {
      "id": "CAM-03",
      "code": "EXT-FRONT-YARD",
      "title": "Exterior Front Yard (Aerial Top-Down)",
      "category": "exterior-front",
      "floor": "exterior",
      "folder": "Exterior front yard",
      "filename": "site-pictures/Exterior front yard/20261014140000.jpg",
      "date": "14 Oct 2026 • 14:00 (2:00 PM)",
      "timeFormatted": "14:00 GST",
      "height": "8.50 m (Upper Terrace Overhead)",
      "azimuth": "175° Looking Down",
      "fov": 88,
      "description": "Elevated vantage point looking down upon the front yard sand staging, perimeter palm trees along the boundary wall, and entry driveway pergola.",
      "position": {
        "x": 0,
        "y": 15,
        "z": 14
      },
      "target": {
        "x": 0,
        "y": 0.5,
        "z": 26
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior front yard/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/Exterior front yard/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        }
      ]
    },
    {
      "id": "CAM-04",
      "code": "EXT-PARKING",
      "title": "Exterior Parking & Carport Canopy",
      "category": "exterior-front",
      "floor": "exterior",
      "folder": "Exterior Parking",
      "filename": "site-pictures/Exterior Parking/20261013180000.jpg",
      "date": "13 Oct 2026 • 18:00 (6:00 PM)",
      "timeFormatted": "18:00 GST",
      "height": "3.20 m (Front Perimeter)",
      "azimuth": "145° SE Perspective",
      "fov": 78,
      "description": "Extended cantilevered parking garage, carport pergola canopy, wrapped date palms, perimeter lighting, and boundary fence.",
      "position": {
        "x": 22,
        "y": 6,
        "z": 26
      },
      "target": {
        "x": -4,
        "y": 5.5,
        "z": 0
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior Parking/20261013130000.jpg",
          "date": "13 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013130000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013133000.jpg",
          "date": "13 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013133000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013140000.jpg",
          "date": "13 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013140000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013143000.jpg",
          "date": "13 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013143000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013150000.jpg",
          "date": "13 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013150000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013153000.jpg",
          "date": "13 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013153000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013160000.jpg",
          "date": "13 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013160000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013163000.jpg",
          "date": "13 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013163000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013170000.jpg",
          "date": "13 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013170000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013173000.jpg",
          "date": "13 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013173000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261013180000.jpg",
          "date": "13 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-13",
          "rawTimestamp": "20261013180000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior Parking/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        }
      ]
    },
    {
      "id": "CAM-05",
      "code": "EXT-REAR-ELEV",
      "title": "Exterior Rear Elevation (Pool Deck)",
      "category": "exterior-rear",
      "floor": "exterior",
      "folder": "Exterior Rear Elevation",
      "filename": "site-pictures/Exterior Rear Elevation/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "1.80 m (Garden Level)",
      "azimuth": "0° North Rear Facade",
      "fov": 76,
      "description": "Direct view of the 3-level rear facade, glass balcony balustrades, luxury infinity pool with organic channel, ground lounge, and neighboring villas.",
      "position": {
        "x": -0.5,
        "y": 4,
        "z": -34
      },
      "target": {
        "x": 0,
        "y": 7.5,
        "z": 0
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-06",
      "code": "EXT-REAR-SHORING",
      "title": "Exterior Rear Elevation & Waterfront Shoring",
      "category": "exterior-rear",
      "floor": "exterior",
      "folder": "Exterior Rear Elevation Shoring",
      "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "4.50 m (Waterfront Boundary)",
      "azimuth": "35° NE Perspective",
      "fov": 84,
      "description": "Elevated wide angle showing the luxury swimming pool basin, lake frontage with shoring piles, side facade louvers, and water edge.",
      "position": {
        "x": -28,
        "y": 8.5,
        "z": -34
      },
      "target": {
        "x": 4,
        "y": 6.5,
        "z": -2
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Shoring/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-07",
      "code": "EXT-REAR-RAMP",
      "title": "Exterior Rear Elevation Ramp",
      "category": "exterior-rear",
      "floor": "exterior",
      "folder": "Exterior Rear Elevation Ramp",
      "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "3.20 m (Ramp Pathway)",
      "azimuth": "330° NW Perspective",
      "fov": 80,
      "description": "Side ramp pathway inspection overlooking 3-tier rear glass terraces, swimming pool construction, and eastern boundary wall.",
      "position": {
        "x": -24,
        "y": 6,
        "z": -24
      },
      "target": {
        "x": 2,
        "y": 7,
        "z": -4
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/Exterior Rear Elevation Ramp/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-08",
      "code": "EXT-REAR-LAKE",
      "title": "Exterior Rear Lake & Garden Perspective",
      "category": "exterior-rear",
      "floor": "exterior",
      "folder": "Exterior rear",
      "filename": "site-pictures/Exterior rear/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "2.60 m (Lake Embankment)",
      "azimuth": "315° NW Lake View",
      "fov": 78,
      "description": "Panoramic view from the lake shore edge looking up at the infinity pool waterfall coping and rear architectural cantilever terraces.",
      "position": {
        "x": 18,
        "y": 5.5,
        "z": -30
      },
      "target": {
        "x": -2,
        "y": 6,
        "z": -4
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/Exterior rear/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/Exterior rear/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-09",
      "code": "GF-KHUTOOT-WALL",
      "title": "GF Main Entrance Khutoot Wall",
      "category": "interior-gf",
      "floor": "ground",
      "folder": "GF Main Entrance Khutoot Wall",
      "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925080000.jpg",
      "date": "25 Sep 2026 • 08:00 (8:00 AM)",
      "timeFormatted": "08:00 GST",
      "height": "2.40 m (Grand Foyer)",
      "azimuth": "0° North (Foyer)",
      "fov": 76,
      "description": "Double-height main entrance foyer featuring structural steel framing and stone backing for the signature Arabic Khutoot calligraphy feature wall.",
      "position": {
        "x": -1,
        "y": 2.4,
        "z": 8.5
      },
      "target": {
        "x": -1,
        "y": 2.6,
        "z": 3
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924080000.jpg",
          "date": "24 Sep 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924080000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924083000.jpg",
          "date": "24 Sep 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924083000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924090000.jpg",
          "date": "24 Sep 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924090000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924093000.jpg",
          "date": "24 Sep 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924093000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924100000.jpg",
          "date": "24 Sep 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924100000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924103000.jpg",
          "date": "24 Sep 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924103000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924110000.jpg",
          "date": "24 Sep 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924110000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924113000.jpg",
          "date": "24 Sep 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924113000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924120000.jpg",
          "date": "24 Sep 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924120000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924123000.jpg",
          "date": "24 Sep 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924123000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924130000.jpg",
          "date": "24 Sep 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924130000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924133000.jpg",
          "date": "24 Sep 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924133000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924140000.jpg",
          "date": "24 Sep 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924140000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924143000.jpg",
          "date": "24 Sep 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924143000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924150000.jpg",
          "date": "24 Sep 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924150000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924153000.jpg",
          "date": "24 Sep 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924153000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924160000.jpg",
          "date": "24 Sep 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924160000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924163000.jpg",
          "date": "24 Sep 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924163000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924170000.jpg",
          "date": "24 Sep 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924170000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924173000.jpg",
          "date": "24 Sep 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924173000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260924180000.jpg",
          "date": "24 Sep 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-09-24",
          "rawTimestamp": "20260924180000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925080000.jpg",
          "date": "25 Sep 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925080000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925083000.jpg",
          "date": "25 Sep 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925083000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925090000.jpg",
          "date": "25 Sep 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925090000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925093000.jpg",
          "date": "25 Sep 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925093000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925100000.jpg",
          "date": "25 Sep 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925100000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925103000.jpg",
          "date": "25 Sep 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925103000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925110000.jpg",
          "date": "25 Sep 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925110000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925113000.jpg",
          "date": "25 Sep 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925113000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925120000.jpg",
          "date": "25 Sep 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925120000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925123000.jpg",
          "date": "25 Sep 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925123000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925130000.jpg",
          "date": "25 Sep 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925130000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925133000.jpg",
          "date": "25 Sep 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925133000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925140000.jpg",
          "date": "25 Sep 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925140000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925143000.jpg",
          "date": "25 Sep 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925143000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925150000.jpg",
          "date": "25 Sep 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925150000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925153000.jpg",
          "date": "25 Sep 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925153000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925160000.jpg",
          "date": "25 Sep 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925160000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925163000.jpg",
          "date": "25 Sep 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925163000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925170000.jpg",
          "date": "25 Sep 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925170000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925173000.jpg",
          "date": "25 Sep 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925173000"
        },
        {
          "filename": "site-pictures/GF Main Entrance Khutoot Wall/20260925180000.jpg",
          "date": "25 Sep 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-09-25",
          "rawTimestamp": "20260925180000"
        }
      ]
    },
    {
      "id": "CAM-10",
      "code": "GF-LIVING-ROOM",
      "title": "GF Living Room (Pool View Panoramic)",
      "category": "interior-gf",
      "floor": "ground",
      "folder": "GF Living Room",
      "filename": "site-pictures/GF Living Room/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "2.20 m (Main Lounge)",
      "azimuth": "355° North (Lake Facing)",
      "fov": 80,
      "description": "Open-plan ground floor formal living lounge looking towards the rear terrace glazing, infinity swimming pool, and lake horizon.",
      "position": {
        "x": 5,
        "y": 2.4,
        "z": -3
      },
      "target": {
        "x": 5,
        "y": 2.2,
        "z": -18
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/GF Living Room/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        },
        {
          "filename": "site-pictures/GF Living Room/20261015103000.jpg",
          "date": "15 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015103000"
        }
      ]
    },
    {
      "id": "CAM-11",
      "code": "GF-CORRIDOR",
      "title": "GF Living & Central Corridor",
      "category": "interior-gf",
      "floor": "ground",
      "folder": "GF living & corridor",
      "filename": "site-pictures/GF living & corridor/20260930173000.jpg",
      "date": "30 Sep 2026 • 17:30 (5:30 PM)",
      "timeFormatted": "17:30 GST",
      "height": "2.30 m (Central Hallway)",
      "azimuth": "70° East",
      "fov": 78,
      "description": "Ground floor spine corridor connecting the grand foyer, show kitchen, family dining hall, and guest suites.",
      "position": {
        "x": -6,
        "y": 2.4,
        "z": 2
      },
      "target": {
        "x": 4,
        "y": 2.4,
        "z": -2
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/GF living & corridor/20260930080000.jpg",
          "date": "30 Sep 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930080000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930083000.jpg",
          "date": "30 Sep 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930083000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930090000.jpg",
          "date": "30 Sep 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930090000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930093000.jpg",
          "date": "30 Sep 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930093000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930100000.jpg",
          "date": "30 Sep 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930100000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930103000.jpg",
          "date": "30 Sep 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930103000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930110000.jpg",
          "date": "30 Sep 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930110000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930113000.jpg",
          "date": "30 Sep 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930113000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930120000.jpg",
          "date": "30 Sep 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930120000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930123000.jpg",
          "date": "30 Sep 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930123000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930130000.jpg",
          "date": "30 Sep 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930130000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930133000.jpg",
          "date": "30 Sep 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930133000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930140000.jpg",
          "date": "30 Sep 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930140000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930143000.jpg",
          "date": "30 Sep 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930143000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930150000.jpg",
          "date": "30 Sep 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930150000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930153000.jpg",
          "date": "30 Sep 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930153000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930160000.jpg",
          "date": "30 Sep 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930160000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930163000.jpg",
          "date": "30 Sep 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930163000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930170000.jpg",
          "date": "30 Sep 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930170000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930173000.jpg",
          "date": "30 Sep 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930173000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930180000.jpg",
          "date": "30 Sep 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930180000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930183000.jpg",
          "date": "30 Sep 2026",
          "time": "18:30 (6:30 PM)",
          "timeShort": "18:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930183000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930190000.jpg",
          "date": "30 Sep 2026",
          "time": "19:00 (7:00 PM)",
          "timeShort": "19:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930190000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930193000.jpg",
          "date": "30 Sep 2026",
          "time": "19:30 (7:30 PM)",
          "timeShort": "19:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930193000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930200000.jpg",
          "date": "30 Sep 2026",
          "time": "20:00 (8:00 PM)",
          "timeShort": "20:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930200000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930203000.jpg",
          "date": "30 Sep 2026",
          "time": "20:30 (8:30 PM)",
          "timeShort": "20:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930203000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930210000.jpg",
          "date": "30 Sep 2026",
          "time": "21:00 (9:00 PM)",
          "timeShort": "21:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930210000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930213000.jpg",
          "date": "30 Sep 2026",
          "time": "21:30 (9:30 PM)",
          "timeShort": "21:30",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930213000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20260930220000.jpg",
          "date": "30 Sep 2026",
          "time": "22:00 (10:00 PM)",
          "timeShort": "22:00",
          "isoDate": "2026-09-30",
          "rawTimestamp": "20260930220000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001080000.jpg",
          "date": "01 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001080000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001083000.jpg",
          "date": "01 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001083000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001090000.jpg",
          "date": "01 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001090000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001093000.jpg",
          "date": "01 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001093000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001100000.jpg",
          "date": "01 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001100000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001103000.jpg",
          "date": "01 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001103000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001110000.jpg",
          "date": "01 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001110000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001113000.jpg",
          "date": "01 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001113000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001120000.jpg",
          "date": "01 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001120000"
        },
        {
          "filename": "site-pictures/GF living & corridor/20261001123000.jpg",
          "date": "01 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20261001123000"
        }
      ]
    },
    {
      "id": "CAM-12",
      "code": "FF-MASTER-BED",
      "title": "FF Master Bedroom Suite",
      "category": "interior-ff",
      "floor": "first",
      "folder": "FF Master Bedroom",
      "filename": "site-pictures/FF Master Bedroom/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "6.80 m (Upper Floor)",
      "azimuth": "135° SE",
      "fov": 80,
      "description": "First floor master bedroom suite with expansive cantilevered private terrace, glass balustrades, and walk-in wardrobe layout.",
      "position": {
        "x": -8,
        "y": 6.8,
        "z": 6
      },
      "target": {
        "x": -4,
        "y": 6.5,
        "z": 0
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/FF Master Bedroom/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/FF Master Bedroom/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-13",
      "code": "FF-AYAT-DUA",
      "title": "FF Ayat & Dua Bedroom Suite",
      "category": "interior-ff",
      "floor": "first",
      "folder": "FF Ayat & Dua's Bedroom",
      "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "6.80 m (Upper Floor)",
      "azimuth": "350° North",
      "fov": 76,
      "description": "First floor en-suite bedroom overlooking the rear pool terrace and Jumeirah Islands central lake waterway.",
      "position": {
        "x": 7,
        "y": 6.8,
        "z": -4
      },
      "target": {
        "x": 5,
        "y": 6.5,
        "z": -16
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/FF Ayat & Dua's Bedroom/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-14",
      "code": "FF-NUR-JANNAH",
      "title": "FF Nur & Jannah Bedroom Suite",
      "category": "interior-ff",
      "floor": "first",
      "folder": "FF Nur & Jannah Bedroom",
      "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "6.80 m (Upper Floor)",
      "azimuth": "340° NNW",
      "fov": 78,
      "description": "First floor family bedroom suite with floor-to-ceiling acoustic glazing, en-suite bathroom rough-ins, and terrace access.",
      "position": {
        "x": -9,
        "y": 6.8,
        "z": -6
      },
      "target": {
        "x": -6,
        "y": 6.5,
        "z": -16
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        },
        {
          "filename": "site-pictures/FF Nur & Jannah Bedroom/20261015103000.jpg",
          "date": "15 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015103000"
        }
      ]
    },
    {
      "id": "CAM-15",
      "code": "FF-LOBBY-FLOORING",
      "title": "FF Lobby Area Flooring Works",
      "category": "interior-ff",
      "floor": "first",
      "folder": "FF Lobby Area Flooring Works",
      "filename": "site-pictures/FF Lobby Area Flooring Works/20261014143000.jpg",
      "date": "14 Oct 2026 • 14:30 (2:30 PM)",
      "timeFormatted": "14:30 GST",
      "height": "6.80 m (Upper Floor)",
      "azimuth": "180° South Gallery",
      "fov": 82,
      "description": "Upper floor central gallery bridge and elevator landing displaying screed leveling and imported Italian marble flooring installation.",
      "position": {
        "x": -1,
        "y": 6.8,
        "z": 4
      },
      "target": {
        "x": -1,
        "y": 4,
        "z": -2
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261015090000.jpg",
          "date": "15 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015090000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261015093000.jpg",
          "date": "15 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015093000"
        },
        {
          "filename": "site-pictures/FF Lobby Area Flooring Works/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-16",
      "code": "LG-LOBBY",
      "title": "LG Lower Ground Lobby & Lightwell",
      "category": "interior-lg",
      "floor": "basement",
      "folder": "LG Lobby",
      "filename": "site-pictures/LG Lobby/20261014140000.jpg",
      "date": "14 Oct 2026 • 14:00 (2:00 PM)",
      "timeFormatted": "14:00 GST",
      "height": "-2.20 m (Subterranean)",
      "azimuth": "180° South",
      "fov": 80,
      "description": "Lower ground floor subterranean lobby and wellness reception illuminated by an architectural sunken courtyard lightwell.",
      "position": {
        "x": -2,
        "y": -2.2,
        "z": 4
      },
      "target": {
        "x": -2,
        "y": -1.5,
        "z": -2
      },
      "timelapseFrames": [
        {
          "filename": "site-pictures/LG Lobby/20261014080000.jpg",
          "date": "14 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014080000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014083000.jpg",
          "date": "14 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014083000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014090000.jpg",
          "date": "14 Oct 2026",
          "time": "09:00 (9:00 AM)",
          "timeShort": "09:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014090000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014093000.jpg",
          "date": "14 Oct 2026",
          "time": "09:30 (9:30 AM)",
          "timeShort": "09:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014093000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014100000.jpg",
          "date": "14 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014100000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014103000.jpg",
          "date": "14 Oct 2026",
          "time": "10:30 (10:30 AM)",
          "timeShort": "10:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014103000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014110000.jpg",
          "date": "14 Oct 2026",
          "time": "11:00 (11:00 AM)",
          "timeShort": "11:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014110000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014113000.jpg",
          "date": "14 Oct 2026",
          "time": "11:30 (11:30 AM)",
          "timeShort": "11:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014113000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014120000.jpg",
          "date": "14 Oct 2026",
          "time": "12:00 (12:00 PM)",
          "timeShort": "12:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014120000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014123000.jpg",
          "date": "14 Oct 2026",
          "time": "12:30 (12:30 PM)",
          "timeShort": "12:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014123000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014130000.jpg",
          "date": "14 Oct 2026",
          "time": "13:00 (1:00 PM)",
          "timeShort": "13:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014130000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014133000.jpg",
          "date": "14 Oct 2026",
          "time": "13:30 (1:30 PM)",
          "timeShort": "13:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014133000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014140000.jpg",
          "date": "14 Oct 2026",
          "time": "14:00 (2:00 PM)",
          "timeShort": "14:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014140000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014143000.jpg",
          "date": "14 Oct 2026",
          "time": "14:30 (2:30 PM)",
          "timeShort": "14:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014143000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014150000.jpg",
          "date": "14 Oct 2026",
          "time": "15:00 (3:00 PM)",
          "timeShort": "15:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014150000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014153000.jpg",
          "date": "14 Oct 2026",
          "time": "15:30 (3:30 PM)",
          "timeShort": "15:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014153000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014160000.jpg",
          "date": "14 Oct 2026",
          "time": "16:00 (4:00 PM)",
          "timeShort": "16:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014160000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014163000.jpg",
          "date": "14 Oct 2026",
          "time": "16:30 (4:30 PM)",
          "timeShort": "16:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014163000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014170000.jpg",
          "date": "14 Oct 2026",
          "time": "17:00 (5:00 PM)",
          "timeShort": "17:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014170000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014173000.jpg",
          "date": "14 Oct 2026",
          "time": "17:30 (5:30 PM)",
          "timeShort": "17:30",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014173000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261014180000.jpg",
          "date": "14 Oct 2026",
          "time": "18:00 (6:00 PM)",
          "timeShort": "18:00",
          "isoDate": "2026-10-14",
          "rawTimestamp": "20261014180000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261015080000.jpg",
          "date": "15 Oct 2026",
          "time": "08:00 (8:00 AM)",
          "timeShort": "08:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015080000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261015083000.jpg",
          "date": "15 Oct 2026",
          "time": "08:30 (8:30 AM)",
          "timeShort": "08:30",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015083000"
        },
        {
          "filename": "site-pictures/LG Lobby/20261015100000.jpg",
          "date": "15 Oct 2026",
          "time": "10:00 (10:00 AM)",
          "timeShort": "10:00",
          "isoDate": "2026-10-15",
          "rawTimestamp": "20261015100000"
        }
      ]
    },
    {
      "id": "CAM-17",
      "code": "BIM-FRONT-DUSK",
      "title": "BIM Design: Front Dusk View",
      "category": "bim-render",
      "floor": "exterior",
      "filename": "20840-1711956940472.jpg",
      "date": "ONIX Architectural Design Concept",
      "timeFormatted": "Architectural BIM",
      "height": "2.20 m (Front Landscape)",
      "azimuth": "210° SW Isometric",
      "fov": 70,
      "description": "Consultant ONIX target architectural render at dusk featuring linear LED warm facade lighting, vertical living green trellis walls, luxury cars, and manicured landscaping.",
      "position": {
        "x": -22,
        "y": 5.5,
        "z": 25
      },
      "target": {
        "x": 2,
        "y": 6.5,
        "z": 0
      },
      "timelapseFrames": [
        {
          "filename": "20840-1711956940472.jpg",
          "date": "Design Model",
          "time": "Dusk Lighting",
          "timeShort": "Dusk",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20840-1711956940472"
        }
      ]
    },
    {
      "id": "CAM-18",
      "code": "BIM-FRONT-DAY",
      "title": "BIM Design: Front Daylight",
      "category": "bim-render",
      "floor": "exterior",
      "filename": "20840-1748865490206.jpeg",
      "date": "ONIX Architectural Design Concept",
      "timeFormatted": "Architectural BIM",
      "height": "2.40 m (Front Landscape)",
      "azimuth": "210° SW Daylight",
      "fov": 72,
      "description": "ONIX Architectural Consultancy front elevation daylight design rendering showing crisp white ultra-high performance concrete, floor-to-ceiling tinted glazing, and carport integration.",
      "position": {
        "x": -22,
        "y": 5.5,
        "z": 25
      },
      "target": {
        "x": 2,
        "y": 6.5,
        "z": 0
      },
      "timelapseFrames": [
        {
          "filename": "20840-1748865490206.jpeg",
          "date": "Design Model",
          "time": "Midday Daylight",
          "timeShort": "Day",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20840-1748865490206"
        }
      ]
    },
    {
      "id": "CAM-19",
      "code": "BIM-REAR-WATER",
      "title": "BIM Design: Rear Pool Waterfall",
      "category": "bim-render",
      "floor": "exterior",
      "filename": "20840-1748865493553.jpeg",
      "date": "ONIX Architectural Design Concept",
      "timeFormatted": "Architectural BIM",
      "height": "1.80 m (Rear Pool Edge)",
      "azimuth": "0° North Rear Facade",
      "fov": 74,
      "description": "ONIX Consultancy target rear elevation featuring custom sheet waterfall cascading into the infinity swimming pool, glass terrace balustrades, and lush boundary greenery.",
      "position": {
        "x": 0,
        "y": 4.5,
        "z": -32
      },
      "target": {
        "x": 0,
        "y": 7.5,
        "z": 0
      },
      "timelapseFrames": [
        {
          "filename": "20840-1748865493553.jpeg",
          "date": "Design Model",
          "time": "Afternoon Sunset",
          "timeShort": "Sunset",
          "isoDate": "2026-10-01",
          "rawTimestamp": "20840-1748865493553"
        }
      ]
    }
  ]
};

window.SITE_DATA = SITE_DATA;
