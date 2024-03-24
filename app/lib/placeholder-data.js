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
      originCity: "Fortaleza",
      originCountry: "Brasil",
      destinyCity: "Rio de Janeiro",
      destinyCountry: "Brasil",
      distanceInMeters: 2400000,
      date: '2024-03-08',
    }
  ];
  
  
  module.exports = {
    users,
    travels
  };
  