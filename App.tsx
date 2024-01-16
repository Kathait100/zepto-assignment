import React from 'react';
import PickUsers from './parentcomp';
import { faker } from '@faker-js/faker';

// Introducing Dummy users details
const App: React.FC = () => {
  const itemList = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    profilePic:faker.image.avatar(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
  }));

  return (
    <div>
      {/*  */}
      <PickUsers itemList={itemList} />
    </div>
  );
};

export default App;
