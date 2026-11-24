// Comprehensive Official Karnataka 31-District Sub-Registrar (SR) Guidance Value & Circle Rate Registry
// Standard statutory rates: Stamp Duty 5.1%, Registration 1.0% (as per Karnataka Stamps Act / Kaveri 2.0)
const KARNATAKA_SR_DATA = {
  "BENGALURU URBAN": {
    "BENGALURU SOUTH": {
      "BEGUR HOBLI": [
        { village: "Electronic City Phase 1", rate: 6800, stampRate: 5.1, regRate: 1.0 },
        { village: "Begur Main Village", rate: 5900, stampRate: 5.1, regRate: 1.0 },
        { village: "Bettadasanapura", rate: 5200, stampRate: 5.1, regRate: 1.0 },
        { village: "Hongasandra", rate: 6100, stampRate: 5.1, regRate: 1.0 },
        { village: "Hulimavu Bannerghatta Rd", rate: 7400, stampRate: 5.1, regRate: 1.0 }
      ],
      "UTTARAHALLI HOBLI": [
        { village: "Uttarahalli Village", rate: 6400, stampRate: 5.1, regRate: 1.0 },
        { village: "Subramanyapura", rate: 6900, stampRate: 5.1, regRate: 1.0 },
        { village: "Konanakunte", rate: 7200, stampRate: 5.1, regRate: 1.0 },
        { village: "Chikkalasandra", rate: 6500, stampRate: 5.1, regRate: 1.0 }
      ],
      "KENGERI HOBLI": [
        { village: "Kengeri Satellite Town", rate: 5400, stampRate: 5.1, regRate: 1.0 },
        { village: "Hemmigepura", rate: 4800, stampRate: 5.1, regRate: 1.0 },
        { village: "Kommaghatta", rate: 4600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BENGALURU EAST": {
      "K.R. PURAM HOBLI": [
        { village: "Whitefield Inner Circle", rate: 8400, stampRate: 5.1, regRate: 1.0 },
        { village: "Hoodi Village", rate: 7100, stampRate: 5.1, regRate: 1.0 },
        { village: "Kadugodi", rate: 6200, stampRate: 5.1, regRate: 1.0 },
        { village: "Mahadevapura", rate: 7800, stampRate: 5.1, regRate: 1.0 }
      ],
      "VARTHUR HOBLI": [
        { village: "Varthur Kodi", rate: 6800, stampRate: 5.1, regRate: 1.0 },
        { village: "Gunjur", rate: 5900, stampRate: 5.1, regRate: 1.0 },
        { village: "Panathur", rate: 7300, stampRate: 5.1, regRate: 1.0 },
        { village: "Bellandur Outer Ring Road", rate: 9200, stampRate: 5.1, regRate: 1.0 }
      ],
      "BIDARAHALLI HOBLI": [
        { village: "Avalahalli", rate: 5300, stampRate: 5.1, regRate: 1.0 },
        { village: "Mandur", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "Kannamangala", rate: 5800, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BENGALURU NORTH": {
      "YELAHANKA HOBLI": [
        { village: "Yelahanka Old Town", rate: 6500, stampRate: 5.1, regRate: 1.0 },
        { village: "Allalasandra", rate: 7200, stampRate: 5.1, regRate: 1.0 },
        { village: "Jakkur Aero Post", rate: 8100, stampRate: 5.1, regRate: 1.0 }
      ],
      "KASABA HOBLI": [
        { village: "Hebbal Kempapura", rate: 9600, stampRate: 5.1, regRate: 1.0 },
        { village: "Nagavara Outer Ring Rd", rate: 7800, stampRate: 5.1, regRate: 1.0 },
        { village: "Thanisandra Main Rd", rate: 7400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "ANEKAL": {
      "ATTIBELE HOBLI": [
        { village: "Attibele Industrial Area", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "Mayasandra", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Yadavanahalli", rate: 3900, stampRate: 5.1, regRate: 1.0 }
      ],
      "SARJAPURA HOBLI": [
        { village: "Sarjapura Town Centre", rate: 6400, stampRate: 5.1, regRate: 1.0 },
        { village: "Somapura", rate: 5100, stampRate: 5.1, regRate: 1.0 },
        { village: "Yamare Village", rate: 5600, stampRate: 5.1, regRate: 1.0 }
      ],
      "JIGANI HOBLI": [
        { village: "Jigani APC Circle", rate: 4500, stampRate: 5.1, regRate: 1.0 },
        { village: "Haragadde", rate: 3800, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "BENGALURU RURAL": {
    "DEVANAHALLI": {
      "KASABA HOBLI": [
        { village: "Devanahalli Airport Road Corridor", rate: 5800, stampRate: 5.1, regRate: 1.0 },
        { village: "Bidalur", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Sutahalli Hardware Park", rate: 4600, stampRate: 5.1, regRate: 1.0 }
      ],
      "VIJAYAPURA HOBLI": [
        { village: "Vijayapura Town", rate: 3400, stampRate: 5.1, regRate: 1.0 },
        { village: "Kommasandra", rate: 2900, stampRate: 5.1, regRate: 1.0 }
      ],
      "KUNDANA HOBLI": [
        { village: "Kundana Village", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Viswanathapura", rate: 3900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "DODDABALLAPURA": {
      "KASABA HOBLI": [
        { village: "Doddaballapura Industrial Area", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Bashettihalli", rate: 3500, stampRate: 5.1, regRate: 1.0 }
      ],
      "TUBAGERE HOBLI": [
        { village: "Tubagere Village", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Melekote", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "NELAMANGALA": {
      "KASABA HOBLI": [
        { village: "Nelamangala NH-48 Toll Gate", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "Sondekoppa Road", rate: 3600, stampRate: 5.1, regRate: 1.0 }
      ],
      "SOMPURA HOBLI": [
        { village: "Dobbaspet Industrial Hub", rate: 3400, stampRate: 5.1, regRate: 1.0 },
        { village: "Nidavanda", rate: 2900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HOSAKOTE": {
      "KASABA HOBLI": [
        { village: "Hosakote Toll Plaza Corridor", rate: 4800, stampRate: 5.1, regRate: 1.0 },
        { village: "Kollathur", rate: 3600, stampRate: 5.1, regRate: 1.0 }
      ],
      "ANUGONDANAHALLI HOBLI": [
        { village: "Anugondanahalli", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Muthanallur Road", rate: 3800, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "RAMANAGARA": {
    "RAMANAGARA TALUK": {
      "KASABA HOBLI": [
        { village: "Ramanagara Mysore Highway", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Ijoor", rate: 2900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHANNAPATNA": {
      "KASABA HOBLI": [
        { village: "Channapatna Town Centre", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Mangalwarpet", rate: 2500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MAGADI": {
      "KASABA HOBLI": [
        { village: "Magadi Fort Road", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Tippasandra", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KANAKAPURA": {
      "KASABA HOBLI": [
        { village: "Kanakapura Highway Corridor", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Harohalli Industrial Park", rate: 3700, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "MYSURU": {
    "MYSURU TALUK": {
      "KASABA HOBLI": [
        { village: "Jayalakshmipuram", rate: 4800, stampRate: 5.1, regRate: 1.0 },
        { village: "Gokulam 3rd Stage", rate: 5200, stampRate: 5.1, regRate: 1.0 },
        { village: "Vijayanagar 2nd Stage", rate: 4300, stampRate: 5.1, regRate: 1.0 },
        { village: "Saraswathipuram", rate: 4900, stampRate: 5.1, regRate: 1.0 }
      ],
      "VARUNA HOBLI": [
        { village: "Varuna Village", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Dandikere", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "NANJANAGUDU": {
      "KASABA HOBLI": [
        { village: "Nanjanagudu Industrial Area", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Hullahalli", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HUNSUR": {
      "KASABA HOBLI": [
        { village: "Hunsur Town Bypass", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Bilikere", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "T. NARASIPURA": {
      "KASABA HOBLI": [
        { village: "T. Narasipura Sangama", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Bannur", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KRISHNARAJANAGARA": {
      "KASABA HOBLI": [
        { village: "K.R. Nagar Town", rate: 2200, stampRate: 5.1, regRate: 1.0 },
        { village: "Chunchanakatte", rate: 1800, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "MANDYA": {
    "MANDYA TALUK": {
      "KASABA HOBLI": [
        { village: "Mandya Town Mysore-Blr Highway", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Sugar Town", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SRIRANGAPATNA": {
      "KASABA HOBLI": [
        { village: "Srirangapatna Heritage Zone", rate: 3300, stampRate: 5.1, regRate: 1.0 },
        { village: "Arakere", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MADDUR": {
      "KASABA HOBLI": [
        { village: "Maddur Highway Gateway", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Besagarahalli", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "PANDAVAPURA": {
      "KASABA HOBLI": [
        { village: "Pandavapura Town", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Melukote Sacred Hill", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "HASSAN": {
    "HASSAN TALUK": {
      "KASABA HOBLI": [
        { village: "Hassan Ring Road Extension", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Kuvempu Nagar", rate: 3500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "ALUR": {
      "KASABA HOBLI": [
        { village: "Alur Town", rate: 2100, stampRate: 5.1, regRate: 1.0 },
        { village: "Palya", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BELUR": {
      "KASABA HOBLI": [
        { village: "Belur Temple Heritage Precinct", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Halebeedu Road", rate: 2300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHANNARAYAPATNA": {
      "KASABA HOBLI": [
        { village: "Shravanabelagola Hill View", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Bagur", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SAKLESHPUR": {
      "KASABA HOBLI": [
        { village: "Sakleshpur Coffee Estate Belt", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Donigal", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "KODAGU": {
    "MADIKERI": {
      "KASABA HOBLI": [
        { village: "Madikeri Hill Ridge Road", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Raja Seat Road", rate: 4100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "VIRAJPET": {
      "KASABA HOBLI": [
        { village: "Virajpet Town Clock Tower", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Gonikoppal Junction", rate: 3300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SOMWARPET": {
      "KASABA HOBLI": [
        { village: "Somwarpet Town", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Kushalnagar Cauvery Nisarga", rate: 3200, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "DAKSHINA KANNADA": {
    "MANGALURU": {
      "MANGALURU CITY": [
        { village: "Kadri Hills Promenade", rate: 5800, stampRate: 5.1, regRate: 1.0 },
        { village: "Bejai Commercial Corridor", rate: 5400, stampRate: 5.1, regRate: 1.0 },
        { village: "Kankanady Bypass", rate: 5100, stampRate: 5.1, regRate: 1.0 }
      ],
      "SURATHKAL HOBLI": [
        { village: "Surathkal NITK Beach Road", rate: 4600, stampRate: 5.1, regRate: 1.0 },
        { village: "Mukka Coastal Belt", rate: 4200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BANTWAL": {
      "KASABA HOBLI": [
        { village: "B.C. Road Flyover Junction", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Bantwal Town", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BELTHANGADY": {
      "KASABA HOBLI": [
        { village: "Dharmasthala Temple Enclave", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Ujire Junction", rate: 3200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "PUTTUR": {
      "KASABA HOBLI": [
        { village: "Puttur Main Commercial Road", rate: 3400, stampRate: 5.1, regRate: 1.0 },
        { village: "Kabaka", rate: 2800, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SULLIA": {
      "KASABA HOBLI": [
        { village: "Subrahmanya Temple Town", rate: 3300, stampRate: 5.1, regRate: 1.0 },
        { village: "Sullia Town", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "UDUPI": {
    "UDUPI TALUK": {
      "KASABA HOBLI": [
        { village: "Manipal University Road", rate: 5200, stampRate: 5.1, regRate: 1.0 },
        { village: "Kunjibettu", rate: 4600, stampRate: 5.1, regRate: 1.0 },
        { village: "Malpe Beach Coastal Corridor", rate: 4800, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KUNDAPURA": {
      "KASABA HOBLI": [
        { village: "Kundapura Coastal Highway", rate: 3500, stampRate: 5.1, regRate: 1.0 },
        { village: "Koteshwara", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KARKALA": {
      "KASABA HOBLI": [
        { village: "Karkala Gommateshwara View", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Bajagoli", rate: 2500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BRAHMAVARA": {
      "KASABA HOBLI": [
        { village: "Brahmavara Town Junction", rate: 3300, stampRate: 5.1, regRate: 1.0 },
        { village: "Barkur Heritage Hub", rate: 2700, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "UTTARA KANNADA": {
    "KARWAR": {
      "KASABA HOBLI": [
        { village: "Karwar Rabindranath Tagore Beach", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Binaga Sea Bird Naval Base", rate: 3400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "ANKOLA": {
      "KASABA HOBLI": [
        { village: "Ankola Town Highway", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Belekeri Port Road", rate: 2500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KUMTA": {
      "KASABA HOBLI": [
        { village: "Kumta Town Centre", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Aghanashini Estuary", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BHATKAL": {
      "KASABA HOBLI": [
        { village: "Murudeshwara Temple & Beach", rate: 3700, stampRate: 5.1, regRate: 1.0 },
        { village: "Bhatkal Sea Port Road", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SIRSI": {
      "KASABA HOBLI": [
        { village: "Sirsi Marikamba Temple Area", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Banavasi Ancient Capital", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "SHIVAMOGGA": {
    "SHIVAMOGGA TALUK": {
      "KASABA HOBLI": [
        { village: "Kuvempu Road Extension", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Vinoba Nagara", rate: 3500, stampRate: 5.1, regRate: 1.0 },
        { village: "Gopala Extension", rate: 3200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BHADRAVATI": {
      "KASABA HOBLI": [
        { village: "VISL Plant Enclave", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Jannapura", rate: 2500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SAGARA": {
      "KASABA HOBLI": [
        { village: "Sagara Town Bypass", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Jog Falls Gateway", rate: 3300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "THIRTHAHALLI": {
      "KASABA HOBLI": [
        { village: "Thirthahalli Tunga Riverfront", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Agumbe Rainforest Vista", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SHIKARIPURA": {
      "KASABA HOBLI": [
        { village: "Shikaripura Town Ring Road", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Shiralkoppa", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "CHIKKAMAGALURU": {
    "CHIKKAMAGALURU TALUK": {
      "KASABA HOBLI": [
        { village: "Mullayanagiri Foot Hills Corridor", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "KM Road Commercial Hub", rate: 4500, stampRate: 5.1, regRate: 1.0 },
        { village: "Indavara", rate: 3400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MUDIGERE": {
      "KASABA HOBLI": [
        { village: "Mudigere Coffee Estate Ring", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Kottigehara Ghat", rate: 2700, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "TARIKERE": {
      "KASABA HOBLI": [
        { village: "Tarikere Highway Zone", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Kemmannugundi Base", rate: 2800, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SRINGERI": {
      "KASABA HOBLI": [
        { village: "Sharada Peetham Temple Road", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Menase", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "CHITRADURGA": {
    "CHITRADURGA TALUK": {
      "KASABA HOBLI": [
        { village: "Fort View Commercial Belt", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Kelagote", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Turuvanoor Road", rate: 2300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHALLAKERE": {
      "KASABA HOBLI": [
        { village: "Challakere Science City (ISRO/DRDO)", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Parasurampura", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HIRIYUR": {
      "KASABA HOBLI": [
        { village: "Hiriyur NH-48 Junction", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Vani Vilasa Sagara Environs", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HOLALKERE": {
      "KASABA HOBLI": [
        { village: "Holalkere Railway Station Rd", rate: 2200, stampRate: 5.1, regRate: 1.0 },
        { village: "Ramagiri", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "DAVANAGERE": {
    "DAVANAGERE TALUK": {
      "KASABA HOBLI": [
        { village: "Vidyanagar Textile Hub", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "MCC A & B Block", rate: 4100, stampRate: 5.1, regRate: 1.0 },
        { village: "Hadadi Road Extension", rate: 3200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HARIHARA": {
      "KASABA HOBLI": [
        { village: "Harihareshwara Temple Area", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Amaravathi Industrial Colony", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHANNAGIRI": {
      "KASABA HOBLI": [
        { village: "Channagiri Arecanut Mandi", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Santhebennur Pushkarini Area", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HONNALI": {
      "KASABA HOBLI": [
        { village: "Honnali Tunga-Bhadra Basin", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Nyamathi Town", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "TUMAKURU": {
    "TUMAKURU TALUK": {
      "KASABA HOBLI": [
        { village: "Siddaganga Mutt Corridor", rate: 3900, stampRate: 5.1, regRate: 1.0 },
        { village: "Batawadi Bypass NH-48", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Ashok Nagar", rate: 3400, stampRate: 5.1, regRate: 1.0 }
      ],
      "VASANTHANARASAPURA": [
        { village: "Japan Industrial Township (CBIC)", rate: 4100, stampRate: 5.1, regRate: 1.0 },
        { village: "Kora Industrial Belt", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KUNIGAL": {
      "KASABA HOBLI": [
        { village: "Kunigal Stud Farm Road", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Huliyurdurga", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "TIPTUR": {
      "KASABA HOBLI": [
        { village: "Tiptur Copra Market Central", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Halkurke", rate: 2300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SIRA": {
      "KASABA HOBLI": [
        { village: "Sira NH-48 Industrial Node", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Bukkapatna", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MADHUGIRI": {
      "KASABA HOBLI": [
        { village: "Madhugiri Monolith View", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Midigeshi", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "KOLAR": {
    "KOLAR TALUK": {
      "KASABA HOBLI": [
        { village: "Kolar Gold Highway NH-75", rate: 3300, stampRate: 5.1, regRate: 1.0 },
        { village: "Tamaka Medical College Zone", rate: 3500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "Bangarapet": {
      "KASABA HOBLI": [
        { village: "Bangarapet Railway Junction", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "KGF Oorgaum Heritage Shafts", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Marikuppam", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MALUR": {
      "KASABA HOBLI": [
        { village: "Malur KIADB Industrial Area", rate: 3400, stampRate: 5.1, regRate: 1.0 },
        { village: "Lakkur", rate: 2800, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SRINIVASAPURA": {
      "KASABA HOBLI": [
        { village: "Srinivasapura Mango Market", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Ronur", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MULBAGAL": {
      "KASABA HOBLI": [
        { village: "Mulbagal Anjaneya Temple Rd", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Avani Historical Hill", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "CHIKKABALLAPURA": {
    "CHIKKABALLAPURA TALUK": {
      "KASABA HOBLI": [
        { village: "Nandi Hills Foothills Vista", rate: 4600, stampRate: 5.1, regRate: 1.0 },
        { village: "Muddenahalli Sir MV Heritage", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "Agalagurki Medical Hub", rate: 3600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SIDLAGHATTA": {
      "KASABA HOBLI": [
        { village: "Sidlaghatta Silk Cocoon Market", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Jangamakote Cross", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHINTAMANI": {
      "KASABA HOBLI": [
        { village: "Chintamani Town Bypass", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Kaivara Kshetra", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "GOWRIBIDANUR": {
      "KASABA HOBLI": [
        { village: "Gowribidanur Industrial Hub", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Vidurashwatha Sacred Precinct", rate: 2300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BAGEPALLI": {
      "KASABA HOBLI": [
        { village: "Bagepalli Andhra Border NH-44", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Chelur", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "BELAGAVI": {
    "BELAGAVI TALUK": {
      "KASABA HOBLI": [
        { village: "Camp Cantonment Area", rate: 4800, stampRate: 5.1, regRate: 1.0 },
        { village: "Tilakwadi VIP Belt", rate: 5100, stampRate: 5.1, regRate: 1.0 },
        { village: "Auto Nagar Industrial Hub", rate: 4100, stampRate: 5.1, regRate: 1.0 },
        { village: "Suvarna Vidhana Soudha Corridor", rate: 4400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "GOKAK": {
      "KASABA HOBLI": [
        { village: "Gokak Falls Hydro Precinct", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Gokak Town Commercial", rate: 2900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHIKKODI": {
      "KASABA HOBLI": [
        { village: "Chikkodi Sugar Belt", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Nipani Tobacco Market", rate: 3200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BAILHONGAL": {
      "KASABA HOBLI": [
        { village: "Kittur Fort Road", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Bailhongal Town", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "ATHANI": {
      "KASABA HOBLI": [
        { village: "Athani Krishna Basin", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Kagwad", rate: 2300, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "DHARWAD": {
    "HUBBALLI": {
      "HUBBALLI CITY": [
        { village: "Gokul Road Airport Corridor", rate: 4900, stampRate: 5.1, regRate: 1.0 },
        { village: "Keshwapur Commercial", rate: 4600, stampRate: 5.1, regRate: 1.0 },
        { village: "Vidyanagar Hubballi", rate: 4400, stampRate: 5.1, regRate: 1.0 },
        { village: "Unkal Lake Promenade", rate: 4700, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "DHARWAD TALUK": {
      "KASABA HOBLI": [
        { village: "KUD University Enclave", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "Sattur High Court Precinct", rate: 4400, stampRate: 5.1, regRate: 1.0 },
        { village: "Kelageri Lake View", rate: 3800, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KALGHATGI": {
      "KASABA HOBLI": [
        { village: "Kalghatgi Town", rate: 2200, stampRate: 5.1, regRate: 1.0 },
        { village: "Dhummawad", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "NAVALGUND": {
      "KASABA HOBLI": [
        { village: "Navalgund Jamkhana Heritage", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Annigeri Kalyani Chalukya", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "GADAG": {
    "GADAG TALUK": {
      "KASABA HOBLI": [
        { village: "Betageri Silk Market", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Trikuteshwara Temple Enclave", rate: 3400, stampRate: 5.1, regRate: 1.0 },
        { village: "Binkadakatti Wind Corridor", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "LAKSHMESHWAR": {
      "KASABA HOBLI": [
        { village: "Someshwara Temple Town", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Shirahatti", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "RON": {
      "KASABA HOBLI": [
        { village: "Ron Town", rate: 2100, stampRate: 5.1, regRate: 1.0 },
        { village: "Gajendragad Hill Fort", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "HAVERI": {
    "HAVERI TALUK": {
      "KASABA HOBLI": [
        { village: "Haveri Cardamom Market", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Siddheshwara Temple Precinct", rate: 3300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "RANEBENNUR": {
      "KASABA HOBLI": [
        { village: "Blackbuck Sanctuary Outer Road", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Ranebennur Seed Capital Zone", rate: 3400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BYADGI": {
      "KASABA HOBLI": [
        { village: "Byadgi Red Chilli APMC Market", rate: 3500, stampRate: 5.1, regRate: 1.0 },
        { village: "Kaginele Kanakadasa Kshetra", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SHIGGAON": {
      "KASABA HOBLI": [
        { village: "Shiggaon Highway Corridor", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Bankapura Peacock Sanctuary Base", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "BAGALKOTE": {
    "BAGALKOTE TALUK": {
      "KASABA HOBLI": [
        { village: "Navanagar Planned City (UKP)", rate: 3400, stampRate: 5.1, regRate: 1.0 },
        { village: "Vidyagiri Educational Complex", rate: 3600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BADAMI": {
      "KASABA HOBLI": [
        { village: "Badami Cave Temples UNESCO Enclave", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Pattadakal World Heritage Precinct", rate: 3500, stampRate: 5.1, regRate: 1.0 },
        { village: "Aihole Cradle of Architecture", rate: 3200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "JAMKHANDI": {
      "KASABA HOBLI": [
        { village: "Jamkhandi Royal Palace Road", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Rabkavi Banhatti Silk Weavers", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MUDHOL": {
      "KASABA HOBLI": [
        { village: "Mudhol Hound Heritage Town", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Lokapur Cement Industrial Belt", rate: 2900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "ILKAL": {
      "KASABA HOBLI": [
        { village: "Ilkal Saree & Granite Hub", rate: 3300, stampRate: 5.1, regRate: 1.0 },
        { village: "Hungund Cross", rate: 2500, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "VIJAYAPURA": {
    "VIJAYAPURA TALUK": {
      "KASABA HOBLI": [
        { village: "Gol Gumbaz Heritage Boulevard", rate: 3900, stampRate: 5.1, regRate: 1.0 },
        { village: "Ibrahim Rauza Precinct", rate: 3500, stampRate: 5.1, regRate: 1.0 },
        { village: "Solapur Highway Bypass", rate: 3300, stampRate: 5.1, regRate: 1.0 },
        { village: "Adarsh Nagar", rate: 3600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "INDI": {
      "KASABA HOBLI": [
        { village: "Indi Town Grain Terminal", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Lachyan", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SINDAGI": {
      "KASABA HOBLI": [
        { village: "Sindagi Town Centre", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Devara Hipparagi", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BASAVANA BAGEWADI": {
      "KASABA HOBLI": [
        { village: "Basaveshwara Birthplace Kshetra", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Kudala Sangama Confluence", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MUDDEBIHAL": {
      "KASABA HOBLI": [
        { village: "Muddebihal Town", rate: 2200, stampRate: 5.1, regRate: 1.0 },
        { village: "Talikoti", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "BALLARI": {
    "BALLARI TALUK": {
      "KASABA HOBLI": [
        { village: "Cantonment Royal Enclave", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "Infantry Road VIP", rate: 4600, stampRate: 5.1, regRate: 1.0 },
        { village: "Siruguppa Road Steel Belt", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Toranagallu JSW Steel Township", rate: 4100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SANDUR": {
      "KASABA HOBLI": [
        { village: "Sandur Royal Palace Enclave", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Kumaraswamy Temple Hills", rate: 2800, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SIRUGUPPA": {
      "KASABA HOBLI": [
        { village: "Siruguppa Tungabhadra Rice Belt", rate: 2700, stampRate: 5.1, regRate: 1.0 },
        { village: "Tekkalakote Prehistoric Site", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KURUGODU": {
      "KASABA HOBLI": [
        { village: "Kurugodu Doddabasaveshwara Area", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Kampli Sugar Zone", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "VIJAYANAGARA": {
    "HOSAPETE": {
      "KASABA HOBLI": [
        { village: "Hampi UNESCO World Heritage Zone", rate: 4900, stampRate: 5.1, regRate: 1.0 },
        { village: "Tungabhadra Dam VIP Vista", rate: 4200, stampRate: 5.1, regRate: 1.0 },
        { village: "College Road Hosapete", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Kamalapura Archeological Museum", rate: 4300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HARAPANAHALLI": {
      "KASABA HOBLI": [
        { village: "Harapanahalli Town", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Uchchangidurga Hill Temple", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KUDLIGI": {
      "KASABA HOBLI": [
        { village: "Kudligi Highway Cross", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Kotturu Guru Kottureshwara", rate: 2700, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HAGARIBOMMANAHALLI": {
      "KASABA HOBLI": [
        { village: "H.B. Halli Town", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Malvi Dam Environs", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HOOVINA HADAGALI": {
      "KASABA HOBLI": [
        { village: "Hadagali Jasmine Belt", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Hirehadagali Chalukyan Temples", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "KALABURAGI": {
    "KALABURAGI TALUK": {
      "KASABA HOBLI": [
        { village: "Gulbarga Fort & Khwaja Banda Nawaz", rate: 4100, stampRate: 5.1, regRate: 1.0 },
        { village: "Sedam Road IT / High Court", rate: 4500, stampRate: 5.1, regRate: 1.0 },
        { village: "Aiwan-e-Shahi VIP Area", rate: 4700, stampRate: 5.1, regRate: 1.0 },
        { village: "Central University Kadaganchi", rate: 3300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SEDAM": {
      "KASABA HOBLI": [
        { village: "Sedam Cement Industrial Hub (Vasavadatta)", rate: 2900, stampRate: 5.1, regRate: 1.0 },
        { village: "Malkhed Rashtrakuta Capital", rate: 2700, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHITTAPUR": {
      "KASABA HOBLI": [
        { village: "Wadi Railway Junction & Cement", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Sannati Ashokan Edicts Buddhist Site", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "ALAND": {
      "KASABA HOBLI": [
        { village: "Aland Town", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Ladlapur", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "AFZALPUR": {
      "KASABA HOBLI": [
        { village: "Ganagapura Dattatreya Temple Enclave", rate: 3400, stampRate: 5.1, regRate: 1.0 },
        { village: "Afzalpur Town", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "CHINCHOLI": {
      "KASABA HOBLI": [
        { village: "Chincholi Wildlife Sanctuary Edge", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Chandrampalli Dam", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "JEWARGI": {
      "KASABA HOBLI": [
        { village: "Jewargi Town", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Yedrami", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "BIDAR": {
    "BIDAR TALUK": {
      "KASABA HOBLI": [
        { village: "Bidar Bahmani Fort Heritage Area", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Guru Nanak Jhira Sahib Precinct", rate: 3900, stampRate: 5.1, regRate: 1.0 },
        { village: "Chidri Road", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "Naubad Industrial Zone", rate: 3100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BASAVAKALYAN": {
      "KASABA HOBLI": [
        { village: "Basavakalyan Fort & Anubhava Mantapa", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Tripurant Lake Front", rate: 2600, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HUMNABAD": {
      "KASABA HOBLI": [
        { village: "Humnabad Maniknagar Samsthan", rate: 3200, stampRate: 5.1, regRate: 1.0 },
        { village: "NH-65 Hyderabad Highway Junction", rate: 3400, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "BHALKI": {
      "KASABA HOBLI": [
        { village: "Bhalki Hiremath Heritage", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Khatak Chincholi", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "AURAD": {
      "KASABA HOBLI": [
        { village: "Aurad Border Town", rate: 2100, stampRate: 5.1, regRate: 1.0 },
        { village: "Kamalnagar", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "RAICHUR": {
    "RAICHUR TALUK": {
      "KASABA HOBLI": [
        { village: "Raichur Thermal Power Colony (RTPS)", rate: 3500, stampRate: 5.1, regRate: 1.0 },
        { village: "Station Road Raichur", rate: 3800, stampRate: 5.1, regRate: 1.0 },
        { village: "Askihal Agricultural Mandi", rate: 3200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SINDHANUR": {
      "KASABA HOBLI": [
        { village: "Sindhanur Mega Paddy / Rice Hub", rate: 3600, stampRate: 5.1, regRate: 1.0 },
        { village: "Turuvihal", rate: 2500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "MANVI": {
      "KASABA HOBLI": [
        { village: "Manvi Town", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Pothnal Cross", rate: 2200, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "DEVADURGA": {
      "KASABA HOBLI": [
        { village: "Devadurga Fort Road", rate: 2200, stampRate: 5.1, regRate: 1.0 },
        { village: "Gabbur Temple Cluster", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "LINGASUGUR": {
      "KASABA HOBLI": [
        { village: "Hutti Gold Mines Enclave", rate: 3300, stampRate: 5.1, regRate: 1.0 },
        { village: "Mudgal Historic Fort", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Maski Ashokan Inscription Site", rate: 2400, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "KOPPALA": {
    "KOPPALA TALUK": {
      "KASABA HOBLI": [
        { village: "Koppala Fort & Male Malleshwara", rate: 3100, stampRate: 5.1, regRate: 1.0 },
        { village: "Kinnal Toy Heritage Craft Village", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Ginigera Industrial Airport Zone", rate: 3300, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "GANGAVATHI": {
      "KASABA HOBLI": [
        { village: "Anegundi Kishkindha Heritage", rate: 4100, stampRate: 5.1, regRate: 1.0 },
        { village: "Anjanadri Hill (Hanuman Janmasthana)", rate: 4400, stampRate: 5.1, regRate: 1.0 },
        { village: "Gangavathi Rice Bowl Commercial", rate: 3700, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "YELBURGA": {
      "KASABA HOBLI": [
        { village: "Yelburga Town", rate: 2200, stampRate: 5.1, regRate: 1.0 },
        { village: "Kukanoor Mahamaya Temple", rate: 2500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "KUSHTAGI": {
      "KASABA HOBLI": [
        { village: "Kushtagi Highway Junction", rate: 2400, stampRate: 5.1, regRate: 1.0 },
        { village: "Tawargera", rate: 2000, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  },

  "YADGIRI": {
    "YADGIRI TALUK": {
      "KASABA HOBLI": [
        { village: "Yadgiri Hill Fort & Railway Hub", rate: 2800, stampRate: 5.1, regRate: 1.0 },
        { village: "Kadechur - Badiyal Mega Pharma City", rate: 3500, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SHAHAPUR": {
      "KASABA HOBLI": [
        { village: "Shahapur Sleeping Buddha Hill View", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Gogipeth", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "SHORAPUR": {
      "KASABA HOBLI": [
        { village: "Shorapur Raja Venkatappa Nayaka Palace", rate: 2600, stampRate: 5.1, regRate: 1.0 },
        { village: "Kembhavi", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "HUNASAGI": {
      "KASABA HOBLI": [
        { village: "Narayanapura Dam Left Bank", rate: 2500, stampRate: 5.1, regRate: 1.0 },
        { village: "Hunasagi Town", rate: 2100, stampRate: 5.1, regRate: 1.0 }
      ]
    },
    "GURMITKAL": {
      "KASABA HOBLI": [
        { village: "Gurmitkal Handloom Silk Zone", rate: 2300, stampRate: 5.1, regRate: 1.0 },
        { village: "Chintanapalli", rate: 1900, stampRate: 5.1, regRate: 1.0 }
      ]
    }
  }
};
