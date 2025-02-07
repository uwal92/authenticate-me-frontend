// frontend/src/components/Navigation/OpenModalMenuItem.jsx

import { useModal } from "../../context/Modal";
import "./ProfileButton.css";

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // callback function that will be called when the menu item is clicked
  onModalClose, // callback function that will be called when the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <li className="dropdown-item" onClick={onClick}>
      {itemText}
    </li>
  );
}

export default OpenModalMenuItem;
