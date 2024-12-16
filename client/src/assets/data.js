

export const user = {
    _id: "64df3c064180b81adfe41d4b",
    firstName: "Victor",
    lastName: "Essien",
    userName: 'viktor_codes',
    email: "victoresient@gmail.com",
    saved: ['64e1cdd64baffca670364c8c'],
    followers: [
      {
        _id: "64df3aec4180b81adfe41d32",
        firstName: "John",
        lastName: "Bruce",
        userName: "brucewill",
        email: "john@gmail.com",
        friends: ["64df3c064180b81adfe41d4b", "64df39704180b81adfe41d0b"],
        views: [],
        verified: true,
        createdAt: "2023-08-18T09:33:32.519Z",
        updatedAt: "2023-08-18T09:49:19.475Z",
        __v: 2,
        profileUrl:
          "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874470/cld-sample.jpg",
      },
      {
        _id: "64df39704180b81adfe41d0b",
        firstName: "James",
        lastName: "Jackson",
        userName: "jack_",
        email: "james@gmail.com",
        friends: ["64df3c064180b81adfe41d4b", "64df3aec4180b81adfe41d32"],
        views: [
          "64df39704180b81adfe41d0b",
          "64df39704180b81adfe41d0b",
          "64df39704180b81adfe41d0b",
          "64df39704180b81adfe41d0b",
          "64df39704180b81adfe41d0b",
          "64df39704180b81adfe41d0b",
        ],
        verified: true,
        createdAt: "2023-08-18T09:27:12.064Z",
        updatedAt: "2023-08-21T06:46:26.798Z",
        __v: 8,
        location: "Mumbai, India",
        profession: "Full-Stack Developer",
      },
      {
        _id: "64df424b4a4c0d47b5369f65",
        firstName: "User",
        lastName: "One",
        userName: "user_one",
        email: "user!@gmail.com",
        friends: ["64df3c064180b81adfe41d4b"],
        views: [],
        verified: true,
        createdAt: "2023-08-18T10:04:59.677Z",
        updatedAt: "2023-08-18T10:09:20.006Z",
        __v: 1,
      },
    ],
    views: [
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
      "64df39704180b81adfe41d0b",
    ],
    verified: true,
    createdAt: "2023-08-18T09:38:14.179Z",
    updatedAt: "2023-08-21T06:46:18.258Z",
    profileUrl:
      "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg",
      // accessToken: "hZWFmZmU3NmMiLCJpYXQiOjE2OTIwMzY5",
  };
  
  export const followers = [
    {
      _id: "64df3aec4180b81adfe41d32",
      firstName: "John",
      lastName: "Bruce",
      email: "john@gmail.com",
      profileUrl:
        "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874470/cld-sample.jpg",
    },
    {
      _id: "64df39704180b81adfe41d0b",
      firstName: "James",
      lastName: "Jackson",
      email: "james@gmail.com",
      location: "Mumbai, India",
      profession: "Full-Stack Developer",
    },
    {
      _id: "64df424b4a4c0d47b5369f65",
      firstName: "User",
      lastName: "One",
      email: "user!@gmail.com",
    },
  ];

  export const recps = [
    { 
      _id: "64e2fe620d7868ecff1a6a76",
      userId:{
        _id: "64df39704180b81adfe41d0b",
        firstName: 'Jason',
        lastName: 'Rusty',
        userName: "jason_rusty",
        profileUrl: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg",
      },
      title: 'Chorizo & Mozzarella Gnocchi Bake',
      description: 'Upgrade cheesy tomato pasta with gnocchi, chorizo, and mozzarella for a comforting bake that makes an excellent midweek meal.',
      ingredients: [
        '1 tbsp olive oil',
        '1 onion, finely chopped',
        '2 garlic cloves, crushed',
        '120g chorizo, diced'
      ],
      procedure: [
        'Heat the olive oil in a pan.',
        'Add the chopped onion and garlic, and cook until soft.',
        'Add the diced chorizo and cook for a few minutes.',
        'Mix in the gnocchi and cook until golden brown.'
      ],
      image:[
     'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
        'https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1723829684~exp=1723833284~hmac=e5b08de43c1d0f8825dca23e8f8457e9e5f3d57a5d02592c678962d7101f0c69&w=740',
        'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
      ],
    likes: ["64df3c064180b81adfe41d4b"],
    comments: [],
    createdAt: "2023-08-21T06:04:18.297Z",
    updatedAt: "2023-08-21T06:04:18.297Z",
    __v: 0,
    },
    { 
      _id: "64e2fe620d7868ecff1a6a96",
      userId:{
        _id: "64df39704180b81adfe41d0b",
        firstName: 'Jason',
        lastName: 'Rusty',
        userName: "jason_rusty",
        profileUrl: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg",
      },
      title: 'Chorizo & Mozzarella Gnocchi Bake',
      description: 'Upgrade cheesy tomato pasta with gnocchi, chorizo, and mozzarella for a comforting bake that makes an excellent midweek meal.',
      ingredients: [
        '1 tbsp olive oil',
        '1 onion, finely chopped',
        '2 garlic cloves, crushed',
        '120g chorizo, diced'
      ],
      procedure: [
        'Heat the olive oil in a pan.',
        'Add the chopped onion and garlic, and cook until soft.',
        'Add the diced chorizo and cook for a few minutes.',
        'Mix in the gnocchi and cook until golden brown.'
      ],
      image:[
     'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
        'https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1723829684~exp=1723833284~hmac=e5b08de43c1d0f8825dca23e8f8457e9e5f3d57a5d02592c678962d7101f0c69&w=740',
        'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
      ],
    likes: ["64df3c064180b81adfe41d4b"],
    comments: [],
    createdAt: "2023-08-21T06:04:18.297Z",
    updatedAt: "2023-08-21T06:04:18.297Z",
    __v: 0,
    },
    { 
      _id: "64e1cdd64baffca670364c8c",
      userId:{
        _id: "64df39704180b81adfe41d0b",
        firstName: 'Amalia',
        lastName: 'Rully',
        userName: "amalia_tully",
        profileUrl: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg",
      },
      title: 'Vegan Stuffed Peppers',
      description: 'Delicious vegan stuffed peppers filled with quinoa, black beans, and veggies.',
      ingredients: [
        '4 bell peppers',
        '1 cup quinoa',
        '1 can black beans, drained',
        '1 cup corn kernels'
      ],
      procedure: [
        'Preheat the oven to 375°F (190°C).',
        'Cook the quinoa according to package instructions.',
        'Mix the cooked quinoa, black beans, and corn kernels.',
        'Stuff the bell peppers with the mixture and bake for 25-30 minutes.'
      ],
      image:[
        
        'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
        'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
        'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
      ],
    likes: ["64df3c064180b81adfe41d4b"],
    comments: [],
    createdAt: "2023-08-21T06:04:18.297Z",
    updatedAt: "2023-08-21T06:04:18.297Z",
    __v: 0,
    },
    
    // Add more post objects as needed
  ];
  
  export const recp = [
    { 
      _id: "64e2fe620d7868ecff1a6a86",
      userId:{
        _id: "64df39704180b81adfe41d0b",
        firstName: 'Jason',
        lastName: 'Rusty',
        userName: "jason_rusty",
        profileUrl: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg",
      },
      title: 'Chorizo & Mozzarella Gnocchi Bake',
      description: 'Upgrade cheesy tomato pasta with gnocchi, chorizo, and mozzarella for a comforting bake that makes an excellent midweek meal.',
      ingredients: [
        '1 tbsp olive oil',
        '1 onion, finely chopped',
        '2 garlic cloves, crushed',
        '120g chorizo, diced'
      ],
      procedure: [
        'Heat the olive oil in a pan.',
        'Add the chopped onion and garlic, and cook until soft.',
        'Add the diced chorizo and cook for a few minutes.',
        'Mix in the gnocchi and cook until golden brown.'
      ],
      image:[
     'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
     
        'https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713033.jpg?t=st=1723829684~exp=1723833284~hmac=e5b08de43c1d0f8825dca23e8f8457e9e5f3d57a5d02592c678962d7101f0c69&w=740',
        'https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg',
      ],
    likes: ["64df3c064180b81adfe41d4b"],
    comments: [],
    createdAt: "2023-08-21T06:04:18.297Z",
    updatedAt: "2023-08-21T06:04:18.297Z",
    __v: 0,
    },
  ]

  
   export const comments = [
      {
        "_id": "64e3baf740f6825e9b2f6372",
        "userId": {
          "_id": "64df39704180b81adfe41d0b",
          "firstName": "Jason",
          "lastName": "Rusty",
          "userName": "jason_rusty",
          "profileUrl": "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/boy-snow-hoodie.jpg"
        },
        "comment": "This is an awesome post! Really enjoyed the content.",
        "createdAt": "2024-08-22T10:24:00Z",
        "likes": [
          "64df39704180b81adfe41d0b",
          "64df398a4180b81adfe41d0d"
        ],
        "replies": [
          {
            "_id": "64e3bb5d40f6825e9b2f6373",
            "userId": {
              "_id": "64df398a4180b81adfe41d0d",
              "firstName": "Alice",
              "lastName": "Doe",
              "userName": "alice_doe",
              "profileUrl": "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/woman-girl.jpg"
            },
            "comment": "I agree! It was really insightful.",
            "createdAt": "2024-08-22T11:00:00Z",
            "likes": []
          }
        ]
      },
      {
        "_id": "64e3bac340f6825e9b2f6371",
        "userId": {
          "_id": "64df39954180b81adfe41d0f",
          "firstName": "John",
          "lastName": "Smith",
          "userName": "john_smith",
          "profileUrl": "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874454/samples/people/man-glasses.jpg"
        },
        "comment": "I have some doubts about the explanation provided.",
        "createdAt": "2024-08-22T09:50:00Z",
        "likes": [
          "64df39704180b81adfe41d0b"
        ],
        "replies": []
      }
    ]
  
  