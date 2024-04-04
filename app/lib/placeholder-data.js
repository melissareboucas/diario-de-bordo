const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'Melissa Viana',
      email: 'melissa.mnrv@gmail.com',
      password: '123456',
      image_url: 'https://github.com/melissareboucas.png'
    },
  ];
  
  const travels = [
    {
      user_id: users[0].id,
      id: '410544b2-4001-4271-9855-fec4b6a6442b',
      originCity: "Fortaleza",
      originCountry: "Brasil",
      destinyCity: "São Paulo",
      destinyCountry: "Brasil",
      distanceInMeters: 2500000,
      date: '2024-03-08',
      travelimage: '/assets/sp.png',
      description: 'Minha viagem para São Paulo foi uma experiência enriquecedora e vibrante. Desde o momento em que pisei na cidade, fui envolvido pela energia pulsante das ruas movimentadas e pela diversidade cultural que permeia cada esquina. Explorei museus fascinantes, deliciei-me com a culinária local e mergulhei na efervescência da vida noturna paulistana. Cada momento foi uma oportunidade de descoberta, e deixei a cidade com lembranças inesquecíveis e a promessa de voltar em breve.'
    }
  ];

  const posts = [
    {
      user_id: users[0].id,
      travels_id: travels[0].id,
      title: "Dia 1",
      posttext: 'Que legal! Também quero conhecer!',
      postdate: '2024-03-08',
    }
  ]
  
  
  module.exports = {
    users,
    travels,
    posts
  };
  