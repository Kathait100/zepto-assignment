import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import './findperson.css';

// Define the structure of an item
interface Item {
  id: number;
  profilePic: string;
  name: string;
  email: string;
}

// Define the properties for the PickUsers component
interface PickUsersProps {
  itemList: Item[];
}

// PickUsers component
const PickUsers: React.FC<PickUsersProps> = ({ itemList }) => {
  // State for the current input value
  const [inputValue, setInputValue] = useState<string>('');
  // State for selected items
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  // State to control visibility of the item list
  const [isItemListVisible, setIsItemListVisible] = useState<boolean>(false);
  // Reference to the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input change event
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsItemListVisible(true);
  };

  // Handle key press events in the input
  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      // Find the selected item
      const selectedItem = itemList.find((item) => item.name.toLowerCase() === inputValue.trim().toLowerCase());
      if (selectedItem) {
        // Add the selected item to selectedItems and reset input
        setSelectedItems([...selectedItems, selectedItem]);
        setInputValue('');
        setIsItemListVisible(false);
      }
    }

    if (event.key === 'Backspace' && inputValue === '' && selectedItems.length > 0) {
      // Remove the last selected item on Backspace
      setSelectedItems((prevItems) => prevItems.slice(0, -1));
    }
  };

  // Handle item removal
  const handleItemRemove = (item: Item) => {
    setSelectedItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
  };

  // Focus on the input when selected items change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedItems]);

  // Component rendering
  return (
    <div className="chip-input-container">
      <h1 className='pick_user'>Pick Users</h1>
      {/* Display selected items */}
      <div className="chip-list">
        {selectedItems.map((item) => (
          <div key={item.id} className="chip" onClick={() => handleItemRemove(item)}>
            <img src={item.profilePic} alt={`${item.name}'s profile`} className="chip-profile-pic" />
            {item.name} <span className="chip-remove">X</span>
          </div>
        ))}
      </div>
      {/* Input for searching and selecting items */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
        placeholder="Search person...."
        className="input-field"
      />
      {/* Display the filtered item list based on input */}
      {isItemListVisible && (
        <div className="item-list">
          {itemList
            .filter((item) => !selectedItems.find((selectedItem) => selectedItem.id === item.id) && item.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((item) => (
              <div key={item.id} className="item" onClick={() => setSelectedItems([...selectedItems, item])}>
                <img src={item.profilePic} alt={`${item.name}'s profile`} className="item-profile-pic" />
                {item.name}
                <span className='email-name'>{item.email}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

// Export the component
export default PickUsers;
