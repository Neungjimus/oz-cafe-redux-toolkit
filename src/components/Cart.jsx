import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../redux/slices/cartSlice';
import data from "../assets/data";

function CartItem({ item, options, quantity }) {
  const dispatch = useDispatch();

  if (!item) {
    return <li className="cart-item">아이템 정보를 찾을 수 없습니다.</li>;
  }

  return (
    <li className="cart-item">
      <div className="cart-item-info">
        <img height={100} src={item.img} alt={item.name} />
        <div>{item.name}</div>
      </div>
      <div className="cart-item-option">
        {Object.keys(options).map((el) => (
          <div key={el}>
            {el} : {data.options[el]?.[options[el]]}
          </div>
        ))}
        <div>개수 : {quantity}</div>
      </div>
      <button
        className="cart-item-delete"
        onClick={() => {
          dispatch(removeItem(item));
        }}
      >
        삭제
      </button>
    </li>
  );
}


function Cart() {
  const menu = useSelector((state) => state.menu);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!menu || Object.keys(menu).length === 0 || !menu.커피 || !menu.논커피) {
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        메뉴 정보를 불러오는 중이거나, 메뉴 정보가 없어요!
      </div>
    );
  }

  const allMenus = [];
  if (Array.isArray(menu.커피)) {
    allMenus.push(...menu.커피);
  }
  if (Array.isArray(menu.논커피)) {
    allMenus.push(...menu.논커피);
  }

  return (
    <>
      <h2>장바구니</h2>
      <ul className="cart">
        {cart?.length ? (
          cart.map((el) => {
            const menuItem = allMenus.find((mItem) => mItem.id === el.id);
            return (
              <CartItem
                key={el.id}
                item={menuItem}
                options={el.options}
                quantity={el.quantity}
              />
            );
          })
        ) : (
          <div className="no-item">장바구니에 담긴 상품이 없어요!</div>
        )}
      </ul>
      {cart?.length > 0 && (
        <button
          className="clear-cart-button"
          onClick={() => dispatch(clearCart())}
        >
          장바구니 비우기
        </button>
      )}
    </>
  );
}

export default Cart;