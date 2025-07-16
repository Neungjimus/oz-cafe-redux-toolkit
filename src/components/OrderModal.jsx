import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import data from '../assets/data';

function OrderModal({ modalMenu, setModalOn }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (optionType, optionIndex) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionType]: optionIndex
    }));
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: modalMenu.id,
      name: modalMenu.name,
      price: modalMenu.price,
      img: modalMenu.img,
      options: selectedOptions,
      quantity: quantity,
    };

    dispatch(addItem(itemToAdd));
    setModalOn(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setModalOn(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{modalMenu.name}</h3>
        <p>{modalMenu.description}</p>
        <p>가격: {modalMenu.price}원</p>

        {Object.keys(data.options).map(optionType => (
          <div key={optionType}>
            <h4>{optionType}</h4>
            {data.options[optionType].map((optionValue, index) => (
              <label key={optionType + index}>
                <input
                  type="radio"
                  name={optionType}
                  value={index}
                  checked={selectedOptions[optionType] === index}
                  onChange={() => handleOptionChange(optionType, index)}
                />
                {optionValue}
              </label>
            ))}
          </div>
        ))}

        <div>
          <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
        </div>

        <div className="modal-buttons">
          <button onClick={handleAddToCart}>장바구니에 담기</button>
          <button onClick={() => setModalOn(false)}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;